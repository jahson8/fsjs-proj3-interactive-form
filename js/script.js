document.addEventListener("DOMContentLoaded", () => {
  // DOM Selections
  const nameInput = document.getElementById("name");
  const jobInput = document.getElementById("other-job-role");
  const jobSelect = document.getElementById("title");
  const colorMenu = document.getElementById("color");
  const designMenu = document.getElementById("design");
  const activitiesBox = document.getElementById("activities-box");

  //   add focus to Name Input on load
  nameInput.focus();

  /* --------------------------
        Job Role Section
  --------------------------------*/

  //  hide Job Role input on Load;
  jobInput.style.display = "none";

  //  Event handler Displaying job role input only when "other"
  //  is selected from select menu
  const showJobInput = (evt) => {
    let role = evt.target;
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

  // disable color Select
  colorMenu.disabled = true;

  // loops through a collection of elements and sets hidden attribute to boolean value
  //and selected attribute to the opposite boolean value of hidden
  const displayOptions = (arr, attribute, bool) => {
    arr.forEach((item) => {
      item[attribute] = bool;
    });
    arr[0].selected = !bool;
  };

  // function to modify color menu options
  const modifyColorMenu = (theme) => {
    const heartShirts = document.querySelectorAll("[data-theme='heart js']");
    const punShirts = document.querySelectorAll("[data-theme= 'js puns']");

    if (theme === "js puns") {
      displayOptions(punShirts, "hidden", false);
      displayOptions(heartShirts, "hidden", true);
    } else {
      displayOptions(punShirts, "hidden", true);
      displayOptions(heartShirts, "hidden", false);
    }
  };

  //
  const enableColorMenu = (evt) => {
    const theme = evt.target.value;
    colorMenu.disabled = false;
    modifyColorMenu(theme);
  };

  designMenu.addEventListener("change", enableColorMenu);

  /* --------------------------
       Activities Section
  --------------------------------*/

  const handleActivitySelect = (evt) => {};

  activitiesBox.addEventListener("click", handleActivitySelect);
});
