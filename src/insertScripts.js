import supabase from './supabaseClient'

 function alertToUser(message, error){
  document.getElementById("response").value = message;
  if(error === true){
    document.getElementById("response").style.color = '#b30000';
  }
  document.getElementById("response").style.transition = 'all 0.5s ease';
  document.getElementById("answer").style.marginBottom = '0vh';
  document.getElementById("response").style.marginTop = '2vh';
  document.getElementById("response").style.marginBottom = '2vh';
  document.getElementById("response").style.visibility = 'visible';
}

async function insertGuess(guess, namƒe)
{
const { error } = await supabase
.from('SuccessfulGuess')
.insert({guess: guess, created_at: Date.now().valueOf})
alertToUser('Congratulations! You have claimed a new word!', false);


if (error) {
    console.log('Insert error:', error.message);
  }
}

export { insertGuess, alertToUser };

