export default class Tabs {
    constructor({ element, tabs }) {
        this.element = element;
        this.tabs = tabs;
        this.callBackObj = {};
        this.currentTab = tabs[0];
        this.eventNames = [];

        this.render();
        this.addEvents();
    }
    render() {
        this.element.innerHTML = `
            <div class="tabs__header">
            ${this.tabs.map(tab => {
                return `<div class="tabs__tab ${tab === this.currentTab ? 'tabs__tab--active' : ''}", data-title="${tab.title}">${tab.title}</div>`
            }).join('')}
            </div>
            <div class="tabs__content">
                ${this.currentTab.content}
            </div>
        `
    }
    getCurrentTabData() {
        return this.currentTab;
    }
    addEvents() {
        this.element.addEventListener('click', (e) => {
            if(e.target.closest('.tabs__tab')) {
                this.tabs.find(tab => {
                    if(tab.title === e.target.dataset.title) {
                        this.currentTab = tab;
                        this.render();

                        Object.keys(this.callBackObj).map(events => {
                            this.callBackObj[events](this.currentTab);
                        })
                    }
                })
            }
        });
    }
    subscribe(eventName, fn) {
       this.callBackObj[eventName] = fn;
    }
}