document.querySelector("#signUpTrigger").addEventListener("click", () => {
  document.querySelector(".login-box").classList.toggle("active-box");
  document.querySelector(".signup-box").classList.toggle("active-box");
});

document.querySelector("#LogInTrigger").addEventListener("click", () => {
  document.querySelector(".login-box").classList.toggle("active-box");
  document.querySelector(".signup-box").classList.toggle("active-box");
});

const fodase = () => {
  alert("foda-se?");
};

const getLocalStorageInfo = () => {
  let localStorageInfo = localStorage.getItem("accs");
  if (localStorageInfo) accs = JSON.parse(localStorageInfo);
};

const searchBy = (key, value, needInfo = true) => {
  let answer = accs.find((element) => element[key] == value);
  if (!answer) return false;
  return needInfo ? answer : true;
};

const showWarning = (element, warning) => {
  element.classList.add("element-warning");
  warning.classList.add("active-warning");
};

const hideWarning = (element, warning) => {
  element.classList.remove("element-warning");
  warning.classList.remove("active-warning");
};

const emailTester = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const getEmail = (element) => {
  if (element.value.includes("@")) {
    if (!emailTester(element.value)) {
      showWarning(element, element.parentNode.children[2]);
      return;
    }
    element.value;
    user = "";
    hideWarning(element, element.parentNode.children[2]);
  }
  user = element.value;
  hideWarning(element, element.parentNode.children[2]);
};

/*=======> signing up shit ahead <==============*/

const getNewUserData = (element, dataName) => {
  switch (dataName) {
    case "user":
      newUserObject.newUser = element.value;
      break;
    case "email":
      if (element.value && !emailTester(element.value)) {
        showWarning(element, element.parentNode.children[2]);
      } else {
        hideWarning(element, element.parentNode.children[2]);
      }
      newUserObject.newUserEmail = element.value;
      break;
    case "userName":
      newUserObject.newUserName = element.value;
      break;
    case "password":
      if (element.value && element.value.length < 8) {
        showWarning(element, element.parentNode.children[2]);
      } else {
        hideWarning(element, element.parentNode.children[2]);
      }
      newUserObject.newUserPassword = element.value;
      break;
    case "userTerm":
      newUserObject.newUserAgree = !newUserObject.newUserAgree;
      break;
    default:
      return;
  }

  cleaningUpSigningUpWarnings(dataName);
};

const showingUpModal = (id) => {
  let modalTrigger = document.createElement("button");
  modalTrigger.setAttribute("data-bs-toggle", "modal");
  modalTrigger.setAttribute("data-bs-target", `#${id}`);
  modalTrigger.style = "display: none;";
  document.body.append(modalTrigger);
  modalTrigger.click();
  modalTrigger.remove();
};

const cleaningUpSigningUpWarnings = (dataName) => {
  switch (dataName) {
    case "user":
      if (
        document
          .querySelector(".new-name-warning")
          .classList.contains("active-warning")
      ) {
        document
          .querySelector(".new-name-warning")
          .classList.remove("active-warning");
      }
      break;
    case "email":
      if (
        document
          .querySelector(".new-email-warning")
          .classList.contains("active-warning")
      ) {
        document
          .querySelector(".new-email-warning")
          .classList.remove("active-warning");
      }
      if (
        document
          .querySelector(".email-used-warning")
          .classList.contains("active-warning")
      ) {
        document
          .querySelector(".email-used-warning")
          .classList.remove("active-warning");
      }
      break;
    case "userName":
      if (
        document
          .querySelector(".new-user-name-warning")
          .classList.contains("active-warning")
      ) {
        document
          .querySelector(".new-user-name-warning")
          .classList.remove("active-warning");
      }
      if (
        document
          .querySelector(".user-name-used-warning")
          .classList.contains("active-warning")
      ) {
        document
          .querySelector(".user-name-used-warning")
          .classList.remove("active-warning");
      }
      break;
    case "password":
      if (
        document
          .querySelector(".new-password-warning")
          .classList.contains("active-warning")
      ) {
        document
          .querySelector(".new-password-warning")
          .classList.remove("active-warning");
      }
      break;
    default:
      return;
  }
};

const resetSigningUpBox = () => {
  document.querySelector("#newName").value = "";
  document.querySelector("#newEmail").value = "";
  document.querySelector("#newUserName").value = "";
  document.querySelector("#newPassword").value = "";
  document.querySelector("#userTerm").click();

  newUserObject = signUpInitialState;

  document.querySelector(".login-box").classList.toggle("active-box");
  document.querySelector(".signup-box").classList.toggle("active-box");
};

const signingUp = (element) => {
  let returning = false;

  if (newUserObject.newUserEmail || newUserObject.newUserName) {
    accs.forEach((acc) => {
      if (acc.userName == newUserObject.newUserName) {
        showWarning(
          document.querySelector("#newUserName"),
          document.querySelector(".user-name-used-warning")
        );
        returning = true;
      }
      if (acc.userEmail == newUserObject.newUserEmail) {
        showWarning(
          document.querySelector("#newEmail"),
          document.querySelector(".email-used-warning")
        );
        returning = true;
      }
    });
  }

  if (!newUserObject.newUser) {
    document.querySelector(".new-name-warning").classList.add("active-warning");
  }

  if (!newUserObject.newUserEmail) {
    document
      .querySelector(".new-email-warning")
      .classList.add("active-warning");
  }

  if (!newUserObject.newUserName) {
    document
      .querySelector(".new-user-name-warning")
      .classList.add("active-warning");
  }

  if (!newUserObject.newUserPassword) {
    document
      .querySelector(".new-password-warning")
      .classList.add("active-warning");
  }

  if (returning) return

  if (
    newUserObject.newUser &&
    emailTester(newUserObject.newUserEmail) &&
    newUserObject.newUserName &&
    newUserObject.newUserPassword.length >= 8 &&
    newUserObject.newUserAgree
  ) {
    const userData = {
      user: newUserObject.newUser,
      userEmail: newUserObject.newUserEmail,
      userName: newUserObject.newUserName,
      userPassword: newUserObject.newUserPassword,
      userAgree: newUserObject.newUserAgree,
    };

    accs.push(userData);
    localStorage.setItem("accs", JSON.stringify(accs));
    showingUpModal("signingUpModal");
    resetSigningUpBox();
  }
};

/*==============> Loging In Shit <===================*/

const loggingIn = (element) => {
  let user = {};

  if (document.querySelector("#user").value) {
    accs.forEach((acc) => {
      if (
        acc.userName == document.querySelector("#user").value ||
        acc.userEmail == document.querySelector("#user").value
      ) {
        user = acc;
      }
    });
  }

  if (!user.user) {
    document
      .querySelector(".waning-incorrect-user")
      .classList.add("fade-away-warning");
    element.classList.add("disabled");

    setTimeout(() => {
      element.classList.remove("disabled");
      document
        .querySelector(".waning-incorrect-user")
        .classList.remove("fade-away-warning");
    }, 3000);
    return false;
  }

  if (user.userPassword != document.querySelector("#password").value) {
    document
      .querySelector(".waning-incorrect-password")
      .classList.add("fade-away-warning");
    element.classList.add("disabled");

    setTimeout(() => {
      element.classList.remove("disabled");
      document
        .querySelector(".waning-incorrect-password")
        .classList.remove("fade-away-warning");
    }, 3000);
    return false;
  }

  document.querySelector("#password").value = "";
  document.querySelector("#user").value = "";

  showingUpModal("logingUpModal");
};

/*      -----------------       sync       -----------------      */

let accs = [];
let email = "";
let user = "";

const signUpInitialState = {
  newUser: "",
  newUserEmail: "",
  newUserName: "",
  newUserPassword: "",
  newUserAgree: false,
};

let newUserObject = signUpInitialState;

getLocalStorageInfo();
