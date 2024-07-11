import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ChatMessage } from "@/app/(app)/chat/"

const hardCodedUser = "user"

interface MessageComponentProps {
  item: {
    user: string;
    text: string;
    time: string;
  }
}

const MessageComponent: React.FC<MessageComponentProps> = ({ item }: { item: ChatMessage}) => {
  const status = item.user !== hardCodedUser;

  return (
    <View>
      <View
        style={[
          styles.messageWrapper,
          status && { alignItems: "flex-end" },
        ]}
      >
        <View style={styles.messageContainer}>
          <Ionicons
            name="person-circle-outline"
            size={30}
            color="black"
            style={styles.avatar}
          />
          <View
            style={[
              styles.message,
              !status && { backgroundColor: "rgb(194, 243, 194)" },
            ]}
          >
            <Text>{item.text}</Text>
          </View>
        </View>
        <Text style={{ marginLeft: 40 }}>{item.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    maxWidth: "50%",
    backgroundColor: "#f5ccc2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
  avatar: {
    marginRight: 5,
  },
});

export default MessageComponent;
