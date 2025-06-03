import logo from './logo.svg';
import './App.css';
import supabase from './supabaseClient'
import words from './wordlistscript'
import insertGuess from './insertScripts'





     function App() {
  return (
    <div className="App">
    <header>Word Warden</header>
    <input type='text' id='name'></input><br></br>
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




  async function CheckButton() {
    const { data, error } = await supabase
     .from('SuccessfulGuess')
     .select('*');
     const guessList = data.map(row => row.guess);
     if(error)
     console.log("error: " + error.message);



  const guessText = document.getElementById("answer").value.toLowerCase();
  const username = document.getElementById("name").value.toLowerCase();

  if (guessText.length !== 5) {
    alert("You must provide a word with 5 letters");
    } else {
      //checks if word is valid
      if(words.includes(guessText)){
      //checks if word has been already guessed
      if (guessList.includes(guessText)) {
        const match = data.find(row => row.guess === guessText);
        const guesserName = match?.username ?? "Unknown";
        const guessTime = match?.created_at ?? "Unknown";
        alert("This word was already claimed by " + guesserName)

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
