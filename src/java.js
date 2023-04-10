import "./styles/style.css";
import "./index.html";
import { initializeApp } from "firebase/app";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAwzlgosGqSGsrx4CzJK4liK09JnJ1Dy9w",
  authDomain: "project-library-14926.firebaseapp.com",
  projectId: "project-library-14926",
  storageBucket: "project-library-14926.appspot.com",
  messagingSenderId: "459523889275",
  appId: "1:459523889275:web:2ad594c8e377bdd0c82ade",
  measurementId: "G-488283056F",
});

const database = getFirestore(firebaseApp);

const shelve = document.querySelector("main#shelve");
const body = document.querySelector("body");

const addBooksBtn = document.querySelector("button#addBook");
const closeFormBtn = document.querySelector("button#close-form");
const form = document.querySelector("section.form-container");
const notice = document.querySelector("section#notice");

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

notice.addEventListener("click", (e) => {
  e.stopPropagation();
  body.removeChild(notice);
});

const myLibrary = [];

function Book(title, author, pages, info, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.info = info;
  this.status = status;
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

// Book.prototype.UpdateStatus = function (status) {
//   switch (status.className) {
//     case "status unread":
//       status.className = "status reading";
//       status.textContent = "Reading";
//       break;
//     case "status reading":
//       status.className = "status finished";
//       status.textContent = "Finished";
//       break;
//     default:
//       status.className = "status unread";
//       status.textContent = "Not Read";
//       break;
//   }
//   this.status = status.textContent;
// };

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
    checkSubmission(e);
  },
  false
);

async function checkLibrary(newBook) {
  const data = await getDocs(collection(database, "books"));
  const fetchedLibrary = [];
  data.forEach((book) => {
    const fetchedBook = book.data();
    fetchedLibrary.push(fetchedBook);
  });
  const check1st = fetchedLibrary.some(
    (books) => books.title === newBook.title
  );
  const check2nd = fetchedLibrary.some(
    (books) => books.author === newBook.author
  );
  if (check1st === true && check2nd === true) {
    body.appendChild(notice);
    return true;
  }
  return false;
}

async function takeBookEntry() {
  const newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookInfo.value,
    getStatus()
  );
  const inLibrary = await checkLibrary(newBook);
  if (!inLibrary) {
    const bookRef = doc(collection(database, "books"));
    console.log(bookRef);
    console.log({ ...newBook, data: bookRef.id });
    await setDoc(bookRef, { ...newBook, data: bookRef.id });
    return true;
  }
  return false;
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

function checkShelve(book) {
  const cards = shelve.querySelectorAll("div.card");
  let onShelve = false;

  cards.forEach((card) => {
    const data = card.getAttribute("data-book");
    if (data === book.data) {
      onShelve = true;
    }
  });
  return onShelve;
}

const updateStatus = async (status, bookData) => {
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
  const bookRef = doc(database, "books", bookData);
  await updateDoc(bookRef, {
    status: status.textContent,
  });
};

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
    updateStatus(status, data);
  });

  this.appendChild(status);
}

const delBookFromDB = async (data) => {
  await deleteDoc(doc(database, "books", `${data}`));
};

function deleteBook() {
  const cards = shelve.querySelectorAll("div.card");
  const data = this.getAttribute("data-book");
  cards.forEach((card) => {
    if (card.getAttribute("data-book") === data) {
      shelve.removeChild(card);
    }
  });
  delBookFromDB(data);
}

function addModifyButton(data) {
  const modify = document.createElement("div");
  modify.setAttribute("class", "buttons");

  // const editBtn = document.createElement("img");
  // editBtn.setAttribute("src", "./images/Icon/book-edit-outline.svg");
  // editBtn.setAttribute("class", "editBtn");

  const delBtn = document.createElement("img");
  delBtn.setAttribute("src", "../images/Icon/trash-can-outline.svg");
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

function createCards(book) {
  const title = document.createElement("h3");
  title.setAttribute("class", "book-title");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.setAttribute("class", "author");
  author.textContent = book.author;

  const pages = document.createElement("p");
  pages.setAttribute("class", "pages");
  pages.textContent = `${book.pages} pages`;

  const info = document.createElement("p");
  info.setAttribute("class", "summary");
  info.textContent = book.info;

  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("data-book", book.data);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(info);
  addStatus.call(card, book.status, book.data);
  addModifyButton.call(card, book.data);
  shelve.appendChild(card);
}

const postBooks = async () => {
  const cards = shelve.querySelectorAll("div.card");
  if (cards.length) {
    cards.forEach((card) => {
      shelve.removeChild(card);
    });
  }
  const library = await getDocs(collection(database, "books"));
  library.forEach((book) => {
    const fetchedBook = book.data();
    createCards(fetchedBook);
  });
};

async function checkSubmission(e) {
  e.preventDefault();
  if (!bookTitle.checkValidity()) {
    bookTitle.reportValidity();
  } else if (!bookAuthor.checkValidity()) {
    bookAuthor.reportValidity();
  } else if (!bookPages.checkValidity()) {
    bookPages.reportValidity();
  } else if (await takeBookEntry()) {
    postBooks();
    clearForm();
    body.removeChild(form);
  }
}

body.removeChild(form);
body.removeChild(notice);

form.classList.toggle("hidden");
notice.classList.toggle("hidden");

postBooks();
