import React from 'react';
import { render } from '@testing-library/react-native';
import MessageComponent from "../../components/MessageBubble"

const testMessage = {
  user: 'testUser',
  text: 'Hello, this is a test message',
  time: '12:00 PM',
};

describe('MessageComponent', () => {
  it('renders correctly', () => {
    const { root } = render(<MessageComponent item={testMessage} />)
    expect(root).toBeTruthy();
  });

});
