import User from "../model/userModel";
import bcrypt from "bcrypt";
import authMiddleware from "../middleware/authMiddleware";

const err500 = "Erro Interno de Servidor";

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getUserByID: async (req, res) => {
    const u_id = req.params.id;
    try {
      const user = await User.findbyPk(u_id);
      if (!user) {
        return res.status(404).json({ error: "Utilizador não encontrado" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getDoctors: async (req, res) => {
    try {
      const doctors = await User.findAll({
        where: { u_role: 1 },
      });

      res.status(200).json(doctors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getUserByName: async (req, res) => {
    try {
      const { u_nome } = req.params;

      if (u_nome) {
        const user = await User.findOne({
          where: { u_nome },
        });

        if (!user) {
          return res.status(404).json({ error: "Utilizador não encontrado" });
        }

        res.status(200).json(user);
      } else {
        const allUsers = await User.findAll();

        res.status(200).json(allUsers);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  createUser: async (req, res) => {
    try {
      const { u_nome, u_sobrenome, u_password, u_email } = req.body;
      if (!u_nome || !u_sobrenome || !u_password || !u_email) {
        return res
          .status(400)
          .json({ error: "Todos os campos são necessários" });
      }
      const hashPass = await bcrypt.hash(u_password, 10);
      const newUser = await User.create({
        u_nome,
        u_sobrenome,
        u_password: hashPass,
        u_email,
      });

      const u_id = newUser.u_id;

      const token = jwt.sign({ u_id: u_id }, jwtKEY);

      res.status(201).json(newUser, token);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateUserById: async (req, res) => {
    const u_id = req.params.id;
    try {
      const [rowsUpdated, [updatedUser]] = await User.update(req.body, {
        where: { u_id: u_id },
        returning: true,
      });

      if (rowsUpdated === 0) {
        return res.status(404).json({ error: "Utilizador não encontrado" });
      }

      res.status(200).json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteUserById: async (req, res) => {
    const u_id = req.params.id;
    try {
      const deletedRows = await User.destroy({
        where: { u_id: u_id },
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Utilizador não encontrado" });
      }
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { u_username, u_password } = req.body;

      if (!u_username || !u_password) {
        return res.status(400).json({
          error: "Nome de Utilizador e Palavra-passe são necessários",
        });
      }

      const user = await User.findOne({ where: { u_username } });
      const validPass = await bcrypt.compare(u_password, user.u_password);
      if (!user || !validPass) {
        res
          .status(401)
          .json({ error: "Nome de Utilizador ou Palavra-passe inválidos" });
      }

      const token = jwt.sign({ u_id: user.u_id }, jwtKEY);

      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  logoutUser: async (req, res) => {
    localStorage.removeItem(jwtKEY);
    res.status(200).json({ message: "Sessão terminada com sucesso" });
  },

  checkLoginStatus: async (req, res) => {
    const token = req.header("Auth");

    if (!token) {
      return res.status(200).json({ loggedIn: false });
    }

    try {
      const decoded = jwt.verify(token, jwtKEY);
      res.status(200).json({ loggedIn: true, u_id: decoded.u_id });
    } catch (err) {
      res.status(200).json({ loggedIn: false });
    }
  },

  // Protected route using authMiddleware and rate limiting
  getProtectedInfo: [
    authMiddleware,
    userCreationLimiter,
    (req, res) => {
      res.status(200).json({ message: "Esta é uma rota protegida!" });
    },
  ],
};

module.exports = UserController;
