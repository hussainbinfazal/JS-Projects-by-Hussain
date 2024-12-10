


let quote = document.getElementById("heading");
let author = document.getElementById("quote");
let getQuoteButton = document.getElementById("newquote");
let shareButton = document.getElementById("twitter");
let mainQuote = document.querySelector("#mainquote");
let quoteAuthor = document.querySelector(".span");




let getQuote = async (url) => { // get quote from api //
    let response = await fetch(url);
    var data = await response.json();
    mainQuote.innerHTML = "";
    mainQuote.innerText = `"${data.quote}"`;
    quoteAuthor.innerHTML = `<span id="span2">--</span> "${data.author}"`;
}

const url = "https://dummyjson.com/quotes/random"; // Api URl //
getQuote(url);


getQuoteButton.addEventListener("click", () => { // button to get new quote //

    getQuote(url)

});

function tweet(){ // to tweet this quote on the twitter //
    window.open("https://twitter.com/intent/tweet?text=" + mainQuote.innerText + "--by  " + quoteAuthor.innerText, "Tweet Window", "width=600, height=300")
};

shareButton.addEventListener("click", () => {  

    tweet()
});



