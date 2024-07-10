import { AllPeopleQueryResult } from '@/src/graphql/generated'
import { gql, useQuery } from '@apollo/client'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  View,
  useColorScheme,
} from 'react-native'
import { Header, ListItem } from '@rneui/themed'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon from the library
import { useSession } from '@/ctx'
import CustomHeader from '@/components/CustomHeader'
import CharacterListScreen from '../characterlist'

export default function Characters() {
  const { signOut } = useSession()
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <>
      <CustomHeader title='Character'></CustomHeader>
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
          <CharacterListScreen/>
      </View>
    </>
  )
}
