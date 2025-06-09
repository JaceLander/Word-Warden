import logo from './logo.svg';
import './App.css';
import supabase from './supabaseClient'
import words from './wordlistscript'
import React, { useState, useRef, useEffect } from 'react'
import StaticExample from './modalscripts';
import { time } from 'framer-motion';
 



export default App;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  async function alertingUser(){
    setIsVisible(true);
    await sleep(2500);
    setIsVisible(false);
  }

  async function insertGuess(guess, name)
  {
  const { error } = await supabase
  .from('SuccessfulGuess')
  .insert({guess: guess, created_at: Date.now().valueOf, username: name})
  setMessage('Congratulations! This is a new word!');
  setIsError(false);
  setIsVisible(true);
  
  
  if (error) {
      console.log('Insert error:', error.message);
    }
  }



async function CheckButton() {

  const { data } = await supabase
   .from('SuccessfulGuess')
   .select('*');

   const guessList = data.map(row => row.guess);

const guessText = document.getElementById("answer").value.toLowerCase();
const username = document.getElementById("name").value.toLowerCase();

if (username.length === 0) {
  setMessage('Please Enter a username');
  setIsError(true);
  alertingUser();
  return;
  }
  if (guessText.length !== 5) {
    setMessage('Please enter a word that is 5 letters long!');
    setIsError(true);
    alertingUser();
    return;
    } 
    else {
      //checks if word is valid
      if(words.includes(guessText.toLowerCase())){
      //checks if word has been already guessed
      if (guessList.includes(guessText.toLowerCase())) {
        //if guess already existed
          const match = data.find(row => row.guess === guessText);
          const guesserName = match?.username ?? "Unknown";
          setMessage('This word was already guessed by ' + guesserName);
          setIsError(true);
          alertingUser();
        return;

      //if word wasn't already guessed
          } else {
            insertGuess(guessText, username);
        }
        //if word isnt real
        }else{
          setMessage('This word does not exist in the current wordlist!');
          setIsError(true);
          alertingUser();
        }
      }
    }
  return (
    <div className="App" id='general'>

      <header className='title-font text'>Word Warden</header>
      <input type='text' 
            className='box element general-font' 
            placeholder='Name'
            id='name'></input><br></br>
      <text className='general-font text'>Enter 5 letter word</text><br></br>
      <input type='text' 
            id='answer' 
            placeholder='Word'
            style={{ marginBottom: '0vh' }}
            className='box element answer general-font'></input><br></br>
            
          <div className={`response 
            general-font 
            ${isError ? 'error' : ''}
            ${isVisible ? 'visible' : 'hidden'}`}>
            {message}</div>
      <br></br>
      <input type='button' 
            id='submit' 
            className={`button
            ${isVisible ? 'button-waiting' : ''}`}

            onClick={() => CheckButton()}
            ></input>
    </div>


  );
}


