function getTotalBooksCount(books) {
  let accumulator = 0;
  let result = books.reduce((acc, book) => acc += 1, accumulator)
  return result;
}

function getTotalAccountsCount(accounts) {
  let accumulator = 0;
  let result = accounts.reduce((acc, account) => acc += 1, accumulator)
  return result;
}

function getBooksBorrowedCount(books) {
  let accumulator = 0; 
  let result = books.reduce((acc, book) => acc+=_checkBookRet(book), accumulator);
  return result;
}

function getMostCommonGenres(books) {
  let genres = [];
  books.forEach((book) => genres.push(book.genre));
  let filteredGenres = genres.filter((x,y) => genres.indexOf(x) === y);
  let mostCommon = [];
  filteredGenres.forEach((genre) => {
    let a = {};
    a.name = genre;
    a.count = genres.reduce((acc, gen) => { return acc + (gen === genre);}, 0);
    mostCommon.push(a);
  });
  let sortedCom = mostCommon.sort((genreA, genreB) => (genreA.count > genreB.count ? -1 : 1));
  return sortedCom.slice(0,5)
}

function getMostPopularBooks(books) {
  let topFive = _topFiveBooks(books);
  let mostPopularBooks = []

  topFive.forEach((book) => {
    let newBook = {}
    newBook.name = book.title;
    newBook.count = book.borrows.length
    mostPopularBooks.push(newBook)
  });
  return mostPopularBooks;
}

function getMostPopularAuthors(books, authors) {
  let topFive = _topFiveBooks(books);
  let mostPopularAuthors = []

  topFive.forEach((book) => {
    let popularAuthor = {};
    let authorId = book.authorId;
    let author = authors.find((auth) => auth.id === authorId)
    let name = [author.name.first, author.name.last].join(' ');
    popularAuthor.name = name;
    popularAuthor.count = book.borrows.length
    console.log(popularAuthor)
    mostPopularAuthors.push(popularAuthor)
  });
  return mostPopularAuthors;
}

function _topFiveBooks(books) {
  let sortedBooks = books.sort((bookA, bookB) => (bookA.borrows.length > bookB.borrows.length ? -1 : 1));
  return sortedBooks.slice(0,5);
}

function _checkBookRet(book){
  const borrows = book.borrows;
  if (borrows[0].returned === false){
    return 1;
  }
  else{ 
    return 0;
  }
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
