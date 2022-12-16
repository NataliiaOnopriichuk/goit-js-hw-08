import throttle from "lodash.throttle";
const elem = {
  formEl: document.querySelector(".feedback-form"),
  inputEl: document.querySelector("input"),
  textareaEl: document.querySelector("textarea"),
};

elem.formEl.addEventListener("submit", onFormSubmit);
elem.inputEl.addEventListener("input", throttle(onFormInput, 500));
elem.textareaEl.addEventListener("input", throttle(onFormInput, 500));

const STORAGE_KEY = "feedback-form-state";

let formData = {};

onGetInput();

function onFormSubmit(e) {
  e.preventDefault();

  const email = elem.inputEl.value.trim();
  const message = elem.textareaEl.value.trim();

  if (!email) {
    alert("enter your email!");
    return;
  } else {
  }
  console.log(formData);

  formData = {};
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onGetInput() {
  let savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    formData = JSON.parse(savedMessage);
    console.log(formData);
    elem.inputEl.value = formData.email || "";
    elem.textareaEl.value = formData.message || "";
  }
}
