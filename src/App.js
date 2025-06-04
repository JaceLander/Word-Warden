import logo from './logo.svg';
import './App.css';
import supabase from './supabaseClient'
import words from './wordlistscript'
import insertGuess from './insertScripts'
import React, { useState } from 'react'






     function App() {
  return (
    <div className="App">
    <header>Word Warden</header>
    <input type='text' className='box' id='name'></input><br></br>
    <text>Please enter word</text><br></br>
    <input type='text' id='answer'></input><br></br>
    <input type='button' id='submit' onClick={() => CheckButton()}></input>
    </div>


  );
}



//const button = document.getElementById("submit");

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
        const match = data.find(row => row.guess === guessText);
        const guesserName = match?.username ?? "Unknown";
        alert("This word was already claimed by " + guesserName)
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
