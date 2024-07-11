import React from 'react';
import { render } from '@testing-library/react-native';
import CharacterCard from "../../components/CharacterCard"

const props = {
  name: "hello-there"
}

describe('CharacterCard', () => {
  it('renders correctly', () => {
    const { root } = render(<CharacterCard props={props} />)
    expect(root).toBeTruthy();
  });

});
