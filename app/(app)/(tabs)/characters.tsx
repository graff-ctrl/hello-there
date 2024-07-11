import { useAllPeopleQuery } from '@/src/graphql/generated'
import { NetworkStatus } from '@apollo/client'
import React, { useMemo, useState } from 'react'
import CharacterListScreen from '@/screens/characters/CharacterListScreen'
import { router } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { Header } from '@rneui/base'
import styled from '@emotion/native'

export default function CharacterList() {
  const { data, networkStatus, error, refetch } = useAllPeopleQuery()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC')

  const handleSearch = (text: string) => {
    setSearchQuery(text)
  }

  const handleCharacterPress = (
    id: string | undefined,
    name: string | undefined
  ) => {
    router.navigate({
      pathname: '/character/[id]',
      params: { id: id, name: name },
    })
  }

  const toggleOrder = () => {
    const newOrder = order === 'ASC' ? 'DESC' : 'ASC'
    setOrder(newOrder)
  }

  const orderedCharacters = useMemo(() => {
    if (!data?.allPeople?.edges) return []

    const filteredData = data.allPeople.edges.filter((edge) =>
      edge?.node?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const sortedData = filteredData.sort((a, b) => {
      const nameA = a?.node?.name ?? ''
      const nameB = b?.node?.name ?? ''
      return order === 'ASC'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA)
    })

    return sortedData
  }, [data, searchQuery, order])

  if (networkStatus == NetworkStatus.loading) {
    return (
      <Wrapper>
        <ActivityIndicator />
      </Wrapper>
    )
  }

  return (
    <CharacterListScreen
      data={orderedCharacters}
      refetch={refetch}
      onSelectCharacter={handleCharacterPress}
      onSearch={handleSearch}
      searchQuery={searchQuery}
      toggleOrder={toggleOrder}
      order={order}
    />
  )
}

const Wrapper = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
})
