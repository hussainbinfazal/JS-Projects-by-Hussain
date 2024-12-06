console.log("script is attached");
let string = "";
let buttons = document.getElementsByTagName("button");
let input = document.getElementById("input-screen");


Array.from(buttons).forEach((button) => {
  button.addEventListener("click", () => {
    if (button.innerText == "C") { // Clear //
      input.value = "";
      string = "";
    } else if (button.innerText == "=") { // Equals To //
      try {
        input.value = eval(input.value);
        string = input.value;
      } catch (e) {
        input.value = "Error";
      }
    } else if (button.innerHTML.includes('<i class="fa-solid fa-delete-left"></i>')){ // Backspace button //
      input.value = input.value.slice(0,-1);
      string = input.value
    }else if (button.innerHTML.includes('<i class="fa-solid fa-square-root-variable"></i>')){ //Square Root //
      input.value = Math.sqrt(eval(input.value));
      string = input.value;
    }else if (button.innerHTML == "x"){ // Multiplication //
      input.value += "*";
    }else if(button.innerHTML == "%") { // Percentage Function //
      input.value = input.value / 100;
    }else{
      string = input.value + button.innerText; 
      input.value = string;
    }
  });
  
})  

