import Tabs from "./components/tabs.js";

let tabsComponent = new Tabs({
  element: document.querySelector(".container")
});

let tabsElemnt = document.querySelector(".container");

tabsElemnt.addEventListener("tab-selected", event => {
  let { title } = event.detail;

  console.log(title);
});