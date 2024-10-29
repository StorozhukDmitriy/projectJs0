const model = {
  notes: [],
  ifShowOnlyFavorite: false,
  addNote(title, content, color) {
    const isFavorite = false;
    const id = Math.random();
    const note = { title, content, color, isFavorite, id };
    this.notes.push(note);
    view.renderNotes(model.notes);
    view.renderCount(this.notes.length);
    console.log(model.ifShowOnlyFavorite);
  },
  deleteNote(noteId) {
    this.notes = this.notes.filter((note) => noteId !== note.id);
    view.renderNotes(model.notes);
    view.renderCount(this.notes.length);
  },
  favotitesNote(noteId) {
    this.notes = this.notes.map((note) => {
      if (note.id === noteId) {
        note.isFavorite = !note.isFavorite;
      }
      return note;
    });

    view.renderNotes(model.notes);
  },
  togleOnlyFavorite() {
    this.ifShowOnlyFavorite = !this.ifShowOnlyFavorite;
    console.log("Работает");
    console.log(this.ifShowOnlyFavorite);
    if (this.ifShowOnlyFavorite === true) {
      this.updateNotes();
    } else {
      view.renderNotes(model.notes);
      view.renderCount(this.notes.length);
    }
  },
  updateNotes() {
    const notesToRender = this.notes.filter((note) => note.isFavorite === true);
    view.renderNotes(notesToRender);
    view.renderCount(notesToRender.length);
  },
};
console.log(model.notes);

console.log(model.ifShowOnlyFavorite);

const view = {
  init() {
    this.renderNotes(model.notes);
    const form = document.querySelector(".note-form");
    const input1 = document.querySelector(".notes-name-input");
    const input2 = document.querySelector(".notes-info-input");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = input1.value;
      const content = input2.value;
      const color = document.querySelector('input[name="color"]:checked').value;
      controller.addNote(title, content, color);
      input1.value = " ";
      input2.value = " ";
    });
    const list = document.querySelector(".notes-list");
    list.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-button")) {
        const noteId = +event.target.parentElement.id;
        controller.deleteNote(noteId);
      }
      if (event.target.classList.contains("heart-button")) {
        const noteId = +event.target.parentElement.id;
        controller.favotitesNote(noteId);
        const heart = document.getElementById(noteId);
        console.log(heart.querySelector("#button"));
        heart.querySelector("#button").classList.togle("active");
        // heart.querySelector("#button").classList.remove("active");
        // const heartBut = heart.classList.contains("heart-button");
        // console.log(heartBut);

        // event.target.classList.add("active");
        // console.log(event.target);

        // const heart = document.getElementById("noteId")
        // heart.classList.add("active")
        // const heartButton = document.querySelector("#button");
        // heartButton.classList.add("active");
      }
    });
    const checkbox = document.querySelector("input[id=box]");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        controller.togleOnlyFavorite();
      } else {
        controller.togleOnlyFavorite();
      }
    });
  },
  renderNotes(notes) {
    const list = document.querySelector(".notes-list");
    let notesHtml = "";
    for (let i = 0; i < notes.length; i++) {
      const baseInfo = document.querySelector(".base-info");
      const note = notes[i];
      notesHtml += `
        <li>
          <div id="${note.id}" class="note ${note.color}">
          <p class="title-text">${note.title}</p> 
            <button id="button" name="heart-button" type="button" class="heart-button ${note.color}"></button>
            <button type="button" class="delete-button ${note.color}"></button>
            </div>
            <p class="note-text">${note.content}</p>
        </li>
      `;
      baseInfo.classList.add("clear-base-info");
    }
    list.innerHTML = notesHtml;
  },
  renderCount(length) {
    const count = document.querySelector(".count");
    let countHtml = "";
    countHtml = `
        <span>Всего заметок: ${length}</span>
        `;
    count.innerHTML = countHtml;
  },
  showMessage(text) {
    const messageBox = document.querySelector(".messages-box");
    messageBoxHtml = `
    <p class="message-text"><img src="img/Done.svg" alt="done" srcset="">${text}</p>
    `;
    messageBox.innerHTML = messageBoxHtml;
    let timerId = setTimeout(() => {
      messageBox.innerHTML = "";
      clearTimeout(timerId);
    }, 3000);
  },
  alertMessage(text) {
    const messageBox = document.querySelector(".messages-box");
    messageBoxHtml = `
    <p class="alert-message-text"><img src="img/warning.svg" alt="warning" srcset="">${text}</p>
    `;
    messageBox.innerHTML = messageBoxHtml;
    let timerId = setTimeout(() => {
      messageBox.innerHTML = "";
      clearTimeout(timerId);
    }, 3000);
  },
};

const controller = {
  addNote(title, content, color) {
    if (title.length >= 50) {
      view.alertMessage("Максимальная длина заголовка - 50 символов");
    } else if (content === "" && title === "") {
      view.alertMessage("Заполните все поля");
      return;
    } else {
      view.showMessage("Заметка добавлена");
      model.addNote(title, content, color);
    }

    // здесь можно добавить валидацию полей
    // your code

    // вызываем метод модели

    // вызываем метод view, реализацию которого вам нужно будет добавить

    // setTimeout( function() { view.showMessage().value.innerHTML = "" } , 3000)
  },
  deleteNote(noteId) {
    console.log(noteId);
    model.deleteNote(noteId);
    view.showMessage("Заметка удалена");
  },
  favotitesNote(noteId) {
    model.favotitesNote(noteId);
  },
  togleOnlyFavorite() {
    model.togleOnlyFavorite();
  },
};

function init() {
  view.init();
}

init();
