import "./style.css";

// Validate email

const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");

email.addEventListener("input", () => {
  if (email.validity.valid) {
    emailError.textContent = "";
  } else {
    showEmailError();
  }
});

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "Email is required";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Invalid email format";
  }
}

// Validate postal code

const postalCode = document.getElementById("postal-code");
const country = document.getElementById("country");
const postalCodeError = document.querySelector("#postal-code + span.error");

function checkPostalCode() {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Swiss postal codes must have exactly 4 digits: e.g. CH-1234 or 1234",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-12345 or 12345",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS: e.g. 1234 AB",
    ],
  };

  const countryValue = country.value;
  const constraint = new RegExp(constraints[countryValue][0], "");

  if (constraint.test(postalCode.value)) {
    postalCode.setCustomValidity("");
    postalCodeError.textContent = "";
  } else if (postalCode.validity.valueMissing) {
    postalCode.setCustomValidity("Postal code is required");
    postalCodeError.textContent = postalCode.validationMessage;
  } else {
    postalCode.setCustomValidity(constraints[countryValue][1]);
    postalCodeError.textContent = postalCode.validationMessage;
  }
}

country.addEventListener("change", checkPostalCode);
postalCode.addEventListener("input", checkPostalCode);

// Validate password

const password = document.getElementById("password");
const passwordError = document.querySelector("#password + span.error");
const checkLength = document.getElementById("check-length");
const checkUppercase = document.getElementById("check-uppercase");
const uppercaseRegex = /(?=.*?[A-Z])/;
const checkNumberSymbol = document.getElementById("check-number-symbol");
const numberSymbolRegex = /(?=.*?[0-9])|(?=.*?[#?!@$%^&*-])/;

function checkPassword() {
  if (!password.validity.tooShort && password.value.length > 0) {
    checkLength.classList.add("green");
  } else {
    checkLength.classList.remove("green");
  }

  if (uppercaseRegex.test(password.value)) {
    checkUppercase.classList.add("green");
  } else {
    checkUppercase.classList.remove("green");
  }

  if (numberSymbolRegex.test(password.value)) {
    checkNumberSymbol.classList.add("green");
  } else {
    checkNumberSymbol.classList.remove("green");
  }

  if (
    !password.validity.tooShort &&
    password.value.length > 0 &&
    uppercaseRegex.test(password.value) &&
    numberSymbolRegex.test(password.value)
  ) {
    password.setCustomValidity("");
    passwordError.textContent = "";
  } else if (password.validity.valueMissing) {
    password.setCustomValidity("Password is required");
    passwordError.textContent = password.validationMessage;
  } else {
    password.setCustomValidity("Password does not meet requirements");
    passwordError.textContent = password.validationMessage;
  }
}

password.addEventListener("input", checkPassword);

// Validate confirm password

const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordError = document.querySelector(
  "#confirm-password + span.error",
);

function checkConfirmPassword() {
  if (confirmPassword.validity.valueMissing) {
    confirmPassword.setCustomValidity("Confirm password is required");
    confirmPasswordError.textContent = confirmPassword.validationMessage;
  } else if (confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity("Confirm password does not match");
    confirmPasswordError.textContent = confirmPassword.validationMessage;
  } else {
    confirmPassword.setCustomValidity("");
    confirmPasswordError.textContent = "";
  }
}

confirmPassword.addEventListener("input", checkConfirmPassword);

// Validate form

const form = document.querySelector("form");
const formSuccess = document.querySelector(".success");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showEmailError();
  checkPostalCode();
  checkPassword();
  checkConfirmPassword();

  if (
    email.validity.valid &&
    postalCode.validity.valid &&
    password.validity.valid &&
    confirmPassword.validity.valid
  ) {
    formSuccess.textContent = "Form is valid! High five!";
  } else {
    formSuccess.textContent = "";
  }
});
