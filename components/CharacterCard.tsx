import React from 'react'
import { View, Text, Image, StyleSheet, ViewProps } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderRadius: 24,
    backgroundColor: '#fbfbfb',
    flexDirection: 'row',
    marginBottom: 32,
  },
  innerWrapper: {
    width: '40%',
    overflow: 'hidden',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    padding: 16,
    alignSelf: 'center',
  },
})

export type CharacterCardProps = {
  name: string
} & ViewProps

const CharacterCard: React.FC<CharacterCardProps> = ({ name, ...props }) => {
  return (
    <View style={styles.wrapper} {...props}>
      <View>
        <Text style={styles.title}>{name}</Text>
      </View>
    </View>
  )
}

export default CharacterCard
