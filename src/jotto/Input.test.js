import React from "react";
import Input from "./Input";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";

/**
 * function to create shallow wrapper for app component
 * @function setup
 * @params {object} props- Component props specific to his setup.
 * @returns {ShallowWrapper}
 */

 const mocksetCurrentGuess = jest.fn();

 jest.mock('react',()=>({
   ...jest.requireActual('react'),
   useState:(initialState)=>[initialState,mocksetCurrentGuess]
 }))
 

const setup = (success=false,secretWord="party") => {
  return shallow(<Input success={success} secretWord={secretWord}/>);
};

describe('render',()=>{
  
  describe('when success is true',()=>{
    let wrapper;
  beforeEach(()=>{
    wrapper = setup(true);
  })
    
    test("Input box not show", () => {
      const inputbox = findByTestAttr(wrapper, 'input-box')
      expect(inputbox.exists()).toBe(false);
    });
    test("Submit button not show", () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button')
      expect(submitButton.exists()).toBe(false);
    });
  })
  describe('when success is false',()=>{
    let wrapper;
  beforeEach(()=>{
    wrapper = setup(false);
  })
    test("Input renders without error", () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input')
      expect(inputComponent.length).toBe(1);
    });
    test("Input box show", () => {
      const inputbox = findByTestAttr(wrapper, 'input-box')
      expect(inputbox.exists()).toBe(true);
    });
    test("Submit button show", () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button')
      expect(submitButton.exists()).toBe(true);
    });
  })
})


test("doesnot throw warning with expected props", () => {
  checkProps(Input,{secretWord:'party'})
});

describe('state controlled input field',()=>{
  let wrapper;
  
  beforeEach(()=>{
    wrapper = setup();
    
  })
  test('state updates with value of input box upon change',()=>{
    const inputBox = findByTestAttr(wrapper,'input-box')
    
    
    const mockEvent = {target:{value:'train'}};
    inputBox.simulate("change",mockEvent);

    expect(mocksetCurrentGuess).toHaveBeenCalledWith('train')
  })
  test('field is cleared upon submit button click',()=>{
    const submitButton =findByTestAttr(wrapper,'submit-button')
  
    submitButton.simulate('click',{preventDefault(){}});
    expect(mocksetCurrentGuess).toHaveBeenCalledWith("")
  })

});

