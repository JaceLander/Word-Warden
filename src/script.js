function CheckButton() {
    const guessText = document.getElementById("guessText").value;
  
    if (guessText.length !== 5) {
      alert("You must provide a word with 5 letters");
    } else {
      console.log("Valid input:", guessText);
      // You can add more logic here, like submitting or checking the word
    }
  }