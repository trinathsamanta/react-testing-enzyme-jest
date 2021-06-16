import React from 'react';
import Counter from './Counter';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new EnzymeAdapter() });
/**
 * function to create shallow wrapper for app component
 * @function setup
 */
const setup = () => shallow(<Counter />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`)


test('render without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
})

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
})

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
})

test('counter display starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
})

test('clicking button increments counter display', () => {
  const wrapper = setup();
  //find the button
  const button = findByTestAttr(wrapper, "increment-button");
  //click the button
  button.simulate('click');
  //find the display and test the functionality if the number is incremented
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1")
})