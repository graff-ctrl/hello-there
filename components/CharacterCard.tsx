import styled from "@emotion/native"
import { Icon } from "@rneui/base"
import React from "react"
import { Image, ViewProps } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const Wrapper = styled.View({
  shadowColor: "#000000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
  borderRadius: 24,
  backgroundColor: "#fbfbfb",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 32,
})

const Title = styled.Text({
  fontSize: 16,
  fontWeight: "500",
  padding: 16,
  alignSelf: "center",
})

export type CardProps = {
  name: string
} & ViewProps

export const CharacterCard: React.FC<CardProps> = ({ name, ...props }) => {
  return (
    <Wrapper {...props}>
      <Title>{name}</Title>
    </Wrapper>
  )
}

export default CharacterCard
