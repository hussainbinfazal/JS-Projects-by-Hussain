console.log("script is attached")


let userInput = document.getElementById("datebirth");
let showAge2 = document.querySelector(".showage2")
let main2Div = document.querySelector('.main2')
let btn = document.getElementById("btn");
userInput.max = new Date().toISOString().split("T")[0];
console.log(userInput);




let calculateAge = () => {
    let birthDate = new Date(userInput.value);
    let currentDate = new Date();

    let d2 = birthDate.getDate(); //Birth date//
    let m2 = birthDate.getMonth() + 1; // Birth Month //
    let y2 = birthDate.getFullYear(); //Birth Year //


    let d1 = currentDate.getDate(); // Today's Date //
    let m1 = currentDate.getMonth() + 1; // Current Month //
    let y1 = currentDate.getFullYear(); // Current Year //


    let d3, m3, y3

    y3 = y1 - y2 // Difference between Current Year & Birth Month //



    if (m1 >= m2) // birthday Passed
        m3 = m1 - m2;
    else {   // Birthday hasn't ocuured yet
        y3--; //decrement the year //
        m3 = 12 + m1 - m2; // add months to remove negative value & get the remaining months //
    }

    if (d1 >= d2) { // Birth date Passed //
        d3 = d1 - d2; // difference between birth Date & Current Date //
         m3 = 0;
    } else {
        m3--; // birth Date hasn't occured yet //
        d3 = getDaysInMonth(y1, m1) + d1 - d2; // Remaining Days //
        m3 = 11; // The current month will not count as complete month //
        
    }
  

    if (m3 < 0) { // if month become negative adjust the year //
        m3 = 11;
        y3--;
    }
    console.log(y3, m3, d3)

    divAppend(y3, m3, d3)


}


let divAppend = (y3, m3, d3) => {  //Show Age //

    let div = document.getElementById("showage");
    if (showAge2.innerHTML == "") {
        let div = document.createElement("div")
        div.setAttribute("id", "showage");
        div.innerHTML = `Age: ${y3} years, ${m3} months, and ${d3} days`
        showAge2.appendChild(div)
    }
    
    div.innerHTML = `Age: ${y3} years, ${m3} months, and ${d3} days`
    saveData()
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate()
}



let saveData = () => { //Save data in Browser's Local Storage //
    localStorage.setItem("data", userInput.value)
    localStorage.setItem("age", showAge2.innerHTML)
}
let getData = () => { //Get data from Browser's Local Storage //
    
    userInput.value = localStorage.getItem("data")
    showAge2.innerHTML = localStorage.getItem("age")

    
}

getData()


btn.addEventListener("click", () => { //calculate age on click //           
    if (userInput.value == "") {
        console.log("please Select Your Date Of Birth")
        showAge2.innerHTML = "Please Select Your Date Of Birth <br> to Calculate Your Age"
        
    } else {
        showAge2.innerHTML = "";
        calculateAge()
    }
    console.log("button In Sclicked")
})
