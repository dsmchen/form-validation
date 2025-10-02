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
    postalCodeError.textContent = "";
  } else {
    postalCodeError.textContent = constraints[countryValue][1];
  }
}

country.addEventListener("change", checkPostalCode);
postalCode.addEventListener("input", checkPostalCode);

// Validate password

const password = document.getElementById("password");
const checkLength = document.getElementById("check-length");
const checkUppercase = document.getElementById("check-uppercase");
const uppercaseRegex = /(?=.*?[A-Z])/;
const checkNumberSymbol = document.getElementById("check-number-symbol");
const numberSymbolRegex = /(?=.*?[0-9])|(?=.*?[#?!@$%^&*-])/;

password.addEventListener("input", () => {
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
});

// Validate confirm password

const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordError = document.querySelector(
  "#confirm-password + span.error",
);

confirmPassword.addEventListener("input", () => {
  if (confirmPassword.validity.valueMissing) {
    confirmPasswordError.textContent = "Confirm password is required";
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = "Confirm password does not match";
  } else {
    confirmPasswordError.textContent = "";
  }
});
