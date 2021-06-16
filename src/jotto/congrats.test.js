import React from "react";
import Congrats from "./congrats";
import { shallow } from "enzyme";
import { findByTestAttr ,checkProps } from "../test/testUtils";

const defaultProps = { success:false};

/**
 * function to create shallow wrapper for app component
 * @function setup
 * @params {object} props- Component props specific to his setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps= {...defaultProps, ...props};
  return shallow(<Congrats {...props} />);
};

test("render without error", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

test("renders no text when success props is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

test("renders non-empty success text when success props is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "component-message");
  expect(message.text().length).not.toBe(0);
});

test("doesnot throw warning with expected props", () => {
  const expectedProps = { success: false };
  checkProps(Congrats,expectedProps);
});
