document.addEventListener("DOMContentLoaded", () => {
  // DOM Selections
  const jobSelect = document.getElementById("title");
  const designMenu = document.getElementById("design");
  const activitiesList = document.getElementById("activities");
  const paymentMenu = document.getElementById("payment");

  /* --------------------------
      on page load
  --------------------------------*/

  const loadPage = () => {
    const nameInput = document.getElementById("name");
    const jobInput = document.getElementById("other-job-role");
    const paypalPymt = document.getElementById("paypal");
    const bitcoinPymt = document.getElementById("bitcoin");
    const colorMenu = document.getElementById("color");

    //hide job role input, paypal and bitcoin payment options
    jobInput.style.display = "none";
    paypalPymt.style.display = "none";
    bitcoinPymt.style.display = "none";

    // disable color Select
    colorMenu.disabled = true;

    //Adds focus to Name input
    nameInput.focus();
  };

  window.addEventListener("load", loadPage);

  /* --------------------------
        Job Role Section
  --------------------------------*/

  //  Event handler Displaying job role input only when "other"
  //  is selected from select menu
  const showJobInput = (evt) => {
    let role = evt.target;
    const jobInput = document.getElementById("other-job-role");
    if (role.value === "other") {
      jobInput.style.display = "";
    } else {
      jobInput.style.display = "none";
    }
  };

  jobSelect.addEventListener("change", showJobInput);

  /* --------------------------
       T-shirt info Section
  --------------------------------*/

  //  changes the color menu options
  const modifyColorMenu = (theme) => {
    const heartShirts = document.querySelectorAll("[data-theme='heart js']");
    const punShirts = document.querySelectorAll("[data-theme= 'js puns']");

    // loops through a collection of elements and sets attribute to a boolean value
    //and selected attribute to the opposite boolean value of hidden
    const displayOptions = (arr, attribute, bool) => {
      arr.forEach((item) => {
        item[attribute] = bool;
      });
      arr[0].selected = !bool;
    };

    if (theme === "js puns") {
      displayOptions(punShirts, "hidden", false);
      displayOptions(heartShirts, "hidden", true);
    } else {
      displayOptions(punShirts, "hidden", true);
      displayOptions(heartShirts, "hidden", false);
    }
  };

  const enableColorMenu = (evt) => {
    const colorMenu = document.getElementById("color");
    const theme = evt.target.value;
    colorMenu.disabled = false;
    modifyColorMenu(theme);
  };

  designMenu.addEventListener("change", enableColorMenu);

  /* --------------------------
       Activities Section
  --------------------------------*/

  const handleActivitySelect = (evt) => {
    const checkboxes = document.querySelectorAll(".activities input");
    const priceOutput = document.querySelector("#activities-cost");
    let clicked = evt.target;

    //add the cost of selected activites
    const getTotalCost = (checkboxes) => {
      let total = 0;
      checkboxes.forEach((box) => {
        if (box.checked) {
          total += +box.dataset.cost;
        }
      });
      return total;
    };

    //blocks a user from registering for activities which have a time conflict
    const blockTimeConflict = (checkboxes, clicked) => {
      checkboxes.forEach((box) => {
        if (
          box.dataset.dayAndTime === clicked.dataset.dayAndTime &&
          clicked.checked
        ) {
          box.disabled = true;
        } else {
          box.disabled = false;
        }
        clicked.disabled = false;
      });
    };

    if (clicked.tagName === "INPUT") {
      blockTimeConflict(checkboxes, clicked);
    }
    let total = getTotalCost(checkboxes);
    priceOutput.textContent = `Total: $${total}`;
  };

  activitiesList.addEventListener("click", handleActivitySelect);

  /* --------------------------
       Payment Selection Section
  --------------------------------*/

  // toggles between the different payment methods on the page
  const changePaymentMethod = (evt) => {
    const credit = document.getElementById("credit-card");
    const paypalPymt = document.getElementById("paypal");
    const bitcoinPymt = document.getElementById("bitcoin");
    let method = evt.target.value;

    if (method === "bitcoin") {
      credit.style.display = "none";
      paypalPymt.style.display = "none";
      bitcoinPymt.style.display = "";
    } else if (method === "paypal") {
      credit.style.display = "none";
      paypalPymt.style.display = "";
      bitcoinPymt.style.display = "none";
    } else {
      credit.style.display = "";
      paypalPymt.style.display = "none";
      bitcoinPymt.style.display = "none";
    }
  };

  paymentMenu.addEventListener("change", changePaymentMethod);
});
