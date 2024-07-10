import {
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native'
import { Header, ListItem } from '@rneui/themed'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon from the library
import { useSession } from '@/ctx'
import { FilmListScreen } from '@/screens/films'

export default function Films() {
  const { signOut } = useSession()
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <>
      <Header
        containerStyle={{ flexShrink: 1, borderWidth: 1 }}
        style={{ flexShrink: 1, borderWidth: 1, borderColor: 'red' }}
        barStyle='default'
        centerComponent={{
          text: 'IH Challenge',
          style: { flexShrink: 1, color: '#fff' },
        }}
        placement='center'
        statusBarProps={{ hidden: true }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
          <FilmListScreen/>
      </View>
    </>
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
