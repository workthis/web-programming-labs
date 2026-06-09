
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 4.2. Симуляція запиту
 */
function simulateFetch(url) {
  return new Promise((resolve, reject) => {
    const waitTime = Math.floor(Math.random() * (500 - 200 + 1)) + 200;

    setTimeout(() => {
      if (!url.startsWith("https")) {
        return reject(new Error(`Invalid URL: ${url}`));
      }

      // Симуляція нестабільності
      const isSuccess = Math.random() < 0.7;
      if (isSuccess) {
        resolve({ url, status: 200, data: "OK" });
      } else {
        reject(new Error("Server error: 500"));
      }
    }, waitTime);
  });
}

async function fetchWithRetry(url, attempts) {
  let lastError;

  for (let i = 1; i <= attempts; i++) {
    try {
      console.log(`Спроба #${i}...`);
      return await simulateFetch(url);
    } catch (error) {
      lastError = error;
      console.warn(`Спроба #${i} провалена: ${error.message}`);
      
      if (i < attempts) {
        await delay(500);
      }
    }
  }

  throw lastError;
}

async function fetchMultiple(urls) {
  const results = await Promise.allSettled(urls.map(url => simulateFetch(url)));

  return results.reduce((acc, res) => {
    if (res.status === "fulfilled") {
      acc.successful.push(res.value);
    } else {
      acc.failed.push(res.reason.message);
    }
    return acc;
  }, { successful: [], failed: [] });
}

async function main() {
  console.log("=== Завдання 4: async/await ===");

  console.time("delay");
  await delay(1000);
  console.timeEnd("delay"); 

  console.log("--- 4.2 Single Fetch ---");
  try {
    const result = await simulateFetch("https://jsonplaceholder.typicode.com/posts");
    console.log("Успіх:", result);
  } catch (error) {
    console.error("Помилка:", error.message);
  }

  // 4.3
  console.log("\n--- 4.3 Fetch with Retry ---");
  try {
    const result = await fetchWithRetry("https://jsonplaceholder.typicode.com/posts", 5);
    console.log("fetchWithRetry результат:", result);
  } catch (error) {
    console.error("Всі спроби невдалі:", error.message);
  }

  // 4.4
  console.log("\n--- 4.4 Parallel Fetch ---");
  const results = await fetchMultiple([
    "https://jsonplaceholder.typicode.com/posts",
    "http://invalid-url",
    "https://jsonplaceholder.typicode.com/users",
  ]);
  console.log("Результати:", results);
}

main();