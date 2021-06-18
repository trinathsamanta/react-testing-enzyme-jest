import React, { useState, useEffect } from "react";
import "../App.css";
import Congrats from "./congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import languageContext from "./context/languageContext";
import { getSecretWord } from "./actions";
import LanguagePicker from "./LanguagePicker";

const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };

    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: "" });
  const setSecretWord = (secretWord) => {
    dispatch({ type: "setSecretWord", payload: secretWord });
  };
  //const [secretWord,setSecretWord] = useState('');
  const success = false;

  const guessedWords = [];

  const setLanguage = (language) => {
    dispatch({ type: "setLanguage", payload: language });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  if (state.secretWord === null) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word...</p>
      </div>
    );
  }

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Congrats success={success} />
        <Input
          data-test="input-test-wrapper"
          success={success}
          secretWord={state.secretWord}
        />
        <GuessedWords guessedWords={guessedWords} />
      </languageContext.Provider>
    </div>
  );
}

export default App;
