import { View, Text, StyleSheet } from 'react-native'
import UseTheForceButton from '@/components/UseTheForce';
import { router, Stack } from 'expo-router'

export default function Home() {

  

  const handleTheForce = () => {
    router.navigate('/chat')
  }
  
  return (
    <View style={styles.container}>
      <UseTheForceButton title='Guess the Star War Character' onPressed={handleTheForce} />
      <UseTheForceButton title='Guess the Star War Movie' onPressed={handleTheForce} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
