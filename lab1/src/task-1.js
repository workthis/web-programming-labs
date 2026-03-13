/**
 * 1.1
 * Використовуємо деструктуризацію об'єкта.
 * Для middleName задаємо порожній рядок
 */
function getFullName({ firstName, lastName, middleName = "" }) {
  //Перша літеру імені
  const fInitial = `${firstName[0]}.`;
  const mInitial = middleName ? ` ${middleName[0]}.` : "";

  // Шаблонна строка
  return `${lastName} ${fInitial}${mInitial}`;
}

/**
 * Завдання 1.2
 */
function mergeObjects(...objects) {
  return objects.reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

/**
 * Завдання 1.3: Видалення дублікатів
 * Збираємо всі масиви в один за допомогою spread
 */
function removeDuplicates(...arrays) {
  const combined = [].concat(...arrays);
  return [...new Set(combined)];
}

/**
 * Завдання 1.4 Оновлення користувача
 * Створюємо новий об'єкт, розгортаючи старі дані та нові.
 */
function createUpdatedUser(user, updates) {
  return {
    ...user, // Копіюємо всі поля базового юзера
    ...updates, // Накладаємо оновлення
    address: updates.address 
      ? { ...user.address, ...updates.address } 
      : user.address
  };
}

// Виведення результатів
console.log("=== Завдання 1: Деструктуризація та Spread/Rest ===");

// 1.1
const user1 = { firstName: "Петро", lastName: "Іванов", middleName: "Сергійович" };
const user2 = { firstName: "Анна", lastName: "Коваль" };
console.log("1.1 (Full):", getFullName(user1)); // "Іванов П. С."
console.log("1.1 (Short):", getFullName(user2)); // "Коваль А."

// 1.2
console.log("1.2 (Merge):", mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 })); 
// { a: 3, b: 2, c: 4 }

// 1.3
console.log("1.3 (Unique):", removeDuplicates([1, 2, 3], [2, 3, 4], [4, 5])); 
// [1, 2, 3, 4, 5]

// 1.4
const user = { name: "John", age: 25, address: { city: "Kyiv", zip: "01001" } };
const updated = createUpdatedUser(user, { age: 26, address: { zip: "02002" } });
console.log("1.4 (Updated User):", updated);
console.log("1.4 (Original check):", user.address.zip === "01001" ? "Original is safe" : "Original mutated!");