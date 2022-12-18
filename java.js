const shelve = document.querySelector("main#shelve");
const body = document.querySelector("body");
const form = document.querySelector("section.form-container");
body.removeChild(form);

const addBooksBtn = document.querySelector("button#addBook");
addBooksBtn.addEventListener("click", () => {
  body.appendChild(form);
});

const myLibrary = [];

function Book(bookTitle, author, pages, summary) {
  this.title = bookTitle;
  this.author = author;
  this.pages = pages;
  this.summary = summary;
}

const atomicHabits = new Book(
  "Atomic Habits",
  "James Clear",
  "230",
  "A revolutionary system to get 1 percent better every day. This Small changes will have a transformative effect on your career, your relationships and your life"
);

myLibrary.unshift(atomicHabits);

// function to display books

function addBooks() {
  for (const books of myLibrary) {
    createCards.call(books);
  }
}

function createCards() {
  const title = document.createElement("h3");
  title.setAttribute("class", "book-title");
  title.textContent = this.title;

  const author = document.createElement("p");
  author.setAttribute("class", "author");
  author.textContent = this.author;

  const pages = document.createElement("p");
  pages.setAttribute("class", "pages");
  pages.textContent = `${this.pages} pages`;

  const summary = document.createElement("p");
  summary.setAttribute("class", "summary");
  summary.textContent = this.summary;

  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("data-book", `${this.title}`);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(summary);
  addStatus.call(card, this.title);
  addModifyButton.call(card);
  shelve.appendChild(card);
}

function addStatus(title) {
  const reference = title.toLowerCase().split(" ").join("-");
  const status = document.createElement("div");
  status.setAttribute("class", "status");

  const unRead = document.createElement("input");
  unRead.setAttribute("type", "radio");
  unRead.setAttribute("name", `${reference}`);
  unRead.setAttribute("id", `unread-${reference}`);
  unRead.setAttribute("value", "unread");
  unRead.setAttribute("checked", "");

  const unReadLabel = document.createElement("label");
  unReadLabel.setAttribute("for", `unread-${reference}`);
  unReadLabel.textContent += " Unread  ";

  const read = document.createElement("input");
  read.setAttribute("type", "radio");
  read.setAttribute("name", `${reference}`);
  read.setAttribute("id", `read-${reference}`);
  read.setAttribute("value", "read");

  const readLabel = document.createElement("label");
  readLabel.setAttribute("for", `read-${reference}`);
  readLabel.textContent += " Read";

  status.appendChild(unRead);
  status.appendChild(unReadLabel);
  status.appendChild(read);
  status.appendChild(readLabel);
  this.appendChild(status);
}

function addModifyButton() {
  const modify = document.createElement("div");
  modify.setAttribute("class", "buttons");

  const editBtn = document.createElement("img");
  editBtn.setAttribute("src", "./images/Icon/book-edit-outline.svg");
  editBtn.setAttribute("class", "editBtn");

  const delBtn = document.createElement("img");
  delBtn.setAttribute("src", "./images/Icon/trash-can-outline.svg");
  delBtn.setAttribute("class", "delBtn");
  delBtn.setAttribute("alt", "Delete Icon");

  modify.appendChild(editBtn);
  modify.appendChild(delBtn);
  this.appendChild(modify);
}

addBooks();

function deleteBook() {
  const container = this.parentNode;
  const book = container.parentNode;
  shelve.removeChild(book);
}

function addDelete() {
  const delBtn = document.querySelectorAll("img.delBtn");
  for (let i = 0; i < delBtn.length; i++) {
    delBtn[i].addEventListener("click", () => {
      deleteBook.call(delBtn[i]);
    });
  }
}

addDelete();
