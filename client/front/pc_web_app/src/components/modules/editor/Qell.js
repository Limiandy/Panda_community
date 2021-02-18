class Qell {
  constructor(element) {
    this.editor = element;
  }
  init() {
    this.editor.setAttribute("contenteditable", true);
    setTimeout(() => {
      this.editor.focus();
    }, 0);
  }
}

export default Qell;
