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
import { useAllFilmsQuery, useAllPeopleQuery } from '@/src/graphql/generated'
import { NetworkStatus } from '@apollo/client'


type FilmListScreenProps = {
  data: any[]
  refetch: any
  onSelectCharacter: (id: string, characterName: string) => void
  onSearch: (text: string) => void
  searchQuery: string
  toggleOrder: () => void
  order: 'ASC' | 'DESC'
}


export const FilmListScreen: React.FC = () => {
  const { data, networkStatus, refetch } = useAllFilmsQuery()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC')

  const handleSearch = (text: string) => {
    setSearchQuery(text)
  }

  const toggleOrder = () => {
    const newOrder = order === 'ASC' ? 'DESC' : 'ASC'
    setOrder(newOrder)
  }

  const orderedFilms = useMemo(() => {
    if (!data?.allFilms?.films) return []

    const filteredData = data.allFilms.films.filter((film) =>
      film?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const sortedData = filteredData.sort((a, b) => {
      const nameA = a?.title ?? ''
      const nameB = b?.title ?? ''
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
        data={orderedFilms}
        keyExtractor={(item) => item?.title || ''}
        renderItem={({ item }) => (
          <CharacterCard name={item?.title ?? ''} />
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
