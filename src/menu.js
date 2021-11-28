import { Menu } from './core/menu';

export class ContextMenu extends Menu {
  static CLASS_NAME = 'open';

  constructor(selector, options = {}) {
    super(selector);

    this.modules = options.modules;
  }

  open() {
    this.el.classList.add(ContextMenu.CLASS_NAME);
  }

  close() {
    this.el.classList.remove(ContextMenu.CLASS_NAME);
  }

  add(module) {
    this.el.insertAdjacentHTML('beforeend', module);
  }

  clear() {
    const filteredElements = [].slice.call(this.el.parentNode.children).filter(child => (child !== this.el));
    filteredElements.forEach(el => el.remove());
  }

  fillMenuElement() {
      this.modules = this.modules.map(Module => new Module);

      this.modules.forEach(moduleInstance => {
        const moduleElement = moduleInstance.toHTML();
        
        this.add(moduleElement);
      });
  }

  start() {
    this.fillMenuElement();

    this.el.addEventListener('click', (event) => {
      const {target} = event;
      
      if (target.tagName === 'LI') {
        this.clear();
        this.close();
        const currentType = target.dataset.type;
        const clickedModuleInstance = this.modules.filter(moduleInstance => moduleInstance.type === currentType)[0];
  
        clickedModuleInstance.trigger();
      }
    });

    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();

      const {pageX, pageY} = event;

      this.el.style.left = `${pageX}px`;
      this.el.style.top = `${pageY}px`;

      this.el.classList.contains(ContextMenu.CLASS_NAME) && this.modules !== []
          ? ''
          : this.open();
    });
  }
}
