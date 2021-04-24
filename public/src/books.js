function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {

  const borrowed = books.filter((book) =>book.borrows[0].returned === false);
  const available = books.filter((book) =>book.borrows[0].returned === true);


  const partition = [borrowed, available];
  
  return partition;
}

function getBorrowersForBook(book, accounts) {
  let booklist = [];
  let cond = book.borrows.slice(0,10)
 cond.forEach((log) => booklist.push({...log, ...accounts.find((account) => account.id === log.id)}))

  return booklist;
}



module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
