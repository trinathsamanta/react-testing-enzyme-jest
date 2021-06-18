import { shallow } from "enzyme";
import React from "react";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

const setup = () => {
  return shallow(<App />);
};

describe.each([
  [null, true, false],
  ["party", false, true],
])("renders with secretWord as %s", (secretWord, loadingShows, appShows) => {
  let wrapper;
  let originalUseReducer;

  beforeEach(() => {
    originalUseReducer = React.useReducer;
    const mockUseReducer = jest
      .fn()
      .mockReturnValue([{ secretWord, language: "en" }, jest.fn()]);
    React.useReducer = mockUseReducer;
    wrapper = setup();
  });
  afterEach(() => {
    React.useReducer = originalUseReducer;
  });
  test(`renders loading spinner: ${loadingShows}`, () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    expect(spinnerComponent.exists()).toBe(loadingShows);
  });
  test(`renders app: ${appShows}`, () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(appShows);
  });
});

test("renders learn react link", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent).toHaveLength(1);
});
