import styled from '@emotion/native'
import React from 'react'
import { ActivityIndicator, FlatList, RefreshControl, Text } from 'react-native'
import CharacterCard from '@/components/CharacterCard'
import { useAllPeopleQuery } from '@/src/graphql/generated'
import { NetworkStatus } from '@apollo/client'

const Wrapper = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: "#fff"
})

export const CharacterListScreen: React.FC = () => {
  const { data, networkStatus, refetch } = useAllPeopleQuery()

  if (networkStatus == NetworkStatus.loading) {
    return (
      <Wrapper>
        <ActivityIndicator />
      </Wrapper>
    )
  }

  return (
    <FlatList 
       contentContainerStyle={{ padding: 16}}
       refreshControl={
        <RefreshControl 
          refreshing={networkStatus == NetworkStatus.refetch}
          onRefresh={refetch}
        />
       }
       data={data?.allPeople?.edges}
       renderItem={({ index, item: edge }) => (
          <CharacterCard 
            key={index}
            name={edge?.node?.name ?? ""}  
          >
          </CharacterCard>
       )}
    />
  )
}
