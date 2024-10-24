const BASE_URL = "https://v6.exchangerate-api.com/v6/3886ae02969e202b4c90def1/latest/USD";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg=document.querySelector(".msg")

for (let select of dropdowns) {
  for (let code in country) {
    let newoptn = document.createElement("option");
    newoptn.innerText = code;
    newoptn.value = code;
    if (select.name === "from" && code === "usd") {
      newoptn.selected = "selected";
    } else if (select.name === "to" && code === "inr") {
      newoptn.selected = "selected";
    }
    select.append(newoptn);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  console.log(element);
  let code = element.value;
  let countryCode = country[code];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;

  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }

  try {
    let response = await fetch(BASE_URL); // No need to append more to the base URL
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value.toUpperCase()];
    console.log(rate);
    if (rate) {
      console.log(`Exchange rate from USD to ${toCurr.value.toUpperCase()} is ${rate}`);
      let finalamt=amtval*rate;
  msg.innerText=`${amtval} ${fromCurr.value}=${finalamt} ${toCurr.value}`;
      // Perform your calculations based on the fetched rate and amount
    } else {
      console.log('Rate not found for selected currency.');
    }
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
  
});
