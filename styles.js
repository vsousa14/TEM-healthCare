// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 127,
    height: 127,
    top: 200,
    left: 133,
    position: 'absolute',
  },
  inputContainer: {
    width: 260,
    height: 38,
    top: 415,
    left: 65,
    borderRadius: 5,
    backgroundColor: '#fff',
    position: 'absolute',
    justifyContent: 'center',  // Centraliza verticalmente
    alignItems: 'center',      // Centraliza horizontalmente
  },
  secondInputContainer: {
    width: 260,
    height: 38,
    top: 490,
    left: 65,
    borderRadius: 5,
    backgroundColor: '#fff',
    position: 'absolute',
    justifyContent: 'center',  // Centraliza verticalmente
    alignItems: 'center',      // Centraliza horizontalmente
  },
  submitButton: {
    width: 200,
    height: 38,
    top: 555,
    left: 94,
    borderRadius: 5,
    backgroundColor: 'rgba(2, 86, 136, 0.7)',  
    position: 'absolute',
    justifyContent: 'center',  
    alignItems: 'center',     
  },
  textInput: {
    width: '100%',
    height: '100%',
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',   // Cor do texto
  },
 
});

