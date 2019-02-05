import Tabs from './components/tabs.js'

let tabsComponent = new Tabs({
  element: document.querySelector('.container'),
})

// tabsComponent.subscribe('tab-selected', ({ title, content }) => {
//   console.log(`Tab ${ title } was selected \n ${content}`);
// });