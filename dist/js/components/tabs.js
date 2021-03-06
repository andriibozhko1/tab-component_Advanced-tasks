export default class Tabs {
  constructor({ element }) {
    this.element = element;
    this.tabsArr = [];
    this.tabs = [...this.element.querySelectorAll("tabs")];

    this.createTabObj();
    this.render();
    this.addEvents();
  }

  createTabObj() {
    this.tabs.map(item => {
      let tab = [...item.querySelectorAll("tab")];
      let tabs = {};
      let counter = 0;

      tab.map(tab => {
        tabs[tab.title] = {
          title: tab.title,
          content: tab.textContent,
          isActive: false,
          id: counter++
        };
      });

      this.tabsArr.push(tabs);
    });
    for (let i = 0; i < this.tabsArr.length; i++) {
      this.tabsArr[i][Object.keys(this.tabsArr[i])[0]].isActive = true;
    }
  }

  render() {
    let tabsContainerId = 0;

    this.element.innerHTML = `
      ${this.tabsArr
        .map(tab => {
          let tabId = 0;
          let tabsHeaderName = Object.keys(tab);

          return `
          <tabs class="tabs" data-element-id="${tabsContainerId++}">
            <div class="tabs__header">
            ${tabsHeaderName
              .map(title => {
                return `
                  <tab class="tabs__tab ${
                    tab[title].isActive === true ? "tabs__tab--active" : ""
                  }" data-title="${title}">${title}</tab>
            `;
              })
              .join("")}
            </div>
            <div class="tabs__content">
              ${tabsHeaderName
                .map(title => {
                  if (tab[title].isActive) {
                    return tab[title].content;
                  }
                })
                .join("")}
            </div>
          </tabs>
        `;
        })
        .join("")}
    `;
  }

  getCurrentTabData(id) {
    let tabsName = Object.keys(this.tabsArr[id]);
    for (let i = 0; i < tabsName.length; i++) {
      if (this.tabsArr[id][tabsName[i]].isActive) {
        return this.tabsArr[id][tabsName[i]];
      }
    }
  }

  addEvents() {
    this.on("click", "tabs__tab", event => {
      let id = event.closest(".tabs").dataset.elementId;

      this.getCurrentTabData(id).isActive = false;
      this.tabsArr[id][event.dataset.title].isActive = true;

      let customEvent = new CustomEvent("tab-selected", {
        detail: {
          title: this.getCurrentTabData(id).title,
          content: this.getCurrentTabData(id).content
        }
      });
      
      let tabsElemnt = document.querySelector("tabs");

      tabsElemnt.addEventListener("tab-selected", event => {
        let { title } = event.detail;

        console.log(title);
      });

      event.closest(".tabs").dispatchEvent(customEvent);
      this.render();
    });
  }

  on(eventName, className, callBack) {
    this.element.addEventListener(eventName, event => {
      if (event.target.closest(`.${className}`)) {
        callBack(event.target.closest(`.${className}`));
      }
    });
  }
}
