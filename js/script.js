document.addEventListener("DOMContentLoaded", () => {
  // DOM Selections
  const jobSelect = document.getElementById("title");
  const designMenu = document.getElementById("design");
  const activitiesList = document.getElementById("activities");
  const paymentMenu = document.getElementById("payment");
  const form = document.querySelector("form");

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

    // sets payment select menu  to credit card optiom
    paymentMenu.children[1].selected = true;

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

  // adds activity selection functionality to page
  const handleActivitySelect = (evt) => {
    const checkboxes = document.querySelectorAll(".activities input");
    const priceOutput = document.querySelector("#activities-cost");

    //add the cost of selected activites
    const getTotalCost = (checkboxes) => {
      let totalCost = 0;
      checkboxes.forEach((box) => {
        if (box.checked) {
          totalCost += +box.dataset.cost;
        }
      });
      return totalCost;
    };

    //blocks a user from registering for activities which have a time conflict
    // const blockTimeConflict = (checkboxes, clicked) => {
    //   checkboxes.forEach((box) => {
    //     if (
    //       box.dataset.dayAndTime === clicked.dataset.dayAndTime &&
    //       box !== clicked
    //     ) {
    //       box.disabled = true;
    //     } else if (
    //       box.dataset.dayAndTime === clicked.dataset.dayAndTime &&
    //       box !== clicked &&
    //       !clicked.checked
    //     ) {
    //       box.disabled = false;
    //     }
    //   });
    // };

    // if (clicked.tagName === "INPUT") {
    //   blockTimeConflict(checkboxes, clicked);
    // }

    let total = getTotalCost(checkboxes);
    priceOutput.textContent = `Total: $${total}`;
  };

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
    const zip = document.getElementById("zip").value;
    const isZipValid = /^\d{5}$/.test(zip);

    return isZipValid;
  };

  // helper function to validate zip
  const validateCvv = () => {
    const cvv = document.getElementById("cvv").value;
    const isCvvValid = /^\d{3}$/.test(cvv);
    return isCvvValid;
  };

  // form validation event handler
  const formValidation = (evt) => {
    // Shows validation styling on webpage
    const showPageValidation = (id, status1, status2, display = "") => {
      const label = document.getElementById(id).parentNode;
      label.classList.remove(status1);
      label.classList.add(status2);
      label.lastElementChild.style.display = display;
    };

    if (!nameValidator()) {
      evt.preventDefault();
      showPageValidation("name", "valid", "not-valid", "block");
    } else {
      showPageValidation("name", "not-valid", "valid");
    }

    if (!emailValidator()) {
      evt.preventDefault();
      showPageValidation("email", "valid", "not-valid", "block");
    } else {
      showPageValidation("email", "not-valid", "valid");
    }

    if (!activitiesValidator()) {
      evt.preventDefault();
      showPageValidation("activities-box", "valid", "not-valid", "block");
    } else {
      showPageValidation("activities-box", "not-valid", "valid");
    }

    if (paymentMenu.value === "credit-card") {
      if (!validateCredNum()) {
        evt.preventDefault();
        showPageValidation("cc-num", "valid", "not-valid", "block");
      } else {
        showPageValidation("cc-num", "not-valid", "valid");
      }

      if (!validateZip()) {
        evt.preventDefault();
        showPageValidation("zip", "valid", "not-valid", "block");
      } else {
        showPageValidation("zip", "not-valid", "valid");
      }
      if (!validateCvv()) {
        evt.preventDefault();
        showPageValidation("cvv", "valid", "not-valid", "block");
      } else {
        showPageValidation("cvv", "not-valid", "valid");
      }
    }
  };

  form.addEventListener("submit", formValidation);
});
