import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { generateResponse } from "@/src/chat-gpt/ChatGPTService"
import { StyleSheet } from "react-native"
import MessageComponent from "@/components/MessageBubble"
import { useGetCharacterListForGuessQuery } from "@/src/graphql/generated"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"


export interface ChatMessage {
  user: string
  text: string
  time: string
}

export default function ChatScreen() {
  const [userMessage, setUserMessage] = useState("")
  const [characterPrompt, setCharacterPrompt] = useState("")
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])

  function getRandomIndex<T>(array: T[]): number {
    return Math.floor(Math.random() * array.length)
  }

  const { data } = useGetCharacterListForGuessQuery()

  useEffect(() => {
    if (data && data.allPeople && data.allPeople.people && data.allPeople.people.length > 0) {
      // Get a random index
      const randomIndex = Math.floor(
        Math.random() * data.allPeople.people.length
      )

      console.log(data.allPeople.people[randomIndex])
      const characterData = data.allPeople.people[randomIndex]
      setCharacterPrompt(`You are this Star Wars character data: ${JSON.stringify(characterData)}`)
      console.log(characterPrompt)
    }
  }, [data])

  const sendMessageToChatGPT = async () => {
    try {
      const response = await generateResponse(`${characterPrompt}. I want to ask a question about you or guess your name. ${userMessage}. Tell me if I'm correct or answer the question.`)
      const user: ChatMessage = {
        user: "user",
        text: userMessage,
        time: new Date().toLocaleTimeString(),
      }
      const bot: ChatMessage = {
        user: "bot",
        text: response,
        time: new Date().toLocaleTimeString(),
      }
      setChatHistory([...chatHistory, user, bot])
      setUserMessage("")
    } catch (error) {
      console.error("Error sending message to ChatGPT:", error)
    }
  }

  return (
    <View style={styles.messagingscreen}>
      <View style={{ flex: 1 }}>
        {chatHistory.length > 0 && (
          <FlatList
            data={chatHistory}
            renderItem={({ item }) => <MessageComponent item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <View style={styles.messaginginputContainer}>
          <TextInput
            style={styles.messaginginput}
            value={userMessage}
            onChangeText={(value) => setUserMessage(value)}
          />
          <Pressable
            style={styles.messagingbuttonContainer}
            onPress={sendMessageToChatGPT}
          >
            <View>
              <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  messagingscreen: {
    flex: 1,
  },
  messaginginputContainer: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  messaginginput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
  },
  messagingbuttonContainer: {
    width: "30%",
    backgroundColor: "green",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
})
