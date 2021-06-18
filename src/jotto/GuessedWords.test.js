import React from "react";
import GuessedWords from "./GuessedWords";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";

/**
 * function to create shallow wrapper for app component
 * @function setup
 * @params {object} props- Component props specific to his setup.
 * @returns {ShallowWrapper}
 */

const defaultProps = {
  guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }],
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};

test("does not throw warning with expected props", () => {
  checkProps(GuessedWords, defaultProps);
});

describe("if there is no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });
  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });
  test("renders instructions to get words", () => {
    const instructions = findByTestAttr(wrapper, "guess-instructions");
    expect(instructions.text().length).not.toBe(0);
  });
});

describe("if there is words guessed", () => {
  let wrapper;
  let guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 },
  ];

  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });
  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });
  test('renders "guesssed word section"', () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });
  test("correct number of guessed words", () => {
    const guessedWordsNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordsNodes.length).toBe(guessedWords.length);
  });
});
