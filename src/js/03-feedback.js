import throttle from "lodash.throttle";
const elem = {
  formEl: document.querySelector(".feedback-form"),
  inputEl: document.querySelector("input"),
  textareaEl: document.querySelector("textarea"),
};

elem.formEl.addEventListener("submit", onFormSubmit);
elem.inputEl.addEventListener("input", throttle(onFormInput, 500));
elem.textareaEl.addEventListener("input", throttle(onFormInput, 500));

STORAGE_KEY = "feedback-form-state";
const formData = {};

function onFormSubmit(e) {
  e.preventDefault();
  const email = elem.inputEl.value.trim();
  const message = elem.textareaEl.value.trim();
  if (!email) {
    alert("enter your email!");
    return;
  }
  console.log({ email, message });

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onGetInput() {
  try {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    if (savedMessage) {
      return savedMessage ? JSON.parse(savedMessage) : null;
    }
  } catch (error) {
    console.log(error.name); // "SyntaxError"
    console.log(error.message); // Unexpected token W in JSON at position 0
  }
}

function setInitData() {
  const savedMessageParse = onGetInput();
  if (savedMessageParse) {
    elem.inputEl.value = savedMessageParse.email || "";
    elem.textareaEl.value = savedMessageParse.message || "";
  }
}
setInitData();
