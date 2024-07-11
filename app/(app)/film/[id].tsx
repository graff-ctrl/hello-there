import React, { useEffect } from 'react'
import { NetworkStatus } from '@apollo/client'
import { View, StyleSheet } from 'react-native'
import { useNavigation, useRouter, useLocalSearchParams, Stack } from 'expo-router'
import { useFilmQuery, useGetCharacterQuery } from '@/src/graphql/generated'
import FilmDetailsScreen from '@/screens/films/FilmDetailsScreen'
import { FilmDetailObj } from '../(tabs)/films'

export default function FilmDetails() {
  const params = useLocalSearchParams()
  const { title, director, releaseDate } = params as { title: string, director: string, releaseDate: string}

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackTitle: "Back" ,  headerTitle: `${title}` }} />
      <FilmDetailsScreen props={{ director: director, releaseDate: releaseDate }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
