import { LIBRARY_NAME, books } from './data.js';
import BookCollection from './utils.js'; 
import { 
    getBooksByGenre as filterByGenre,
    getAveragePages, 
    getOldestBook 
} from './utils.js';

console.log("=== Завдання 5: Модулі ===");
console.log("Бібліотека:", LIBRARY_NAME);
console.log("Всього книг у вихідних даних:", books.length);

const fantasyBooks = filterByGenre(books, "Fantasy");
console.log("Книги в жанрі Fantasy:", fantasyBooks.map(b => b.title));

const avgPages = getAveragePages(books);
console.log(`Середня кількість сторінок: ${avgPages.toFixed(2)}`);

const oldest = getOldestBook(books);
console.log("Найстаріша книга:", oldest ? `${oldest.title} (${oldest.year})` : "Не знайдено");

const myCollection = new BookCollection(books);
console.log("Початкова кількість у колекції:", myCollection.count);

myCollection.addBook({ title: "Dune", author: "Frank Herbert", year: 1965, pages: 412, genre: "Sci-Fi" });
console.log("Кількість після додавання:", myCollection.count);

const sorted = myCollection.getSortedByYear();
console.log("Книги відсортовані за роком видання:");
sorted.forEach(book => console.log(` - ${book.year}: ${book.title}`));