import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

type SearchBarProps = {
  onSearch: (text: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')

  // Function to handle text input change
  const handleSearch = (text: string) => {
    setSearchQuery(text)
    onSearch(text) // Callback to parent component with search text
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Search ...'
        value={searchQuery}
        onChangeText={handleSearch}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
})

export default SearchBar
