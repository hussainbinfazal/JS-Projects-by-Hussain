console.log("script is attached");

let input = document.getElementById("inputpass");
let inputIcon = document.getElementById("copyicon");
let btn = document.getElementById("btn");
let copyIcon = document.getElementById("copyicon");
let desired =document.getElementById("desired");



// Function to Generate Password
let generatePassword = () => {
  let length = `${desired.value}`;
  password = "";
  let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lowerCase = "abcdefghijklmnopqrstuvwxyz";
  let symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/`~";
  let numbers = "0123456789";

  for (let i = 0; i < length; i++) {
    password +=
      upperCase[Math.floor(Math.random() * upperCase.length)] +
      lowerCase[Math.floor(Math.random() * lowerCase.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      symbols[Math.floor(Math.random() * symbols.length)];
    console.log(password);

    password = password.substring(0, length);
  }

  input.value = password; // generated password //
  savedata();
};

// Function to copy generated password //

let copyToClipboard = () => {
  let inputValue = input.value;

  if (inputValue) {
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        inputIcon.classList.replace("fa-regular", "fa-solid"); 
        inputIcon.classList.replace("fa-copy", "fa-check");
        savedata();

        setTimeout(() => {
          inputIcon.classList.replace("fa-solid", "fa-regular");
          inputIcon.classList.replace("fa-check", "fa-copy");
          savedata();
        }, 2000);
      })
      .catch((err) => {
        console.error("Error copying password: ", err);
      });
  }
};


// click on button to generate password // 
btn.addEventListener("click", () => {
  generatePassword();
  savedata();
});

// click on icon to copy generated password //
inputIcon.addEventListener("click", () => {
  console.log("hello");
  copyToClipboard();
  savedata();
});


// save the data in local starage //
let savedata = () => {
  localStorage.setItem("data", input.value);
};

// get saved data in the browser //
let getData = () => {
  input.value = localStorage.getItem("data");
};

getData();
