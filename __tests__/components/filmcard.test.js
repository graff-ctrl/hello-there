import React from 'react';
import { render } from '@testing-library/react-native';
import FilmCard from "../../components/FilmCard"

const props = {
  name: "hello-there"
}

describe('CharacterCard', () => {
  it('renders correctly', () => {
    const { root } = render(<FilmCard props={props} />)
    expect(root).toBeTruthy();
  });

});
