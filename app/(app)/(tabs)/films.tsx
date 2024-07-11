import { ActivityIndicator, StyleSheet, View, useColorScheme } from 'react-native'
import { Header, ListItem } from '@rneui/themed'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Icon from 'react-native-vector-icons/MaterialIcons' // Import the icon from the library
import { useSession } from '@/ctx'
import { FilmListScreen } from '@/screens/films/FilmListScreen'
import { FilmsConnection, useAllFilmsQuery } from '@/src/graphql/generated'
import { useMemo, useState } from 'react'
import { NetworkStatus } from '@apollo/client'
import styled from '@emotion/native'
import { Wrapper } from '@/constants/Wrapper'
import { router } from 'expo-router'

export type FilmDetailObj = {
  title: string;
  director: string;
  releaseDate: string;
}

export default function Films() {
  const isDarkMode = useColorScheme() === 'dark'

  const { data, networkStatus, refetch } = useAllFilmsQuery()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC')

  const handleSearch = (text: string) => {
    setSearchQuery(text)
  }

  const handleFilmPress = ( film: FilmDetailObj
  ) => {
    router.navigate({
      pathname: '/film/[id]',
      params: { 
        title: film.title,  
        director: film.director,
        releaseDate: film.releaseDate
      },
    })
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
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}
    >
      <FilmListScreen 
      data={orderedFilms} 
      refetch={refetch} 
      onFilmSelect={handleFilmPress} 
      onSearch={handleSearch } 
      searchQuery={searchQuery} 
      toggleOrder={toggleOrder}
      order={order}        
      />
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
