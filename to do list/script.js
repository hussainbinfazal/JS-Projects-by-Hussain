let input = document.getElementById("input"); // user's input //
let inputBtn = document.getElementById("inputbutton"); // button to add task in the list //
let taskList = document.querySelector(".tasklist");
let deleteBtn = document.querySelector("span") // span holds cross sign  //   // delete the task on click //

// create to do list by adding the tasks below //
inputBtn.addEventListener("click", () => {
    let div = document.createElement("div");
    let circle = document.createElement("div");
    let li = document.createElement("li");
    let span = document.createElement("span");
    div.classList.add("div")
    circle.classList.add("circle")
    li.classList.add("listLi")
    span.classList.add("span")
    div.appendChild(circle);
    div.appendChild(li);
    div.appendChild(span);
    li.innerHTML = input.value;
    span.innerHTML = "&#10006";
    saveData();

    if (input.value !== "") {
        taskList.appendChild(div);
        input.value = "";
        saveData()

        // let circle = document.querySelector(".circle")
        circle.addEventListener("click", (e) => {
            if (e.target.classList.contains("circle")) {
                div.classList.toggle("checked")
                saveData()

            }
        })
        span.addEventListener("click", (e) => {
            if (e.target == span) {
                div.remove()
                saveData()

            }
        })
    }

})

// save data in browser's local storage //
let saveData = () => {
    localStorage.setItem("data", taskList.innerHTML);
}



// Get saved data in local storage & re attach event listeners //
let getData = () => {
    taskList.innerHTML = localStorage.getItem("data");
    let circles = document.querySelectorAll(".circle");
    let spans = document.querySelectorAll(".span");

    circles.forEach(circle => {
        circle.addEventListener("click", () => {
            let div = circle.parentElement;
            div.classList.toggle("checked");
            saveData();
        });
    });

    spans.forEach(span => {
        span.addEventListener("click", () => {
            let div = span.parentElement;
            div.remove();
            saveData();
        });
    });
}
getData()

