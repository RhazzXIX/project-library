const shelve = document.querySelector("main#shelve");
const body = document.querySelector("body");

const addBooksBtn = document.querySelector("button#addBook");
addBooksBtn.addEventListener("click", (e) => {
  body.appendChild(form);
  e.stopPropagation();
});

const form = document.querySelector("section.form-container");
form.addEventListener(
  "mousedown",
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
  this.status = Book.prototype.Status();
}

Book.prototype.Status = function () {
  const status = document.getElementsByName("status");
  for (const result of status) {
    if (result.checked) {
      return result.value;
    }
  }
};

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
      addDelete();
      clearForm();
      body.removeChild(form);
    }
  }
}

function checkLibrary() {
  const check1st = myLibrary.some((books) => books.title == this.title);
  const check2nd = myLibrary.some((books) => books.author == this.author);

  if (check1st === false && check2nd === false) {
    return true;
  }
  if (check1st === true && check2nd === true) {
    body.appendChild(notice);
    return false;
  }
}

function clearForm() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookInfo.value = "";
  const status = document.getElementsByName("status");
  for (const result of status) {
    if (result.value === "Not Read") {
      result.checked = true;
    }
  }
}

function checkShelve() {
  const cards = shelve.querySelectorAll("div.card");

  for (const card of cards) {
    const data = card.getAttribute("data-book");
    if (data === this.data) {
      return true;
    }
  }
}

function postBooks() {
  for (const books of myLibrary) {
    if (checkShelve.call(books) !== true) {
      createCards.call(books);
    }
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
  addStatus.call(card, this.status);
  addModifyButton.call(card, this.data);
  shelve.appendChild(card);
}

function addStatus(value) {
  const status = document.createElement("p");
  status.setAttribute("class", "status");

  switch (value) {
    case "Not Read":
      status.classList.add("unread");
      status.textContent = "Not Read";
      break;
    case "Reading":
      status.classList.add("reading");
      status.textContent = "Reading";
      break;
    case "Finished":
      status.classList.add("finished");
      status.textContent = "Finished";
      break;
    default:
      return;
  }

  status.addEventListener("click", (e) => {
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
    }
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
  delBtn.setAttribute("data-book", `${data}`);

  // modify.appendChild(editBtn);
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

const notice = document.querySelector("section#notice");
notice.addEventListener("click", (e) => {
  e.stopPropagation();
  body.removeChild(notice);
});

body.removeChild(form);
body.removeChild(notice);

form.classList.toggle("hidden");
notice.classList.toggle("hidden");

myLibrary.push(atomicHabits);

postBooks();
