import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CharacterDetailsProps = {
  character: {
    name: string;
    birthYear: string;
    gender: string;
    hairColor: string;
    height: string;
    homeworld: { id: string };
    species: { id: string; name: string; designation: string }[];
  };
};

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{character.name}</Text>
      <Text>Birth Year: {character.birthYear}</Text>
      <Text>Gender: {character.gender}</Text>
      <Text>Hair Color: {character.hairColor}</Text>
      <Text>Height: {character.height}</Text>
      <Text>Homeworld ID: {character.homeworld.id}</Text>
      {character.species.map((species) => (
        <Text key={species.id}>
          Species: {species.name} ({species.designation})
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default CharacterDetails;
