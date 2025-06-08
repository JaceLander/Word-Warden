import logo from './logo.svg';
import './App.css';
import supabase from './supabaseClient'
import words from './wordlistscript'
import insertGuess from './insertScripts'
import React, { useState, useRef, useEffect } from 'react'
import StaticExample from './modalscripts';







     function App() {
  return (
    <div className="App" id='general'>

    <header className='title-font'>Word Warden</header>
    <input type='text' 
           className='box element' 
           placeholder='Name'
           id='name'></input><br></br>
    <text className='general-font'>Enter 5 letter word</text><br></br>
    <input type='text' 
           id='answer' 
           placeholder='Word'
           className='box element answer'></input><br></br>
    <input type='text' 
           id='response' 
           placeholder='word'
           className='box response'></input><br></br>
    <input type='button' 
           id='submit' 
           className='button'
           onClick={() => CheckButton()}
           ></input>
    </div>


  );
}

const response = document.getElementById("response");


async function CheckButton() {

  const { data } = await supabase
   .from('SuccessfulGuess')
   .select('*');

   const guessList = data.map(row => row.guess);

const guessText = document.getElementById("answer").value.toLowerCase();
const username = document.getElementById("name").value.toLowerCase();

if (username.length === 0) {
  alert("Please enter name");
  return;
  }
  if (guessText.length !== 5) {
    alert("You must provide a word with 5 letters");
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
          response.style.visibility = 'visible';
          response.value = 'This word was already claimed by ' + guesserName;

        return;

      //if word wasn't already guessed
          } else {
            insertGuess(guessText, username)
        }
        //if word isnt real
        }else{
        alert("Your guess does not exist in the current valid wordlist!")
        }
      }
    }


export default App;
