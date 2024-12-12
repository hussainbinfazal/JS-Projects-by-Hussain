console.log("script is attached");
let input = document.getElementById("input");
let btn = document.getElementById("btn");
let imgContainer = document.querySelector(".main2");

function generateQr(){
    if(input.value == ""){
        console.log("Please write something")
        console.log("button is clicked")
    }else{
    let url =`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`;

    if (imgContainer.querySelector(".lower")) {
        console.log("QR code already generated.");
        return; // Exit if QR code already exists
    }
    let div = document.createElement("div")
    let qrImage = document.createElement("img");
    let info = document.createElement("h2");
    let downloadBtn = document.createElement("button")
    div.setAttribute("class","lower")
    info.setAttribute("id","text");
    info.innerText="Your generated QR is here"
    qrImage.setAttribute("id","img");
    downloadBtn.setAttribute("id","downloadBtn");
    downloadBtn.innerText ="Download";
    downloadBtn.setAttribute("title", "Click to download the QR code");  // Example of adding a title attribute
    downloadBtn.setAttribute("data-id", "qr-download-btn");  // Example of adding a custom data attribute

    div.appendChild(info);
    div.appendChild(qrImage);
    div.appendChild(downloadBtn);
    imgContainer.appendChild(div);
    let img = document.getElementById("img")
    img.src="";
    img.src = url;
    console.log(url); 
    
    // downloadBtn.addEventListener("click", function() {
    //     // Create a temporary <a> element to trigger the download
    //     console.log("Button is clicked")
    //     let a = document.createElement("a");
    //     a.href = img.src;  
    //     a.download = "qr_code.png";
    //     document.body.appendChild(a);  // Append the link to the body
    //     console.log(a)
    //     a.click();  // Trigger the download
    //     document.body.removeChild(a);  // Clean up by removing the link
    // });

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.width = qrImage.width;
    canvas.height = qrImage.height;
    context.drawImage(qrImage, 0, 0);

    // Get the base64 image data
    let base64Image = canvas.toDataURL("image/png");

    // Set up the download button with the base64 image
    downloadBtn.addEventListener("click", function () {
        console.log("Button is clicked");

        // Create a temporary <a> element to trigger the download
        let a = document.createElement("a");
        a.href = base64Image;  // Use the base64 data URL
        a.download = "qr_code.png";  // File name for the download
        document.body.appendChild(a);  // Append the link to the body
        a.click();  // Trigger the download
        document.body.removeChild(a);  // Clean up by removing the link
    });

    saveData()
    }
    
}

btn.addEventListener("click",()=>{
    generateQr()
})

function saveData(){
    localStorage.setItem("input",input.value)
}


function getdata(){
    input.value = localStorage.getItem("input")
}


getdata()