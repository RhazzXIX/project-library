const shelve = document.querySelector("main#shelve");
const body = document.querySelector("body");

const addBooksBtn = document.querySelector("button#addBook");
addBooksBtn.addEventListener("click", (e) => {
  body.appendChild(form);
  e.stopPropagation();
});

const form = document.querySelector("section.form-container");
form.addEventListener(
  "click",
  (e) => {
    if (form !== e.target) return;
    e.stopPropagation();
    body.removeChild(form);
  },
  true
);

const closeFormBtn = document.querySelector("button#close-form");
closeFormBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  body.removeChild(form);
});

const myLibrary = [];

function Book(title, author, pages, info) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.info = info;
  this.data = createBookData(title, author);
}

function createBookData(title, author) {
  const data = [];
  data.push(title.toLowerCase().split(" ")[0]);
  data.push(author.toLowerCase().split(" ")[0]);
  const bookData = data.reduce((datas, input) => {
    if (input === data[1]) {
      datas += input.split("")[0].toUpperCase();
      datas += input.split("").splice(1, input.length).join("");
    }
    return datas;
  });
  return bookData;
}

const atomicHabits = new Book(
  "Atomic Habits",
  "James Clear",
  "230",
  "A revolutionary system to get 1 percent better every day. This Small changes will have a transformative effect on your career, your relationships and your life",
  "atomicJames"
);

const theBulletJournal = new Book(
  "the Bullet Journal",
  "talka",
  "123",
  "for Journalling",
  "the talka"
);

// function to get book details
const bookTitle = document.querySelector("input#title");
const bookAuthor = document.querySelector("input#author");
const bookPages = document.querySelector("input#page");
const bookInfo = document.querySelector("textarea#info");

const submitBtn = document.querySelector("button#submit");
submitBtn.addEventListener(
  "click",
  (e) => {
    e.stopPropagation();
    checkSubmition(e);
    checkLibrary();
  },
  false
);

function takeBookEntry() {
  const newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookInfo.value
  );
  myLibrary.push(newBook);
}

function checkSubmition() {
  if (
    Boolean(bookTitle.value) === true &&
    Boolean(bookAuthor.value) === true &&
    Boolean(bookPages.value) === true
  ) {
    event.preventDefault();
    takeBookEntry();
    addBooks();
    addDelete();
    // body.removeChild(form);
    clearForm();
  }
}

function clearForm() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookInfo.value = "";
}

function checkLibrary(title) {
  if (bookTitle.value === myLibrary[0].title) {
    console.log(true);
  }
}

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

  const info = document.createElement("p");
  info.setAttribute("class", "summary");
  info.textContent = this.info;

  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("data-book", `${this.data}`);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(info);
  addStatus.call(card, this.title);
  addModifyButton.call(card, this.data);
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

function addModifyButton(data) {
  const modify = document.createElement("div");
  modify.setAttribute("class", "buttons");

  const editBtn = document.createElement("img");
  editBtn.setAttribute("src", "./images/Icon/book-edit-outline.svg");
  editBtn.setAttribute("class", "editBtn");

  const delBtn = document.createElement("img");
  delBtn.setAttribute("src", "./images/Icon/trash-can-outline.svg");
  delBtn.setAttribute("class", "delBtn");
  delBtn.setAttribute("alt", "Delete Icon");
  delBtn.setAttribute("data-book", `${data}`);

  modify.appendChild(editBtn);
  modify.appendChild(delBtn);
  this.appendChild(modify);
}

function deleteBook() {
  const cards = shelve.querySelectorAll("div.card");
  const data = this.getAttribute("data-book");
  for (const card of cards) {
    if (card.getAttribute("data-book") === data) {
      shelve.removeChild(card);
    }
  }

  const bookIndex = myLibrary.findIndex((books) => {
    if (books.data === data) {
      return true;
    }
  });
  myLibrary.splice(bookIndex, 1);
  console.log(bookIndex);
}

function addDelete() {
  const delBtn = document.querySelectorAll("img.delBtn");
  for (let i = 0; i < delBtn.length; i++) {
    delBtn[i].addEventListener("click", (e) => {
      e.stopPropagation();
      deleteBook.call(delBtn[i]);
    });
  }
}

body.removeChild(form);

myLibrary.push(atomicHabits);
myLibrary.push(theBulletJournal);
