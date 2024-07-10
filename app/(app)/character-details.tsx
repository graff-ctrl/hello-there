// CharacterDetailsScreen.tsx

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { View, Text } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import CharacterDetails from '@/components/CharacterDetails';

// GraphQL query to fetch character details
const GET_CHARACTER_QUERY = gql`
  query GetCharacter($id: ID!) {
    person(id: $id) {
      name
      birthYear
      gender
      hairColor
      height
      homeworld {
        id
      }
      species {
        id
        name
        designation
      }
    }
  }
`;

export const CharacterDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params as { id: string };

  const { data, loading, error } = useQuery(GET_CHARACTER_QUERY, {
    variables: { id },
  });

  console.log(data)

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error! {error.message}</Text>;

  return (
    <View>
      <CharacterDetails character={data.person} />
    </View>
  );
};

export default CharacterDetailsScreen

