
let emailError = document.getElementById("EmailError")
let nameError = document.getElementById("NameError")
let phoneError = document.getElementById("PhoneError")
let messageError = document.getElementById("MessageError")



let checkName = () => {
    let name = document.getElementById("namegroup").value
    if (name.length == 0) {
        nameError.innerHTML = "* Name is Mandotary"


    } else if (!name.match(/^[A-Za-z]+(\s[A-Za-z]+)?$/)) {
        nameError.innerHTML = "Please enter a valid name";

    }else{
        nameError.innerHTML = "";
    }
    return
}
let checkEmail = () => {
    let email = document.getElementById("emailgroup").value
    if (email.length === 0) {
        emailError.innerHTML = "* Email is Mandotary"


    } else if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        emailError.innerHTML = "Please enter a valid email";
        return
    } else {
        emailError.innerHTML = "";
    }
    return
}
let checkNumber = () => {
    let phone = document.getElementById("phonegroup").value;
    if (phone.length === 0) {
        phoneError.innerHTML = "*Phone No is Mandotary"



    } else if (!phone.match(/^[0-9]{10}$/)) {
        phoneError.innerHTML = "Please enter a valid phone no";

    } else if (phone.length < 10) {
        phoneError.innerHTML = "10 characters is required";

    } else {
        phoneError.innerHTML = "";
    }
    return
}

let checkMessage = () => {
    let message = document.getElementById("messagegroup").value;
    if (message.length === 0) {
        messageError.innerHTML = "* Message is Mandotary"


    } else if (message.length < 30) {
        messageError.innerHTML = "minimumm 30 characters required";


    } else if (message.length == 30) {
        messageError.innerHTML = '<i class="fa-solid fa-check-double"></i>';

    } else {
        messageError.innerHTML = "";
    }
    return

}