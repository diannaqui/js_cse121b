/*

    CURRENCY EXCHANGE CONVERTOR

    Author: Diana Quispe

    Purpose: This program will convert US Dollars into the currency of the chosen country. 

*/


// Set an empty array for the countries list.
let countriesList = [];
let symbolAPI = '';

// Using the method fetch, define a variable that stores the responseSym. 
const urlSymbol = 'https://run.mocky.io/v3/39187953-973f-4171-86bb-cb19e44a6639';
async function getSymbol() {
    const responseSym = await fetch(urlSymbol);
    if (responseSym.ok) {
      symbolAPI = await responseSym.json();
      console.log(symbolAPI);
    }
}

getSymbol();

// Define a function that stores the countries list and creates a list as an HTML dropdown menu.
const output = (countriesList) => {
  countriesList.forEach(
    countryName => 
    {
      var select = document.getElementById("list");
      var cName = document.createElement("option");
      cName.textContent = countryName.name;
      select.appendChild(cName);
    }
  );
};

// Using the method fetch, define a variable that stores the response. 
// Define another variable that stores the whole array and pass it in the function output.
const url = 'https://api.coinbase.com/v2/currencies';
async function getInfoCountries() {
    const response = await fetch(url);
    if (response.ok) {
      let countriesListAPI = await response.json();
      countriesList = countriesListAPI.data;
                //console.log(countriesList);
      output(countriesList);
    }
}

// Call the function getInfoCountries()
printMiniFlags();
getInfoCountries();

// Create a new variable that stores the code of the chosen country.
let idLetters = '';
//let newSymbol = '';
// Define a function that obtains the index of the chosen country.
function getIndex() {
  let filterName = document.querySelector("#list").value;
  // Define a function that finds the chosen country from the array.
  const selectCountry = countriesList => countriesList.name == filterName;  
  // Define a variable that stores the index of the chosen country.
  let indexCountry = countriesList.findIndex(selectCountry);  
  // Define a variable that stores the code of the country based on the index.
  idLetters = countriesList[indexCountry].id; 
  getRates();

              // console.log(indexCountry);
              // console.log(filterName);
              // console.log(idLetters);
}

// Add a change event listener to the HTML element with an ID of list that calls the getIndex function
document.querySelector("#list").addEventListener("change", getIndex);

// Using the method fetch, define a variable that stores the response. 
const urlRates = 'https://open.er-api.com/v6/latest/USD';
async function getRates() {
  const response = await fetch(urlRates);
  if (response.ok) {
    let countriesRatesAPI = await response.json();
    // Define a variable that stores the array obtained from the fetch method.
    let countriesRates = countriesRatesAPI.rates;
    // Define a variable that stores the currency exchange amount based on the chosen country.
    let rate = countriesRates[idLetters];
    // Call the function convert and pass the variable rate.
    convert(rate);
              //console.log(countriesRates);
              //console.log(symbolAPI);
    let symbol = symbolAPI[idLetters];
    if (!symbol){symbol = '';}

    // Display the rate of the selected currency
    let textRate = `The current rate for the chosen country is: ${symbol}${rate}`;
    document.querySelector('#rate').innerHTML = textRate;
  }
}

// Define a function that multiplies the US Dollars amount input by the currency exchange rate.
function convert(rate) {
  let amount = parseFloat(document.querySelector('#amount').value);
  let finalAmount = amount * rate;
              //console.log(`FINAL ${finalAmount}`);
  
  let symbol = symbolAPI[idLetters];
  if (!symbol){symbol = '';}

  //Display the total amount converted
  let textFinalAmount = `The total amount you will receive is: ${symbol}${finalAmount.toFixed(2)}`;
  document.querySelector('#filterName').innerHTML = textFinalAmount;

  reset();
  flag();
}


// Define a function that displays the flag of the selected country.
function flag() {
  let idFlag = idLetters.charAt(0) + idLetters.charAt(1);
  let webPageFlag = "https://countryflagsapi.com/png/" + idFlag;

  let article = document.createElement('article');
  let img = document.createElement('img');
  img.setAttribute('src', webPageFlag);
  img.setAttribute('alt', ' Flag ');

  article.appendChild(img);

  document.querySelector('#image').appendChild(img);

              //console.log(idFlag);
}

// Declare a function named reset that clears all of the <image> elements from the HTML element with an ID of image
const reset = () => {
  document.querySelector("#image").innerHTML = "";
};

// Define a function that displays seven flags on top.
function printMiniFlags() {
  for(let i=1; i<8; i++) {
    const countriesLetters = ['AE', 'AF', 'AL', 'AM', 'AO', 'AR', 'AU', 'AW', 'AZ',
                              'BA', 'BB', 'BD', 'BG', 'BH', 'BI', 'BM', 'BN', 'BO', 
                              'CA', 'CD', 'CH', 'CL', 'CN', 'CO', 'CR', 'CU', 'CV', 
                              'GB', 'GE', 'GG', 'GH', 'GI', 'GM', 'GN', 'GT', 'GY'];

    let cLetter = countriesLetters[Math.floor(Math.random()*countriesLetters.length)];

    let webPageFlag1 = "https://countryflagsapi.com/png/" + cLetter;

    let article = document.createElement('article');
    let img = document.createElement('img');
    img.setAttribute('src', webPageFlag1);

    article.appendChild(img);

    document.querySelector('#littleFlag').appendChild(img);

  }
}


