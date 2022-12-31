// Cache DOM
const shelve = document.querySelector("main#shelve");
const body = document.querySelector("body");
const form = document.querySelector("section.form-container");
const addBooksBtn = document.querySelector("button#addBook");
const closeFormBtn = document.querySelector("button#close-form");
const bookTitle = document.querySelector("input#title");
const bookAuthor = document.querySelector("input#author");
const bookPages = document.querySelector("input#page");
const bookInfo = document.querySelector("textarea#info");

addBooksBtn.addEventListener("click", (e) => {
  body.appendChild(form);
  e.stopPropagation();
});

form.addEventListener(
  "mousedown",
  (e) => {
    if (form !== e.target) return;
    e.stopPropagation();
    body.removeChild(form);
  },
  true
);

closeFormBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  body.removeChild(form);
});

const myLibrary = [];

class Book {
  constructor(title, author, pages, info, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.info = info;
    this.data = createBookData(title, author);
    this.status = status;
  }

  UpdateStatus(status) {
    switch (status.className) {
      case "status unread":
        status.className = "status reading";
        status.textContent = "Reading";
        break;
      case "status reading":
        status.className = "status finished";
        status.textContent = "Finished";
        break;
      default:
        status.className = "status unread";
        status.textContent = "Not Read";
        break;
    }
    this.status = status.textContent;
  }
}

function getStatus() {
  const status = document.getElementsByName("status");
  let value;
  status.forEach((result) => {
    if (result.checked) {
      value = result.value;
    }
  });
  return value;
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

const submitBtn = document.querySelector("button#submit");
submitBtn.addEventListener(
  "click",
  (e) => {
    e.stopPropagation();
    checkSubmition(e);
  },
  false
);

function takeBookEntry() {
  const newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookInfo.value,
    getStatus()
  );

  if (checkLibrary.call(newBook)) {
    myLibrary.push(newBook);
    return true;
  }
}

function checkSubmition() {
  if (
    Boolean(bookTitle.value) === true &&
    Boolean(bookAuthor.value) === true &&
    Boolean(bookPages.value) === true
  ) {
    event.preventDefault();
    if (takeBookEntry()) {
      postBooks();
      clearForm();
      body.removeChild(form);
    }
  }
}

function checkLibrary() {
  const check1st = myLibrary.some((books) => books.title === this.title);
  const check2nd = myLibrary.some((books) => books.author === this.author);
  if (check1st === true && check2nd === true) {
    body.appendChild(notice);
    return false;
  }
  return true;
}

function clearForm() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookInfo.value = "";
  const status = document.getElementsByName("status");
  status.forEach((state) => {
    if (state.value === "Not Read") {
      const value = state;
      value.checked = true;
    }
  });
}

function checkShelve() {
  const cards = shelve.querySelectorAll("div.card");
  let onShelve = false;

  cards.forEach((card) => {
    const data = card.getAttribute("data-book");
    if (data === this.data) {
      onShelve = true;
    }
  });
  return onShelve;
}

function postBooks() {
  myLibrary.forEach((books) => {
    if (checkShelve.call(books) !== true) {
      createCards.call(books);
    }
  });
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
  card.setAttribute("data-book", this.data);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(info);
  addStatus.call(card, this.status, this.data);
  addModifyButton.call(card, this.data);
  shelve.appendChild(card);
}

function addStatus(value, data) {
  const status = document.createElement("p");
  status.setAttribute("class", "status");
  status.setAttribute("data-book", data);
  switch (value) {
    case "Not Read":
      status.classList.add("unread");
      status.textContent = value;
      break;
    case "Reading":
      status.classList.add("reading");
      status.textContent = value;
      break;
    case "Finished":
      status.classList.add("finished");
      status.textContent = value;
      break;
    default:
      return;
  }

  status.addEventListener("click", (e) => {
    e.stopPropagation();
    myLibrary.forEach((books) => {
      if (books.data === data) {
        books.UpdateStatus(status);
      }
    });
  });

  this.appendChild(status);
}

function addModifyButton(data) {
  const modify = document.createElement("div");
  modify.setAttribute("class", "buttons");

  // const editBtn = document.createElement("img");
  // editBtn.setAttribute("src", "./images/Icon/book-edit-outline.svg");
  // editBtn.setAttribute("class", "editBtn");

  const delBtn = document.createElement("img");
  delBtn.setAttribute("src", "./images/Icon/trash-can-outline.svg");
  delBtn.setAttribute("class", "delBtn");
  delBtn.setAttribute("alt", "Delete Icon");
  delBtn.setAttribute("data-book", data);

  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteBook.call(delBtn);
  });

  // modify.appendChild(editBtn);
  modify.appendChild(delBtn);
  this.appendChild(modify);
}

function deleteBook() {
  const cards = shelve.querySelectorAll("div.card");
  const data = this.getAttribute("data-book");
  cards.forEach((card) => {
    if (card.getAttribute("data-book") === data) {
      shelve.removeChild(card);
    }
  });
  const bookIndex = myLibrary.findIndex((books) => books.data === data);
  myLibrary.splice(bookIndex, 1);
}

const notice = document.querySelector("section#notice");
notice.addEventListener("click", (e) => {
  e.stopPropagation();
  body.removeChild(notice);
});

const atomicHabits = new Book(
  "Atomic Habits",
  "James Clear",
  "230",
  "A revolutionary system to get 1 percent better every day. This Small changes will have a transformative effect on your career, your relationships and your life",
  "Not Read"
);

body.removeChild(form);
body.removeChild(notice);

form.classList.toggle("hidden");
notice.classList.toggle("hidden");

myLibrary.push(atomicHabits);

postBooks();
