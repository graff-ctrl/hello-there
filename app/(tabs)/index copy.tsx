import { AllPeopleQueryResult } from "@/src/graphql/generated";
import { gql, useQuery } from "@apollo/client";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  View,
  useColorScheme,
} from "react-native";
import { Header, ListItem } from "@rneui/themed";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useEffect } from "react";

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const { data, loading }: AllPeopleQueryResult = useQuery(gql`
    {
      allPeople {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `);

  useEffect(() => {
    console.log(data?.allPeople?.edges);
    data?.allPeople?.edges?.forEach((p) => {
      console.log({ p });
    });
  }, [data]);

  return (
    <>
      <Header
        containerStyle={{ flexShrink: 1, borderWidth: 1 }}
        style={{ flexShrink: 1, borderWidth: 1, borderColor: "red" }}
        barStyle="default"
        centerComponent={{
          text: "IH Challenge",
          style: { flexShrink: 1, color: "#fff" },
        }}
        placement="center"
        statusBarProps={{ hidden: true }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? Colors.black : Colors.black,
        }}
      >
        <FlatList
          style={{ flex: 1, backgroundColor: backgroundStyle.backgroundColor }}
          data={data?.allPeople?.edges}
          renderItem={({ item: edge }) => (
            <ListItem Component={TouchableHighlight} key={edge?.node?.name}>
              <ListItem.Content>
                <ListItem.Title>{edge?.node?.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        ></FlatList>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    position: "absolute",
  },
});
