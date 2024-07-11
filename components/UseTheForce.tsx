import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface UseTheForceButtonProps {
  title: string;
  onPressed: () => void;
}

const UseTheForceButton: React.FC<UseTheForceButtonProps> = ({ title, onPressed }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPressed}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center', // Center the button horizontally
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default UseTheForceButton;
