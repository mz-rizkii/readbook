const { expect } = require('chai');

const {
  getConnection,
  db_instance
} = require('../../app/db_repository');

const { getTimestamp } = require('../../app/utility');

const { demo_users: [first_user, ...unused] } = require('./demo_data');

let instance = '';

let selected_book = '';

const makeBookData = (title, author, summary, price) => ({ title, author, summary, price });

const first_author = 'The Author 001';

const second_author = 'The Author B';

const makeAuthorData = (full_name) => ({ full_name });

const makeBookContents = (page_number, label, image, is_preview = true) => ({ page_number, label, image, is_preview });

const author_list = [
  makeAuthorData(first_author),
  makeAuthorData(second_author),
];

const book_list = [
  makeBookData('the book 001', first_author, 'book 1 summary', 12000),
  makeBookData('the book 002', first_author, 'book 2 summary', 12000),
  makeBookData('the book 003', second_author, 'book 3A summary', 11000),
  makeBookData('the book 004', second_author, 'book 4A summary', 10000),
  makeBookData('the book 005', first_author, 'book 3 summary', 15000)
];

describe('check book functions', checkBookFunctions);

const pages = [
  makeBookContents(0, '1', 'preview01.jpg'),
  makeBookContents(1, '2', 'preview02.jpg', false),
  makeBookContents(2, '3', 'preview03.jpg', false),
  makeBookContents(3, '4', 'preview04.jpg'),
  makeBookContents(4, '5', 'preview05.jpg', false),
];

function checkBookFunctions() {
  before('setup db connection', initDBConnection);

  it('try add book', tryAddBook);

  it('try view books', tryViewBooks);

  it('try add book contents', tryAddBookContent);

  it('try view books', tryViewBooks);

  it('try view preview contents', tryViewPreviewPages);

  it('try view all contents', tryViewAllPages);

  describe('try purchase book', tryPurchaseBook);

  after('remove sample books', removeSampleBooks);
}

const pickId = ({ _id }) => _id;

async function initDBConnection() {
  const db = await getConnection();

  instance = db_instance(db);
}

async function tryPurchaseBook() {
  before('add demo buyer', addDemoBuyer);

  it('try buy a book', trySinglePurchase);

  it('try verify purchase', tryVerifyPurchase);

  after('remove demo buyer', removeDemoBuyer);
}

async function addDemoBuyer() {
  const { user_helper: { storeUser } } = instance;

  const { _id } = await storeUser(first_user);

  demo_user_id = _id;
}

async function removeDemoBuyer() {  
  const { user_helper: { dropUser }, purchase_helper: { removeUserPurchase } } = instance;

  await removeUserPurchase();

  await dropUser(first_user);
}

async function trySinglePurchase () {
  const { 
    book_helper: { viewBookById },
    purchase_helper: { storePurchase } 
  } = instance;

  const { price: total_price } = await viewBookById(selected_book);

  const user_id = demo_user_id;

  const discount_id = '';

  const record = await storePurchase({ user_id, book_id: selected_book, total_price, discount_id });
  
  console.log('see the result', JSON.stringify(record));

  expect(record, 'the book purchase should have id').to.have.property('_id');

  // expect(record, 'by default verified date of book purchase should be 0').to.have.property('verified_at').to.equal(0);

  const { _id } = record;

  demo_purchase_id = _id;
}

async function tryVerifyPurchase() {
  const { 
    book_helper: { viewBookById },
    purchase_helper: { updatePurchase } 
  } = instance;

  const verified_at = getTimestamp();

  const { price: total_paid } = await viewBookById(selected_book);

  const record = await updatePurchase({ _id: demo_purchase_id, total_paid, verified_at });
  
  console.log('see the result', JSON.stringify(record));

  // expect(record, 'the book purchase should have id').to.have.property('_id');

  // expect(record, 'by verified book purchase should have date which greater than 0').to.have.property('verified_at').to.be.greaterThan(0);

  const { _id } = record;

  demo_purchase_id = _id;
}

async function removeSampleBooks() {
  const {
    author_helper: { viewAuthors, removeAuthor },
    book_helper: { viewBooks, removeBook },
    page_helper: { removeBookPages }
  } = instance;

  const book_records = await viewBooks();

  for (const { _id } of book_records) {
    await removeBookPages(_id);

    await removeBook(_id);
  }

  const author_records = await viewAuthors();

  for (const { _id } of author_records) {
    await removeAuthor(_id);
  }
}

async function tryAddBook() {
  const {
    author_helper: { storeAuthor, viewAuthorByName }, book_helper: { storeBook }
  } = instance;

  for (const data of author_list) {
    const result = await storeAuthor(data);
  }

  for (const { author, ...input } of book_list) {
    const { _id: author_id } = await viewAuthorByName(author);

    const result = await storeBook({ author_id, ...input });

    console.log('see the result', JSON.stringify(result));

    expect(result, 'the stored book should have id').to.have.property('_id');
  }
}

async function tryViewBooks() {
  const { book_helper: { viewBooks } } = instance;

  const result = await viewBooks();

  console.log('see the view result', result);

  expect(result, 'the stored book should have id').to.have.length.greaterThan(0);

  const [first_book, ...others] = result;

  selected_book = pickId(first_book);
}

async function tryAddBookContent() {
  const { page_helper: { addBookPages } } = instance;

  const input_pages = pages.map(data => ({ ...data, book_id: selected_book }));

  const result = await addBookPages(input_pages);

  console.log('see added pages', result);

  expect(result, 'the stored pages should have result').to.have.property('result');

  expect(result, 'the stored pages should have ops').to.have.property('ops');

  const { result: insert_result } = result;

  expect(insert_result, 'if succeed insert pages should be ok').to.have.property('ok').to.equal(1);

  expect(insert_result, 'if succeed number of new pages should equal input pages').to.have.property('n').to.equal(input_pages.length);
}

async function tryViewAllPages() {
  const { page_helper: { viewPages } } = instance;

  const result = await viewPages({ book_id: selected_book, is_preview: false });

  console.log('see the preview pages of book', selected_book, result);

  expect(result, 'all pages should be returned if is_preview is false').to.have.length.greaterThan(0);
}

async function tryViewPreviewPages() {
  const { page_helper: { viewPages } } = instance;

  const result = await viewPages({ book_id: selected_book });

  const preview_pages = result.filter(({ is_preview }) => is_preview);

  expect(preview_pages, 'by default preview pages should returned').to.have.lengthOf(result.length);

  for (const data of preview_pages) {
    console.log('see the page', data);
  }
}