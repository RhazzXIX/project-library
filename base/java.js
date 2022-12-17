const myLibrary = [
  "Atomic Habits",
  "The Bullet Journal Method",
  "The 5 AM Club",
];

function CreateBookInfo(bookTitle, author, pages, read) {
  this.title = bookTitle;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
  };
}

const atomicHabits = new CreateBookInfo(
  "Atomic Habits",
  "James Clear",
  "230",
  "unread"
);
