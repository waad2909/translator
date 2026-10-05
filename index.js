import { languages } from "./languages.js";

const apiUrl = "https://api.mymemory.translated.net/get?q=";

const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const fromLang = document.querySelector("#from-lang");
const toLang = document.querySelector("#to-lang");
const translateBtn = document.querySelector("#translate-btn");

Object.entries(languages).forEach(([code, name]) => {
  fromLang.innerHTML += `<option value="${code}">${name}</option>`;
  toLang.innerHTML += `<option value="${code}">${name}</option>`;
});

fromLang.value = "en";
toLang.value = "ar";

translateBtn.addEventListener("click", () => {
  if (fromText.value.trim() === "") return;

  const text = encodeURIComponent(fromText.value);
  const url = `${apiUrl}${text}&langpair=${fromLang.value}|${toLang.value}`;

  toText.dir = toLang.value === "ar" ? "rtl" : "ltr";
  toText.value = "Translating...";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
    })
    .catch((error) => {
      toText.value = "Something went wrong";
      console.log(error);
    });
});