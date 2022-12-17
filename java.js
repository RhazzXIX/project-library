const shelve = document.querySelector("main#shelve");

const myLibrary = [];

function Book(bookTitle, author, pages) {
  this.title = bookTitle;
  this.author = author;
  this.pages = pages;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
  };
}

const atomicHabits = new Book("Atomic Habits", "James Clear", "230");

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

  const summary = document.createElement("div");
  summary.setAttribute("class", "summary");
  summary.textContent = this.summary;
  const card = document.createElement("div");
  card.setAttribute("class", "card");
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
  unReadLabel.textContent += "Unread";

  const read = document.createElement("input");
  read.setAttribute("type", "radio");
  read.setAttribute("name", `${reference}`);
  read.setAttribute("id", `read-${reference}`);
  read.setAttribute("value", "read");

  const readLabel = document.createElement("label");
  readLabel.setAttribute("for", `read-${reference}`);
  readLabel.textContent += "Read";

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
  delBtn.setAttribute("class", "editBtn");

  modify.appendChild(editBtn);
  modify.appendChild(delBtn);
  this.appendChild(modify);
}
