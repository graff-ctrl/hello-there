import styled from '@emotion/native'
import React, { useCallback, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons' // Import icons
import CharacterCard from '@/components/CharacterCard'
import SearchBar from '@/components/SearchBar'
import { useAllPeopleQuery } from '@/src/graphql/generated'
import { NetworkStatus } from '@apollo/client'
import { router } from 'expo-router'

export const CharacterListScreen: React.FC = () => {
  const { data, networkStatus, refetch } = useAllPeopleQuery()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC')

  const handleSearch = (text: string) => {
    setSearchQuery(text)
  }

  const handleCharacterPress = (id: string | undefined) => {
    router.push({ pathname: '/character-details', params: { id: id }})
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
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.searchbar}>
          <SearchBar onSearch={handleSearch} />
        </View>
        <TouchableOpacity style={styles.sortButton} onPress={toggleOrder}>
          <Icon
            name={order === 'ASC' ? 'arrow-up' : 'arrow-down'}
            size={20}
            color='#333'
          />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={networkStatus == NetworkStatus.refetch}
            onRefresh={refetch}
          />
        }
        data={orderedCharacters}
        keyExtractor={(item) => item?.node?.id || ''}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            const id = item?.node ? item.node.id : ''
            handleCharacterPress(id)
          }}>
            <CharacterCard name={item?.node?.name ?? ''} />
          </TouchableOpacity>
        )}
      />
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sortButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  searchbar: {
    flex: 1,
    paddingRight: 8,
  },
  flatList: {
    flex: 1,
  },
})

export default CharacterListScreen
