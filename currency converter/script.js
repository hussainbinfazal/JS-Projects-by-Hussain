
let fromInput = document.getElementById("fromCurrency")
let toInput = document.getElementById("toCurrency")
let select = document.getElementById("select1")
let toCurrency = document.getElementById("select2")
let icon = document.querySelector(".middle i")
let convertedAmount = document.getElementById("convertedAmount")
let convertButton = document.getElementById("convert")


async function convertCurrency() { // fetch currencies from API //
    let currencies = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`)
    let response = await currencies.json();
    // console.log(response)
    let currencyObject = {}
    for ([key, value] of Object.entries(response)){
        currencyObject[key] = value;
        createOption(key , value)
        createOption2(key , value)
    //   console.log(key)
    //   console.log(value)


    }
    
}

function createOption(key , value){ // create select from currencies //
    let option = document.createElement("option");
    option.setAttribute("id","option");
    option.innerHTML = `${key} - ${value}`;
    select.appendChild(option)
    
    // toCurrency.appendChild(option)
}
function createOption2(key , value){
    let option = document.createElement("option");
    option.setAttribute("id","option");
    option.innerHTML = `${key} - ${value}`;
    toCurrency.appendChild(option)
    
    
}

async function updateCurrency(){  // update converted amount  //
    let currCode = select.value.split("-")[0]
    let toCurrCode = toCurrency.value.split("-")[0]
    let rates = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currCode}.json`)
    let answer = await rates.json()
    if (answer[currCode] && answer[currCode][toCurrCode]) {
        if(!fromInput.value == ""){
            let conversionRate = answer[currCode][toCurrCode];
        console.log(`Conversion rate from ${currCode} to ${toCurrCode}:`, conversionRate);

        toInput.value = fromInput.value*conversionRate;
        toInput.innerHTML = (parseFloat(fromInput.value).toFixed(2));
        convertedAmount.innerHTML = `${fromInput.value} ${currCode} = ${toInput.value} ${toCurrCode}`;
        }else{
            alert("Input value is empty")
            fromInput.innerHTML = "Please Write Something"
        }
        
    } else {
        console.error("Conversion rate not available for these currencies.");
    }
    
}
convertCurrency()

convertButton.addEventListener("click",()=>{
    updateCurrency()
})