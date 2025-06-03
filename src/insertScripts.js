import supabase from './supabaseClient'

async function insertGuess(guess, name)
{
const { error } = await supabase
.from('SuccessfulGuess')
.insert({guess: guess, created_at: Date.now().valueOf, username: name})
alert("success");

if (error) {
    console.log('Insert error:', error.message);
  }
}


export default insertGuess;

