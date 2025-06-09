import logo from './logo.svg';
import './App.css';
import supabase from './supabaseClient'
import words from './wordlistscript'
import {insertGuess, alertToUser} from './insertScripts'
import React, { useState, useRef, useEffect } from 'react'
import StaticExample from './modalscripts';







     function App() {
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
           className='box element answer general-font'></input><br></br>
    <input type='text' 
           id='response' 
           placeholder='word'
           className='box response general-font' readOnly></input><br></br>
    <input type='button' 
           id='submit' 
           className='button'
           onClick={() => CheckButton()}
           ></input>
    </div>


  );
}


async function CheckButton() {

  const { data } = await supabase
   .from('SuccessfulGuess')
   .select('*');

   const guessList = data.map(row => row.guess);

const guessText = document.getElementById("answer").value.toLowerCase();
const username = document.getElementById("name").value.toLowerCase();

if (username.length === 0) {
  alertToUser('Please Enter a username', true);
  return;
  }
  if (guessText.length !== 5) {
    alertToUser('You must provide a word with 5 letters', true);
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
          alertToUser('This word was already claimed by ' + guesserName, false);
        return;

      //if word wasn't already guessed
          } else {
            insertGuess(guessText, username)
        }
        //if word isnt real
        }else{
          alertToUser('This word does not exist!', true);
        }
      }
    }


export default App;
