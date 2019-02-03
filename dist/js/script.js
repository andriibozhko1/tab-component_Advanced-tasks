import Tabs from "./components/tabs.js";

let tabsComponent = new Tabs({
  element: document.querySelector(".container")
});

let tabsElement = document.querySelector("tabs");

tabsElement.addEventListener("tab-selected", event => {
  let { title } = event.detail;
  
  console.log(title);
});