console.log("script is attached")

const scriptURL = 'https://script.google.com/macros/s/AKfycbz1rFfenv4-gS1a6humflWmK7TFZ-dKlWl823yUjJrmKlU6UqPZXbi_3s7azbQfAHneKQ/exec'
const form = document.forms['submit-to-google-sheet'];
const msgInputText = document.getElementById("inputText")

form.addEventListener('submit', e => {
  const email = form.querySelector('input[type="email"]').value;
  if (email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/)) { //validate email //
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msgInputText.innerHTML = "Thank you for subscribing !";
        setTimeout(function () {
          msgInputText.innerHTML = "";
        }, 5000);
        form.reset();
      })
      .catch(error => {
        console.error('Error!', error.message);
        msgInputText.innerHTML = "Something went wrong. Please try again!";
      });
  } else {
    msgInputText.innerHTML = "Please enter a valid email"; // display user to write valid Email in input //
    setTimeout(function () {
      msgInputText.innerHTML = "";
    }, 5000);

  }
})

