import { useSession } from '@/ctx'
import { router } from 'expo-router'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const StartScreen = () => {

  const { signIn } = useSession()

  const handledLogin = () => {
    signIn()
    router.replace('/')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
      style={[styles.button, styles.doButton]}
      onPress={handledLogin}>
        <Text style={styles.buttonText}>Hello there.</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 20,
  },
  doButton: {
    backgroundColor: 'green',
  },
  doNotButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default StartScreen