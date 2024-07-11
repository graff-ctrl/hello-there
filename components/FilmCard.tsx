import styled from '@emotion/native'
import { Icon } from '@rneui/base'
import React from 'react'
import { Image, ViewProps } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type CardProps = {
  title: string
} & ViewProps

export const FilmCard: React.FC<CardProps> = ({
  title,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <Title>{title}</Title>
    </Wrapper>
  )
}

const Wrapper = styled.View({
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
  borderRadius: 24,
  backgroundColor: '#fbfbfb',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 32,
})

const InnerWrapper = styled.View({
  width: '40%',
  overflow: 'hidden',
  borderTopLeftRadius: 24,
  borderBottomLeftRadius: 24,
})

const Title = styled.Text({
  fontSize: 16,
  fontWeight: '500',
  padding: 16,
  alignSelf: 'center',
})

export default FilmCard
