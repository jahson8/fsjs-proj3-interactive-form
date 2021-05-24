document.addEventListener("DOMContentLoaded", () => {
  // DOM Selections
  const jobSelect = document.getElementById("title");
  const designMenu = document.getElementById("design");
  const activitiesList = document.getElementById("activities");
  const paymentMenu = document.getElementById("payment");
  const form = document.querySelector("form");
  const zipInput = document.getElementById("zip");

  /* --------------------------
      on page load
  --------------------------------*/

  const pageLoad = () => {
    const nameInput = document.getElementById("name");
    const jobInput = document.getElementById("other-job-role");
    const paypalPymt = document.getElementById("paypal");
    const bitcoinPymt = document.getElementById("bitcoin");
    const colorMenu = document.getElementById("color");

    //hide job role input, paypal and bitcoin payment options
    jobInput.style.display = "none";
    paypalPymt.style.display = "none";
    bitcoinPymt.style.display = "none";

    // sets payment select menu  to credit card option
    paymentMenu.children[1].selected = true;

    // disable color Select
    colorMenu.disabled = true;

    //Adds focus to Name input
    nameInput.focus();
  };

  window.addEventListener("load", pageLoad);

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
  const checkboxes = document.querySelectorAll(".activities input");

  // adds activity selection functionality to page
  const handleActivitySelect = (evt) => {
    const priceOutput = document.querySelector("#activities-cost");
    const clicked = evt.target;
    const clickedTime = clicked.dataset.dayAndTime;

    //add the cost of selected activites
    const getTotalCost = (checkboxes) => {
      let totalCost = 0;
      checkboxes.forEach((box) => {
        let time = box.dataset.dayAndTime;

        // stops user from registering for activities with conflicting times
        if (clickedTime === time && clicked !== box) {
          if (clicked.checked) {
            box.disabled = true;
            box.parentNode.classList.add("disabled");
          } else {
            box.disabled = false;
            box.parentNode.classList.remove("disabled");
          }
        }

        //sums the total of selected activities
        if (box.checked) {
          totalCost += +box.dataset.cost;
        }
      });
      return totalCost;
    };

    priceOutput.textContent = `Total: $${getTotalCost(checkboxes)}`;
  };

  //Adds .focus class to Activities checkbox label on focus event and removes it on blur
  const toggleActivityFocus = (checkboxes) => {
    checkboxes.forEach((box) => {
      box.addEventListener("focus", () => {
        box.parentNode.classList.add("focus");
      });

      box.addEventListener("blur", () => {
        box.parentNode.classList.remove("focus");
      });
    });
  };

  toggleActivityFocus(checkboxes);
  activitiesList.addEventListener("change", handleActivitySelect);

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

  /* --------------------------
       Form Validation
  --------------------------------*/

  /**
   *
   * VALIDATORS
   *
   */

  //Checks checks if name field is not empty
  const nameValidator = () => {
    const nameValue = document.getElementById("name").value;
    const isNameValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    return isNameValid;
  };

  // helper function to validate email input
  const emailValidator = () => {
    const emailValue = document.getElementById("email").value;
    const isEmailValid = /^[^@]+@[^@.]+\.[a-z]+$/.test(emailValue);
    return isEmailValid;
  };

  /* Helper function to validate activities section */
  const activitiesValidator = () => {
    const actTotal = document.querySelectorAll(
      ".activities input:checked"
    ).length;
    const isActivitiesSectionValid = actTotal > 0;

    return isActivitiesSectionValid;
  };

  /**
   *
   * credit card VALIDATORS
   *
   */

  // helper function to validate credit card number
  const validateCredNum = () => {
    const credNum = document.getElementById("cc-num").value;
    const isCredNumValid = /^\d{13,16}$/.test(credNum);
    return isCredNumValid;
  };

  // helper function to validate zip
  const validateZip = () => {
    const zip = zipInput.value;
    const isZipValid = /^\d{5}$/.test(zip);
    return isZipValid;
  };

  // helper function to validate zip
  const validateCvv = () => {
    const cvv = document.getElementById("cvv").value;
    const isCvvValid = /^\d{3}$/.test(cvv);
    return isCvvValid;
  };

  // Shows validation styling on webpage
  const showFormValidation = (id, status1, status2, display = "") => {
    const label = document.getElementById(id).parentNode;
    label.classList.remove(status1);
    label.classList.add(status2);
    label.lastElementChild.style.display = display;
  };

  // form validation event handler
  const formValidation = (evt) => {
    if (!nameValidator()) {
      evt.preventDefault();
      showFormValidation("name", "valid", "not-valid", "block");
    } else {
      showFormValidation("name", "not-valid", "valid");
    }

    if (!emailValidator()) {
      evt.preventDefault();
      showFormValidation("email", "valid", "not-valid", "block");
    } else {
      showFormValidation("email", "not-valid", "valid");
    }

    if (!activitiesValidator()) {
      evt.preventDefault();
      showFormValidation("activities-box", "valid", "not-valid", "block");
    } else {
      showFormValidation("activities-box", "not-valid", "valid");
    }

    // Credit Card Validation
    if (paymentMenu.value === "credit-card") {
      if (!validateCredNum()) {
        evt.preventDefault();
        showFormValidation("cc-num", "valid", "not-valid", "block");
      } else {
        showFormValidation("cc-num", "not-valid", "valid");
      }

      if (!validateZip()) {
        evt.preventDefault();
        showFormValidation("zip", "valid", "not-valid", "block");
      } else {
        showFormValidation("zip", "not-valid", "valid");
      }
      if (!validateCvv()) {
        evt.preventDefault();
        showFormValidation("cvv", "valid", "not-valid", "block");
      } else {
        showFormValidation("cvv", "not-valid", "valid");
      }
    }
  };

  // real time zipcode validation
  zip.addEventListener("keyup", (evt) => {
    let length = evt.target.value.length;

    if (!validateZip()) {
      showFormValidation("zip", "valid", "not-valid", "block");
      zip.nextElementSibling.textContent = `You have entered ${length} digit(s). Zip Code must be 5 digits`;
    } else {
      showFormValidation("zip", "not-valid", "valid");
    }
  });

  form.addEventListener("submit", formValidation);
});
