const express = require("express");
const app = express();

// На всякий случай добавляем CORS-заголовки ко всем запросам
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Accept, Content-Type, Authorization, Url"
  );
  next();
});

app.get("/", async (req, res) => {
  const url = req.header("Url");

  if (!url) {
    return res.status(400).send("Не указан URL для проксирования");
  }

  console.log(`Получение данных с ${url}`);

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: req.header("Authorization"),
    },
  };

  try {
    const data = await fetchData(url, options);
    res.json(data._embedded.leads); // Отправляем данные клиенту
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    res.status(500).send("Ошибка при получении данных");
  }
});

async function fetchData(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
  return await response.json();
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Прокси-сервер запущен на порту ${PORT}`);
});
