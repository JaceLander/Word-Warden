import supabase from './supabaseClient'

async function refreshList(){
    const { data, error } = await supabase
    .from('SuccessfulGuess')
    .select('*');
  
    if (error) {
      console.log('Insert error:', error.message);
    }
  
    return data;
  }
  export default refreshList;
