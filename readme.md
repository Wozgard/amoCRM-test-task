# Тестовое задание в компанию Emfy

Это тестовое задание представляет собой расширение для amoCRM, с помощью которого можно выводить данные о сделках с разной пагинацией и соритровать по **названию** и **бюджету**

## Оригинальный текст тестового задания
Подготовка:
Зарегистрировать аккаунт в https://www.amocrm.ru/ Зайти в раздел амоМаркет (/amo-market/).
Нажать на 3 точки в правом верхнем углу - создать "Внешнюю интеграцию" для доступа к amoCRM по API. Документация по созданию интеграций, методам API и получению ключей oAuth - https://www.amocrm.ru/developers/
Получить access_token для доступа по API к аккаунту amoCRM можно с помощью authorization_code во вкладке "Ключи и доступы" во вновь созданной интеграции. Для этого достаточно отправить необходимые запросы на получение access_token из консоли разработчика. Далее необходимо в разделе "Сделки" создать минимум 11 сделок, в которых поле "Бюджет" заполнить случайными суммами (сделать вручную, а не по API). После этого разработать скрипт для выполнения тестового задания.

Тестовое задание:
ВАЖНО. Тестовое задание должно быть выполнено полностью на frontend в виде отдельно сверстанной страницы без использования backend.
1. Вывести на страницу в виде таблицы Сделки из созданного аккаунта amoCRM с помощью ранее полученных доступов. Для решения проблемы CORS можно использовать любой прокси-сервер - это даст возможность выполнять обращение к методам amoCRM. В таблицу необходимо вывести названия сделок, бюджеты, даты и время создания/изменения, ответственных и любые другие поля сделок. В рамках выполнения задания безопасностью можно пренебречь - необходимо сохранить refresh и access токены для доступа к аккаунту непосредственно в скрипте.
2. Скрипт должен давать возможность пагинации по 2, 5 и 10 сделок на странице. Также должна быть возможность вывести сразу все сделки. В рамках вывода всех сделок необходимо выполнить ограничение: за один запрос получать максимум 5 сделок и не отправлять более 2 запросов в секунду.
3. Реализовать сортировку по бюджету и названию сделки.
4. Критерием успешно выполненного задания являются все пункты описанные выше, а также обязательное предоставление access и refresh токенов в теле кода для последующей проверки скрипта. Написание скрипта предполагается на чистом JavaScript (с привлечением jQuery при необходимости). Для отображения может быть использован CSS фреймворк (например, Bootstrap).

## Запуск

Перед тем как открыть файл index.html в папке integration нужно установить зависимости для прокси-сервера и запустить его:

```bash
npm install
```

```bash
npm start
```

После этого можно открывать файл index.html в браузере
