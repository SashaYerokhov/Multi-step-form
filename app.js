const form = document.querySelector("#form");

const numberCards = document.querySelectorAll(".card__left-number p");

const cardBlocks = document.querySelectorAll(".card__block");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const telInput = document.querySelector("#tel");
const btnsNext = document.querySelectorAll(".btn-next");
const btnsBack = document.querySelectorAll(".btn-prev");
const inputFields = document.querySelectorAll(".input__fields");


const namePattern = /^[a-zA-Z]{3,30}$/;

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const telPattern = /^\+1\d{10,13}/;


let cardBlockIndex = 0;

let formStepIndex = 0;


function updateNumber() {
  numberCards.forEach((numberCard, index) => {

    if (index === cardBlockIndex) {
      // console.log(index, cardBlockIndex); // 0 0
      numberCard.parentElement.parentElement.classList.add("info-active");
    } else {
      numberCard.parentElement.parentElement.classList.remove("info-active");
    }
  });
}



btnsBack.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (cardBlockIndex > 0) {
    
      cardBlocks[cardBlockIndex].classList.remove("card__block-active");
      cardBlockIndex--;
      formStepIndex--; 
      updateNumber();
      cardBlocks[cardBlockIndex].classList.add("card__block-active");
    }
  });
});


btnsNext.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    let canProceed = false;
  
    if (formStepIndex === 0) {
      canProceed = validateForm(index);
    } else if (formStepIndex === 1) {
      canProceed = selectCard;
    } else if (formStepIndex === 2) {
      canProceed = cardChecked;
    } else if (formStepIndex === 3) {
      canProceed = true; 
    }
  
    if (canProceed && cardBlockIndex < cardBlocks.length - 1) {
      cardBlocks[cardBlockIndex].classList.remove("card__block-active");
      cardBlockIndex++;
      formStepIndex++;
      updateNumber();
      cardBlocks[cardBlockIndex].classList.add("card__block-active");
    }
  });
});

function validateForm(card) {
  const inputs = cardBlocks[card].querySelectorAll("input");

  let valid = true;

  inputs.forEach((input) => {


    if (!input.value) {
      input.parentElement.classList.add("error-block");
      input.style.border = "2px solid hsl(354, 84%, 57%)";
      valid = false;
    } else {
      valid = true;
      input.style.border = "";
      input.parentElement.classList.remove("error-block");

      // valid = true;
    }
  });
  return valid;
}


form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Step 2 - Toggle
const toggleBox = document.querySelector("#toggle");
const choiceMonthly = document.querySelectorAll(".card__plan-month");
const choiceYearly = document.querySelectorAll(".card__plan-year");
const freeTexts = document.querySelectorAll(".card__plan-free");

const planSelections = document.querySelectorAll(".card__plan-selection");


const cardAddMonthly = document.querySelector(".card__add.monthly");
const cardAddYearly = document.querySelector(".card__add.yearly");


const arcadeName = document.querySelector(".arcade-name p");
const arcadePrice = document.querySelector(".arcade-price");
// console.log(arcadePrice);

const arcadePeriod = document.querySelector(".arcade-name span");
// console.log(arcadePeriod);

const cardSummaryPeriod = document.querySelector(".card__summary-total span");

function selectCard() {
  toggleBox.addEventListener("change", () => {
    choiceMonthly.forEach((monthly) => {
      if (toggleBox.checked) {
        monthly.style.display = "none";
        cardAddMonthly.style.display = "none";
      } else {
        monthly.style.display = "block";
        cardAddYearly.style.display = "flex";
      }
    });
    choiceYearly.forEach((yearly) => {
      if (toggleBox.checked) {
        yearly.style.display = "block";
        cardAddYearly.style.display = "flex";
      } else {
        yearly.style.display = "none";
        cardAddMonthly.style.display = "none";
      }
    });
    freeTexts.forEach((text) => {
      if (toggleBox.checked) {
        text.style.display = "block";
      } else {
        text.style.display = "none";
      }
    });
  });

  planSelections.forEach((planSelection, index) => {
    planSelection.addEventListener("click", () => {
      planSelections.forEach((planS) => planS.classList.remove("active"));
      planSelection.classList.add("active");
      updateSelectedPlan();
    });
  });

  function updateSelectedPlan() {
    const activePlan = document.querySelector(".card__plan-selection.active");
    if (!activePlan) return;

    const planName = activePlan.querySelector(".card__plan-name").textContent;
    const isYearly = toggleBox.checked;


    let price, periodUp, periodDown;

    if (isYearly) {
      price = activePlan.querySelector(".card__plan-year").textContent;
      periodUp = "Yearly";
      periodDown = "year";
    } else {
      price = activePlan.querySelector(".card__plan-month").textContent;
      periodUp = "Monthly";
      periodDown = "month";
    }

    arcadeName.textContent = planName;
    arcadePrice.textContent = price;
    arcadePeriod.textContent = periodUp;
    cardSummaryPeriod.textContent = periodDown;
  }
  updateFinishCount();
}

selectCard();



// Step 3 Checkbox
const checkBox = document.querySelectorAll("input");

const cardAddTitles = document.querySelectorAll(".card__add-title");
const cardAddPrices = document.querySelectorAll(".card__add-price");

const cardAdd = document.querySelector(".card__add");
const selectedPlanNames = document.getElementById("selected-plan-names");
const selectedPlanPrices = document.getElementById("selected-plan-prices");
const selectedPlanItems = document.getElementById("selected-plan-items");

function cardChecked() {

  const cardAddBlocks = document.querySelectorAll(".card__add-block");

  const selectedPlanItems = document.getElementById("selected-plan-items");


  cardAddBlocks.forEach((block) => {

    const checkbox = block.querySelector('input[type="checkbox"]');

    checkbox.addEventListener("change", () => {
      block.classList.toggle("active", checkbox.checked);
      updateSelectedPlansGrid();
    });
  });

   function updateSelectedPlansGrid() {
    const isYearly = document.getElementById("toggle").checked;
    const activeAddons = document.querySelectorAll(`
    .card__add.${isYearly ? "yearly" : "monthly"} .card__add-block.active
  `);
    selectedPlanItems.innerHTML = "";

    if (activeAddons.length === 0) {
      selectedPlanItems.innerHTML = `
      <div class="plan-row">
        <div class="plan-name">None</div>
        <div class="plan-price">$0</div>
      </div>
    `;
    } else {
      activeAddons.forEach((addon) => {
        const name = addon.querySelector(".card__add-title")?.textContent;
        const price = addon.querySelector(".card__add-price")?.textContent;

        if (name && price) {
          selectedPlanItems.innerHTML += `
          <div class="plan-row">
            <div class="plan-name">${name}</div>
            <div class="plan-price">${price}</div>
          </div>
        `;
        }
      });
    }
    updateFinishCount();
  }
  updateSelectedPlansGrid();
}
cardChecked();


document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {

      document.querySelectorAll(".card__block").forEach((section) => {
        section.classList.remove("card__block-active");
      });


      targetSection.classList.add("card__block-active");


      cardBlocks.forEach((block, index) => {
        if (block.id === targetId) {
          cardBlockIndex = index;
          formStepIndex = index; 
          updateNumber(); 
        }
      });
    }
  });
});


function updateFinishCount() {

  const isYearly = document.getElementById("toggle").checked;
  const timePeriod = isYearly ? "yr" : "mo";


  document.querySelector(".card__summary-total span").textContent =
    timePeriod === "yr" ? "year" : "month";

  const mainPlanPriceText = document.querySelector(".arcade-price").textContent;

  const mainPlanPrice = Number(mainPlanPriceText.replace(/[^0-9]/g, "")) || 0;

  const addonPrices = document.querySelectorAll(
    "#selected-plan-items .plan-price"
  );

  let addonsTotal = 0;

  addonPrices.forEach((priceElement) => {

    const priceText = priceElement.textContent;
    const price = Number(priceText.replace(/[^0-9]/g, "")) || 0;
    addonsTotal += price;
  });


  const totalAmount = mainPlanPrice + addonsTotal;

  document.querySelector(
    ".total-price"
  ).textContent = `$${totalAmount}/${timePeriod}`;
}

document.addEventListener("DOMContentLoaded", updateFinishCount);

document.getElementById("toggle").addEventListener("change", updateFinishCount);

