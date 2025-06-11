import './App.css';
import supabase from './supabaseClient'
import words from './wordlistscript'
import React, { useState } from 'react'
import { Shake} from 'reshake'





export default App;



function App() {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shake, setShake] = useState(false);

  async function temp(){
  const { data: timeoutData, error } = await supabase
  .from('TimeOutCorner')
  .select('*');
  if(error){
    console.log("error: " + error.message);
    return;
  }
  
  const bannedUsers = timeoutData.map(row => row.username);

  return {bannedUsers, timeoutData}
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function detectUser(name){
  var legal = true;
  const {bannedUsers, timeoutData} = await temp();


    if(bannedUsers.includes(name)){
      const match = timeoutData.find(row => row.username === name);
      const dateStr = match?.account_allowed ?? "Unknown";
      const date = new Date(dateStr);
          if(Date.now() > date.getTime())
          {
            const {} = await supabase
            .from('TimeOutCorner')
            .delete()
            .eq('username', name);
            return legal = true;
          }
          var dateHours = date.getHours();
          const minutes = String(date.getMinutes()).padStart(2, "0");
          dateHours = date.getHours() % 12 || 12;
          const ampm = dateHours >= 12 ? "AM" : "PM";
      setMessage(`This user is timed out until ${dateHours}:${minutes} ${ampm}`);
      setIsVisible(true); 
      legal = false
    }else{
    setIsVisible(true);
    legal = true
    }
    return legal;
  }

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
  if (error) {
      console.log('Insert error:', error.message);
    }
  }

  async function insertTimeout(name)
  {
  const { error } = await supabase
  .from('TimeOutCorner')
  .insert({username: name})
  if (error) {
      console.log(error.message);
    }
  }

async function CheckButton() {

  const { data } = await supabase
   .from('SuccessfulGuess')
   .select('*');

   const guessList = data.map(row => row.guess);
const guessText = document.getElementById("answer").value.toLowerCase();
const username = document.getElementById("name").value.toLowerCase();

const legal = await detectUser(username);

if(legal){


  if (username.length === 0) {

    setMessage('Please enter a username');
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
            setMessage('This word was already guessed by ' + guesserName + ". You've been timed out for 1 hour.");
            insertTimeout(username)
            setIsError(true);
            alertingUser();
            setShake(true);
            await sleep(750);
            setShake(false);
          return;

        //if word wasn't already guessed
            } else {
              insertGuess(guessText, username);
              setMessage("Congratulations! This is a new word!")
              setIsError(false);
              alertingUser();
          }
          //if word isnt real
          }else{
            setMessage('This word does not exist in the current wordlist!');
            setIsError(true);
            alertingUser();
          }
        }
      }
      alertingUser();
    }



  return (

    <Shake active={shake} intensity={5}>
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
            ${isVisible ? 'visible' : ''}`}>
            {message}</div>
      <br></br>
      <input type='button' 
            id='submit' 
            className={`button
            ${isVisible ? 'button-waiting' : ''}`}

            onClick={() => CheckButton()}
            ></input>
    </div>
</Shake>



  );
}


