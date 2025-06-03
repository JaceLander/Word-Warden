import logo from './logo.svg';
import './App.css';
import supabase from './supabaseClient'
import words from './wordlistscript'

 const { data, error } = await supabase
     .from('SuccessfulGuess')
     .select('*');

function App() {
  return (
    <div className="App">
    <header>Word Warden</header>
    <text>Please enter word</text><br></br>
    <input type='text' id='answer'></input><br></br>
    <input type='button' id='submit' onClick={CheckButton}></input>
    </div>


  );
}

function AddWord (string){

}

function InvalidWord (string){

}




  function CheckButton() {

  const guessText = document.getElementById("answer").value.toLowerCase();

  if (guessText.length !== 5) {
    alert("You must provide a word with 5 letters");
  } else {
    if(words.includes(guessText)){
  if (data.guess.includes(guessText)) {
    console.log('Guess already exists!');


  } else {
    console.log('Guess is new!');

  }
}else{
  alert("Your guess does not exist in the current valid wordlist!")
}
}
}

export default App;
