import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export type CharacterDetailsScreenProps = {
  props: {
    id: string
    name: string
    birthYear: string
    gender: string
    hairColor: string
    height: string
    homeworld: string
  }
}

const CharacterDetailsScreen: React.FC<CharacterDetailsScreenProps> = ({
  props,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <DetailRow label='Birth Year' value={props.birthYear} />
        <DetailRow label='Gender' value={props.gender} />
        <DetailRow label='Hair Color' value={props.hairColor} />
        <DetailRow label='Height' value={props.height} />
        <DetailRow label='Homeworld Name' value={props.homeworld} />
      </View>
    </View>
  )
}

type DetailRowProps = {
  label: string
  value: string
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailContainer: {
    marginTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  detailValue: {
    flex: 1,
    marginLeft: 8,
  },
})

export default CharacterDetailsScreen
