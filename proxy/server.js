const https = require('https');
const express = require('express');
const app = express();

// Middleware для установки заголовков CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization, Url');
  next();
});

// Обработчик OPTIONS-запросов для CORS
app.options('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization, Url');
  res.send();
  console.log('Получен OPTIONS-запрос с CORS');
  next();
});

// Обработчик GET-запросов для проксирования
app.get('/', (req, res) => {
  // Получение URL из пользовательского заголовка "Proxy-Url"
  const url = req.header("Url");
  
  if (!url) {
    return res.status(400).send('Не указан URL для проксирования');
  }

  console.log(`Получение данных с ${url}`);
  
  // Получение заголовков запроса от клиента
  const headers = req.headers;

  // Опции запроса, включая URL и заголовки
  const options = {
    method: 'GET',
    headers: headers,
  };

  // Выполнение запроса
  const proxyReq = https.request(url, options, (proxyRes) => {
    let data = '';
    proxyRes.on('data', (chunk) => {
      data += chunk;
    });
    proxyRes.on('end', () => {
      res.send(data); // Отправляем данные только после получения ответа от удаленного сервера
    });
  });

  proxyReq.on('error', (err) => {
    console.error('Error with proxy request:', err);
    res.status(500).send('Error: ' + err.message);
  });

  proxyReq.end();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Прокси-сервер запущен на порту ${PORT}`);
});
