// VARIABLES
let login;
let pass;
let passRepeat;
let email;
let clear;
let send;
let popup;
let form;

// ARRAY
let allInputs;

// FUNCTIONS
const errorAdd = (input, error) => {
  const formBox = input.parentElement;
  const errorPlace = formBox.querySelector('.container__box-error');
  formBox.classList.add('error');
  errorPlace.textContent = error;
};

const errorDelete = (input) => {
  const formBox = input.parentElement;
  formBox.classList.remove('error');
};

const checkLength = (input, min) => {
  if (input.value.length < min) {
    const inputName = input.previousElementSibling.textContent.slice(0, -1);
    errorAdd(input, `${inputName} musi mieć min. ${min} znaków!`);
  }
};

const checkPass = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    errorAdd(pass2, 'Hasła muszą być identyczne!');
  }
};

const checkMail = (mail) => {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reg.test(mail.value)) {
    errorDelete(mail);
  } else {
    errorAdd(mail, 'Niepoprawny email!');
  }
};

const success = () => {
  let errorCount = 0;

  allInputs.forEach((el) => {
    if (el.parentElement.classList.contains('error')) {
      errorCount += 1;
    }
  });

  if (errorCount === 0) {
    popup.classList.add('show-popup');
  }
};

const clearForm = (e) => {
  e.preventDefault();

  // I metoda
  form.reset();
  allInputs.forEach(errorDelete);

  // II metoda
  // allInputs.forEach((data) => (data.value = ''));
};

const handleForm = (e) => {
  e.preventDefault();

  allInputs.forEach((input) => {
    if (input.value === '') {
      errorAdd(input, input.placeholder);
    } else {
      errorDelete(input);
    }
  });

  checkLength(login, 4);
  checkLength(pass, 8);
  checkPass(pass, passRepeat);
  if (email.value !== '') {
    checkMail(email);
  }
  success();
};

// MAIN FUNCTIONS
const prepareDOMElements = () => {
  login = document.querySelector('#login');
  pass = document.querySelector('#password');
  passRepeat = document.querySelector('#password-repeat');
  email = document.querySelector('#email');
  clear = document.querySelector('.container__btns-clear');
  send = document.querySelector('.container__btns-send');
  popup = document.querySelector('.container__popup');
  form = document.querySelector('.form');

  allInputs = [login, pass, passRepeat, email];
};

const prepareDOMEvents = () => {
  clear.addEventListener('click', clearForm);
  send.addEventListener('click', handleForm);
};

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

document.addEventListener('DOMContentLoaded', main);
