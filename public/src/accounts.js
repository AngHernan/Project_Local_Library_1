function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a1, a2) => a1.name.last.toLowerCase() > a2.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach((book) => total += _checkBookBorrows(account, book));
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  id = account.id;
  let found = [];
  books.forEach((book) => {if (book.borrows[0].id === id && book.borrows[0].returned === false){found.push(book)}});
  let possessed = [];
  found.forEach((book) => {
    let log = {};
    const { id, title, genre, authorId, borrows } = book;
    log.id = id;
    log.title = title;
    log.genre = genre;
    log.authorId = authorId;
    log.author = authors.find((author)=> author.id === authorId);
    log.borrows = borrows;
    possessed.push(log)
})
  return possessed;
}

function _checkBookBorrows(account, book){
  let total = 0;
  const borrows = book.borrows;
  for (log in borrows){
    if (account.id === borrows[log].id){
      total += 1;
    }
  }
  return total;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
