const form = document.querySelector("#form");
// номера слева
const numberCards = document.querySelectorAll(".card__left-number p");
// карточки которые меняются
const cardBlocks = document.querySelectorAll(".card__block");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const telInput = document.querySelector("#tel");
const btnsNext = document.querySelectorAll(".btn-next");
const btnsBack = document.querySelectorAll(".btn-prev");
const inputFields = document.querySelectorAll(".input__fields");

// const formInputs = document.querySelectorAll('form input')

// регулярное выражение для имени,
const namePattern = /^[a-zA-Z]{3,30}$/;
// регулярное выражение для электоной почты
const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// регулярное выражение для телефона -  цифр не меньше 10, но не больше 13
const telPattern = /^\+1\d{10,13}/;

// Индекс для отслеживания текущего шага карты (начиная с 0 для шага 1)
let cardBlockIndex = 0;
// Переменная для отображения количества шагов формы
let formStepIndex = 0;

// Функция для обновление кругов слева, чтобы при переключение страницы изменялся цвет круга
function updateNumber() {
  numberCards.forEach((numberCard, index) => {
    // если индекс номер меньше или равен индексу карты добавляется класс и номер окрашивается в цвет
    if (index === cardBlockIndex) {
      // console.log(index, cardBlockIndex); // 0 0
      numberCard.parentElement.parentElement.classList.add("info-active");
    } else {
      numberCard.parentElement.parentElement.classList.remove("info-active");
    }
  });
}
// cardBlocks[cardBlockIndex].classList.add("card__block-active");
btnsNext.forEach((btnNext) => {
  btnNext.addEventListener("click", () => {
    if (formStepIndex === 0) {
      if (validateForm) {
        cardBlocks[cardBlockIndex].classList.remove("card__block-active");
        cardBlockIndex++;
        updateNumber();
      }
      cardBlocks[cardBlockIndex].classList.add("card__block-active");
    }
    if (formStepIndex === 1) {
      if (selectCard) {
        cardBlocks[cardBlockIndex].classList.remove("card__block-active");
        cardBlockIndex++;
        updateNumber();
      }
      cardBlocks[cardBlockIndex].classList.add("card__block-active");
    }
    if (formStepIndex === 2) {
      if (cardChecked)
        cardBlocks[cardBlockIndex].classList.remove("card__block-active");
      cardBlockIndex++;
      updateNumber();
    }
    cardBlocks[cardBlockIndex].classList.add("card__block-active");
    if (formStepIndex === 3) {
    }
  });
});
// btnsNext.forEach((btnNext) => {
//   btnNext.addEventListener("click", () => {
//     // Проверяем условия перед переходом
//     if (formStepIndex === 0 && !validateForm()) return; // Пример валидации
//     if (formStepIndex === 1 && !selectCard) return; // Пример проверки выбора плана

//     // Скрываем текущую секцию
//     cardBlocks[cardBlockIndex].classList.remove("card__block-active");

//     // Увеличиваем индекс, но не выходим за пределы
//     if (cardBlockIndex < cardBlocks.length - 1) {
//       cardBlockIndex++;
//       formStepIndex++; // Если formStepIndex синхронизирован
//       updateNumber(); // Обновляем UI (если нужно)
//     }

//     // Показываем следующую секцию
//     cardBlocks[cardBlockIndex].classList.add("card__block-active");
//   });
// });

// Показать текущий шаг формы
// function showCard(card) {
//   cardBlocks.forEach((cardBlock, index) => {
//     cardBlock.classList.remove("card__block-active");
//     if (index === card) {
//       cardBlock.classList.add("card__block-active");
//     }
//   });
// }

// Переход к следующему шагу
// btnsNext.forEach((btn, index) => {
//   btn.addEventListener("click", () => {
//     if (validateForm(index)) {
//       cardBlockIndex++;
//       showCard(cardBlockIndex);
//     } else if (selectCard(index)) {
//       cardBlockIndex++;
//       showCard(cardBlockIndex);
//     }
//   });
// });

// Переход к предыдущему шагу
btnsBack.forEach((btn) => {
  btn.addEventListener("click", () => {
    cardBlockIndex--;
    showCard(cardBlockIndex);
  });
});

// Проверьте поля формы перед переходом к следующему шагу
function validateForm(card) {
  const inputs = cardBlocks[card].querySelectorAll("input");

  let valid = true;

  inputs.forEach((input) => {
    // Обращаемся к ошибке через инпут то есть к его родительскому элементу

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

// Обработка отправки формы
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Step 2 - Toggle
const toggleBox = document.querySelector("#toggle");
const choiceMonthly = document.querySelectorAll(".card__plan-month");
const choiceYearly = document.querySelectorAll(".card__plan-year");
const freeTexts = document.querySelectorAll(".card__plan-free");

const planSelections = document.querySelectorAll(".card__plan-selection");

// переменные для блока месяца и блока год в 3 шаге формы
const cardAddMonthly = document.querySelector(".card__add.monthly");
const cardAddYearly = document.querySelector(".card__add.yearly");

// const monthlyPeriod = document.querySelector(".plan__toggle .monthly").textContent;
// console.log(monthlyPeriod);
// const earlyPeriod = document.querySelector(".plan__toggle .yearly").textContent;
// console.log(earlyPeriod);

// const selectedPlanName = document.getElementById("selected-plan-name");
// const selectedPlanPrice = document.getElementById("selected-plan-price");

// переменные для записи данных на шаге 4 - вверху
const arcadeName = document.querySelector(".arcade-name p");
const arcadePrice = document.querySelector(".arcade-price");
// console.log(arcadePrice);

const arcadePeriod = document.querySelector(".arcade-name span");
// console.log(arcadePeriod);
// переменные для записи данных на шаге 4 - внизу
const cardSummaryPeriod = document.querySelector(".card__summary-total span");

// тоггл для обновленция цены
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

  // переключение карточек
  planSelections.forEach((planSelection, index) => {
    planSelection.addEventListener("click", () => {
      planSelections.forEach((planS) => planS.classList.remove("active"));
      planSelection.classList.add("active");
      updateSelectedPlan();
    });
  });

  // function updateSelectedPlan() {
  //   const activePlan = document.querySelector(".card__plan-selection.active");
  //   if (!activePlan) return;

  //   const planName = activePlan.querySelector(".card__plan-name").textContent;
  //   // const planToggle = document.querySelector('.plan__toggle');
  //   // console.log(planToggle);
  //   let price, period;
  //   // const isYearly = toggleBox.checked;
  //   // const price = isYearly;
  //   if (toggleBox.checked) {
  //     price = activePlan.querySelector(".card__plan-year").textContent;
  //     // console.log(price);

  //     period = document.querySelector(".plan__toggle .yearly").textContent;
  //   } else {
  //     price = activePlan.querySelector(".card__plan-month").textContent;
  //     period = document.querySelector(".plan__toggle .monthly").textContent;

  //     // console.log(price);
  //   }
  //   arcadeName.textContent = planName;
  //   arcadePrice.textContent = price;
  //   // console.log(price);

  //   // попробовать с помощью регулярных выражений `${}`
  //   arcadePeriod.textContent = period;
  //   // selectedPlanName.textContent = planName;
  //   // selectedPlanPrice.textContent = price;
  // }
  function updateSelectedPlan() {
    const activePlan = document.querySelector(".card__plan-selection.active");
    if (!activePlan) return;

    const planName = activePlan.querySelector(".card__plan-name").textContent;
    const isYearly = toggleBox.checked;

    // Переменные для вывода цены, периода месяц/год вверху и внизу
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
    // console.log("Yearly mode:", isYearly); // не включен год - false, включен - true
    arcadeName.textContent = planName;
    arcadePrice.textContent = price;
    arcadePeriod.textContent = periodUp;
    cardSummaryPeriod.textContent = periodDown;
  }
  updateFinishCount();
}
// updateSelectedPlan();
selectCard();

// нужно сделать при открытии 3-го шага если тогл месяц - открытие месяц, если год - открытие годы

// Step 3 Checkbox
const checkBox = document.querySelectorAll("input");

const cardAddTitles = document.querySelectorAll(".card__add-title");
const cardAddPrices = document.querySelectorAll(".card__add-price");

const cardAdd = document.querySelector(".card__add");
const selectedPlanNames = document.getElementById("selected-plan-names");
const selectedPlanPrices = document.getElementById("selected-plan-prices");
const selectedPlanItems = document.getElementById("selected-plan-items");

/*
cardAdd.addEventListener("click", (event) => {
  // помилка - у меня уже есть такая перменная и нужно было задать новое имя переменной
  const cartAdd = event.target.closest(".card__add-block");
  // И соответственно - здесь тоже ошибка
  if (!cardAdd) return;

  if (event.target.nodeName === "INPUT") {
    // помилка - здесь класс актив добавляется родителю, а не каждому блоку
    cardAdd.classList.add("active");
    // помилка - здесь было без слова let
    price = cardAdd.querySelector(".card__add-price").textContent;
    // помилка - здесь было без слова let
    title = cardAdd.querySelector(".card__add-title").textContent;
  }
  
    selectedPlanName.textContent = title;
    selectedPlanPrice.textContent = price;
});
*/
// исправленный вариант - по подсказкам DeepSek
/* после исправления ошибок - все работает, только данные по 
    заголовку и ценам - меняются, а не добавляются как нужно, а
    значит нужно использовать пустой массив отдельно для заголовка,
    отдельно для цены и при помощи метода push добавлять туда данные
*/

// function cardChecked() {
//   const cardAdd = document.querySelectorAll(".card__add");
//   const selectedPlanItems = document.getElementById("selected-plan-items");

//   cardAdd.forEach((cardA) => {
//     cardA.addEventListener("click", (event) => {
//       const cardAddBlock = event.target.closest(".card__add-block");
//       if (!cardAddBlock) return;

//       const checkbox = cardAddBlock.querySelector('input[type="checkbox"]');

//       if (
//         event.target === checkbox ||
//         event.target.closest(".card__add-check")
//       ) {
//         cardAddBlock.classList.toggle("active", checkbox.checked);
//         updateSelectedPlansGrid();
//       }
//     });
//   });

//   function updateSelectedPlansGrid() {
//     const activeCards = document.querySelectorAll(".card__add-block.active");
//     // console.log(activeCards);

//     selectedPlanItems.innerHTML = "";

//     if (activeCards.length === 0) {
//       selectedPlanItems.innerHTML = `
//       <div class="plan-row">
//         <div class="plan-name">None</div>
//         <div class="plan-price">$0</div>
//       </div>
//     `;
//     } else {
//       activeCards.forEach((card) => {
//         const name = card.querySelector(".card__add-title").textContent;
//         const price = card.querySelector(".card__add-price").textContent;
//         selectedPlanItems.innerHTML += `
//         <div class="plan-row">
//           <div class="plan-name">${name}</div>
//           <div class="plan-price">${price}</div>
//         </div>
//       `;
//       });
//     }
//   }
//   // Инициализация при загрузке
//   updateSelectedPlansGrid();
// }
function cardChecked() {
  // Переменная для карточек блоков с чекбоксом месяц/год - 6 штук
  const cardAddBlocks = document.querySelectorAll(".card__add-block");
  // Перемення для вывода результатов
  const selectedPlanItems = document.getElementById("selected-plan-items");

  // Проходим по каждой карточке
  cardAddBlocks.forEach((block) => {
    // переменная для чекбокса
    const checkbox = block.querySelector('input[type="checkbox"]');
    // собыитие для чекбокса
    checkbox.addEventListener("change", () => {
      block.classList.toggle("active", checkbox.checked);
      updateSelectedPlansGrid();
    });
  });

  // function updateSelectedPlansGrid() {
  //   // Берем все карточки с чекбоксами - преборзуем в массив
  //   // отфильтруем только те карточки - где чекбокс включен
  //   const activeCards = Array.from(
  //     document.querySelectorAll(".card__add-block")
  //   ).filter((block) => block.querySelector("input[type='checkbox']").checked);

  //   selectedPlanItems.innerHTML = "";

  //   if (activeCards.length === 0) {
  //     selectedPlanItems.innerHTML = `
  //     <div class="plan-row">
  //       <div class="plan-name">None</div>
  //       <div class="plan-price">$0</div>
  //     </div>
  //   `;
  //   } else {
  //     activeCards.forEach((card) => {
  //       // const name = card.querySelector(".card__add-title")?.textContent;
  //       const titleElement = card.querySelector(".card__add-title");
  //       let name;
  //       if (titleElement) {
  //         name = titleElement.textContent; // Записываем только если элемент найден
  //       }
  //       // const price = card.querySelector(".card__add-price")?.textContent;
  //       const priceElement = card.querySelector(".card__add-price");
  //       let price;
  //       if (priceElement) {
  //         price = priceElement.textContent;
  //       }
  //       if (name && price) {
  //         selectedPlanItems.innerHTML += `
  //         <div class="plan-row">
  //           <div class="plan-name">${name}</div>
  //           <div class="plan-price">${price}</div>
  //         </div>
  //       `;
  //       }
  //     });
  //   }
  // }
  function updateSelectedPlansGrid() {
    const isYearly = document.getElementById("toggle").checked;
    const activeAddons = document.querySelectorAll(`
    .card__add.${isYearly ? "yearly" : "monthly"} .card__add-block.active
  `);
    // console.log("Active addons:", activeAddons);
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
        // console.log(name);

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

// updateFifnshCount();

/**
 *
 * Итого как сделать общую сумму
 * Внизу также сделать сумму месяц / год
 * Яблоки паперуха -  заморозить
 * прописать код
 */

// Есть один index.html, который разбит на 4 разные article на разных страниах. один article - одна страница На 4 article есть тег <a href="index.html#select_plan">Change</a> и <a href="#select_plan">Change</a> - переход на article 2 <div class="card__block" id="select_plan"> Почему-то не срабатывает?

/** кнопка change - переход на шаг формы 2 - сделать
 * Нужно сделать событие клик на ссылку
 * Нужно найти 2 блок через ID
 * Клику событие клик
 * клик добавляет класс актив
 */

// для возврата к шагу номер 2
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Скрываем все секции
      document.querySelectorAll(".card__block").forEach((section) => {
        section.classList.remove("card__block-active");
      });

      // Показываем нужную секцию
      targetSection.classList.add("card__block-active");

      // Обновляем cardBlockIndex в соответствии с выбранной секцией
      cardBlocks.forEach((block, index) => {
        if (block.id === targetId) {
          cardBlockIndex = index;
          formStepIndex = index; // Если formStepIndex тоже используется для логики
          updateNumber(); // Обновляем нумерацию (если есть)
        }
      });
    }
  });
});


/**
 * Шаг формы - 2
 * Сделать переход со втрого шага на третий
 * При переключении тогла на месяц - 3 шаг откроется месяц, год - должен открыться год
 */

/**
 * кнопка вперед только на первой странице,
 * на второй появляется кнопка - назад
 * Переключение между другими формами использвать
 * как переключение между слайдерами
 * 2 выбор - сделать как переключение планов в кофе
 *  и тоггл как переключение планов как в фотоснапе
 *
 *  * Регулярное выражение для телефоного номера
 * валидация формы
 * действия при ошибке
 * действия при положительном исходе
 * если положительный исход - кнопка дальше
 * если положительный исход - переключение кнопки слева
 * на 2 и так далее
 * попробовать все переключения
 */


// Функция подсчитать итоговую сумму выбранных услуг
function updateFinishCount() {
  // При переключении тоггла на шаге 2 - выбирается год / месяц
  const isYearly = document.getElementById("toggle").checked;
  const timePeriod = isYearly ? "yr" : "mo";

  // Обновляем отображение периода в итоговой строке
  document.querySelector(".card__summary-total span").textContent =
    timePeriod === "yr" ? "year" : "month";

  // Получаем цену основного плана
  // Переменная для цены для выбора плана на шаге 2 - выводится вверху
  const mainPlanPriceText = document.querySelector(".arcade-price").textContent;
  // переменная для того чтобы осталась только число
  const mainPlanPrice = Number(mainPlanPriceText.replace(/[^0-9]/g, "")) || 0;
  // console.log("Основной план:", mainPlanPrice);

  // Получаем цены дополнительных услуг
  // переменная для выбора дополнительных услуг когда выбраны 1 , 2 или все 3
  const addonPrices = document.querySelectorAll(
    "#selected-plan-items .plan-price"
  );
  // console.log("Доп. услуги:", addonPrices);
  // Переменная для общего подсчета цены изначально - 0
  let addonsTotal = 0;

  addonPrices.forEach((priceElement) => {
    // проходим по всем дополнительным услугам и выбираем из только число
    const priceText = priceElement.textContent;
    const price = Number(priceText.replace(/[^0-9]/g, "")) || 0;
    addonsTotal += price;
  });

  // Суммируем и выводим результат
  const totalAmount = mainPlanPrice + addonsTotal;
  // console.log("Итого:", totalAmount);
  // переменная для итоговой суммы
  document.querySelector(
    ".total-price"
  ).textContent = `$${totalAmount}/${timePeriod}`;
}

// Вызываем функцию при:
// 1. Загрузке страницы
document.addEventListener("DOMContentLoaded", updateFinishCount);
// 2. Изменении периода
document.getElementById("toggle").addEventListener("change", updateFinishCount);
// 3. Изменении выбора плана или допуслуг (добавьте эти вызовы в соответствующие обработчики)
