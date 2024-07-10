import styled from '@emotion/native'
import React, { useState } from 'react'
import {
  View,
  FlatList,
  Text,
  TouchableHighlight,
  StyleSheet,
  RefreshControl,
} from 'react-native'
import { Header, SearchBar } from '@rneui/themed'
import CharacterCard from '@/components/CharacterCard'
import { ActivityIndicator } from 'react-native'
import { NetworkStatus } from '@apollo/client'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons' // Import icons

type CharacterListScreenProps = {
  data: any[]
  refetch: any
  onSearch: (text: string) => void
  searchQuery: string
  toggleOrder: () => void
  order: 'ASC' | 'DESC'
}

export const CharacterListScreen: React.FC<CharacterListScreenProps> = ({
  data,
  refetch,
  onSearch,
  searchQuery,
  toggleOrder,
  order,
}) => {

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
          <SearchBar
            placeholder='Search...'
            value={searchQuery}
            onChangeText={onSearch}
            lightTheme
            round
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
          />
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
        data={data}
        refreshControl={
          <RefreshControl
            refreshing={refetch == NetworkStatus.refetch}
            onRefresh={refetch}
          />
        }
        keyExtractor={(item) => item.node.id}
        renderItem={({ item }) => (
          <TouchableHighlight>
            <CharacterCard name={item.node.name} />
          </TouchableHighlight>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flex: 1,
    paddingRight: 8,
  },
  searchBarInputContainer: {
    backgroundColor: '#e9e9e9',
  },
  flatListContent: {
    padding: 16,
  },
  sortButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flex: 1,
  }
})

export default CharacterListScreen
