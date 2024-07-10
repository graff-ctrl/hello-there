// CharacterDetailsScreen.tsx

import React from 'react'
import { NetworkStatus } from '@apollo/client'
import { View, StyleSheet } from 'react-native'
import { useNavigation, useRouter, useLocalSearchParams, Stack } from 'expo-router'
import { useGetCharacterQuery } from '@/src/graphql/generated'
import CharacterDetailsScreen from '@/screens/characters/CharacterDetailsScreen'
import styled from '@emotion/native'
import { ActivityIndicator } from 'react-native'

export default function CharacterDetails() {
  const params = useLocalSearchParams()
  const { id, name } = params as { id: string, name: string }

  const { data, networkStatus, error } = useGetCharacterQuery({
    variables: { characterId: id },
  })


  if (networkStatus == NetworkStatus.loading) {
    return (
      <Wrapper>
        <ActivityIndicator />
      </Wrapper>
    )
  }

  const character = {
    id: id,
    name: name,
    birthYear: data?.person?.birthYear ?? 'Unknown',
    gender: data?.person?.gender ?? 'Unknown',
    hairColor: data?.person?.hairColor ?? 'Unknown',
    height: data?.person?.height?.toString() ?? 'Unknown',
    homeworld: data?.person?.homeworld?.name ?? 'Unknown',
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackTitle: "Back" ,  headerTitle: `${name}` }} />
      <CharacterDetailsScreen props={character} />
    </View>
  )
}

const Wrapper = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
