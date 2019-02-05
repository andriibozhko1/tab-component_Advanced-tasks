import Tabs from './components/tabs.js'


let tabs = [
  { title: 'Tab 1', content: 'Some text 1' },
  { title: 'Tab 2', content: 'Some text 2' },
  { title: 'Tab 3', content: 'Some text 3' },
];

let tabsComponent = new Tabs({
  element: document.querySelector('[data-component="tabs"]'),
  tabs: tabs,
})

tabsComponent.subscribe('tab-selected', ({ title, content }) => {
  console.log(`Tab ${ title } was selected \n ${content}`);
});