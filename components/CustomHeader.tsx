import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '@rneui/themed'; // Assuming you are using the RNE library for headers
import { useTheme } from '@react-navigation/native';

interface CustomHeaderProps {
  title: string;
  headerTextSize?: number;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, headerTextSize = 24 }) => {
  const { colors } = useTheme();

  return (
    <Header
      containerStyle={{ flexShrink: 1, borderWidth: 1, backgroundColor: colors.card }}
      style={{ flexShrink: 1, borderWidth: 1, borderColor: 'red', backgroundColor: colors.card }}
      barStyle='default'
      centerComponent={{
        text: title,
        style: { flexShrink: 1, color: colors.text, fontSize: headerTextSize },
      }}
      placement='center'
      statusBarProps={{ hidden: true }}
    />
  );
};

export default CustomHeader;
