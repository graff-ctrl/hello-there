import { FilmDetailObj } from '@/app/(app)/(tabs)/films'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export type FilmDetailsScreenProps = {
  props: {
    director: string;
    releaseDate: string;
  };
};

const FilmDetailsScreen: React.FC<FilmDetailsScreenProps> = ({
  props,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <DetailRow label='Director' value={props.director} />
        <DetailRow label='Release Date' value={props.releaseDate} />
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

export default FilmDetailsScreen
