# Bosa Noga Online Shop

![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-764abc?logo=redux)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?logo=vite)

Пет-проект интернет-магазина обуви на React, TypeScript и Redux Toolkit. Приложение имитирует рабочий e-commerce сценарий: каталог товаров, фильтрация по категориям, поиск, карточка товара, корзина и оформление заказа.

## Демо

[Посмотреть демо](https://online-shoe-store-two.vercel.app/)

## Возможности

- Главная страница с блоком хитов продаж.
- Каталог товаров с категориями, поиском и кнопкой "Загрузить еще".
- Карточка товара с галереей изображений, миниатюрами, выбором размера и количества.
- Корзина с подсчетом стоимости, удалением товаров и сохранением в `localStorage`.
- Оформление заказа через POST-запрос.
- Обработка ошибок загрузки и повторные запросы.
- Адаптивная верстка для десктопа, планшета и мобильных экранов.
- Защита от некорректных URL товара.

## Стек

- React
- TypeScript
- Vite
- React Router
- Redux Toolkit
- RTK Query
- Node.js backend из папки `backend`

## Запуск проекта

Установка зависимостей фронтенда и запуск:

```bash
npm install
npm run dev
```

Установка зависимостей бэкенда и запуск:

```bash
cd backend
npm install
npm start
```

По умолчанию API доступно на:

```txt
http://localhost:7070/api
```

## Структура

```txt
src/
  app/              Redux store
  pages/            Страницы и UI-компоненты
  services/         Redux slice и RTK Query API
  types.tsx         TypeScript-типы
backend/
  src/              Локальный API-сервер
img/                Изображения проекта
```
