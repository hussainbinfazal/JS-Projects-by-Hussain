let divParent = document.querySelector(".main2"); // Parent Element of Note div //
let btn = document.getElementById("btn"); // create note button //
let note = document.querySelector(".note"); // Parent Elemento of Notes div //

// function to save data in local Storage of the browser //
let saveData = () => { 
    localStorage.setItem("data", note.innerHTML);
}

// function to create notes //
let createNote = () => {
    let div = document.createElement("div")
    div.classList.add("notes");
    let p = document.createElement("p");
    p.innerText = "Add Your Note Here";
    p.setAttribute("contenteditable", "true");
    p.classList.add("text");
    let deleteIcon = document.createElement("i")
    deleteIcon.innerHTML = "<i class='fa-solid fa-trash'></i>";
    deleteIcon.setAttribute("id", "deleteicon");
    div.appendChild(p)
    div.appendChild(deleteIcon);
    note.appendChild(div)
    saveData()
    
    
}

// button to call create note function //
btn.addEventListener("click", () => {
    console.log("button clicked")
    createNote()
    deleteDiv()

})


// button to delete note //
let deleteDiv = () => {
    let deleteIcons = document.querySelectorAll("#deleteicon")

    deleteIcons.forEach((deleteIcon) => {
        deleteIcon.addEventListener("click", () => {
            let div = deleteIcon.closest(".notes"); // Assuming .notes is the parent div
            div.remove();
            saveData()
            

        });
    });
}




// function to get the saved data in browsers local storage //
let getData = () => {

    let savedNotes = localStorage.getItem("data");
    
    // If there is saved data, set it as the innerHTML of divParent, otherwise do nothing
    if (savedNotes) {
        note.innerHTML = savedNotes;
        deleteDiv(); // Reattach delete event listeners after loading saved notes
    }
    // divParent.innerHTML = localStorage.getItem("data");
}

getData()
