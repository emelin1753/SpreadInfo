/**
 * function getTableSchema - возвращает массив инструментов для таблицы спредов, по запросу на сервер или хардкод?
 * пусть первый элемент будет колонкой брокеров
 */
function getTableSchema() {
  return ["BROKER", "EURUSD", "AUDUSD", "NZDUSD", "BRENT", "EURCAD", "CADCHF"];
}

/**
 * function getTableBrokers - возвращает массив брокеров для таблицы спредов, по запросу на сервер или хардкод?
 */
function getTableBrokers() {
  return ["Alpari", "Tickmill", "ВТБ", "Альфа"];
}
/**
 * function getSpread - получем спред по запросу на сервер
 * @param {String} broker - имя брокера
 * @param {String} symbol - имя инструмента
 */
function getSpread(broker, symbol) {
  return Math.ceil(Math.random() * 10); //пока функция рандом, потом запрос на сервер
}

/**
 * function generateThead - динамиеческая генерация шапки таблицы спредов
 * @param {Array} tableSchema Массив инструментов для шапки таблицы
 */
function generateThead(tableSchema) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  tableSchema.forEach((symbol) => {
    const td = document.createElement("th");
    td.textContent = symbol;
    tr.appendChild(td);
  });

  thead.appendChild(tr);
  return thead;
}

/**
 * function generateTr - динамическая генерация строки таблицы спредов
 * @param {Array} tableSchema Массив инструментов
 * @param {String} tagName имя тега для таблицы спредов
 * @param {String} broker имя брокера
 */
function generateTr(tableSchema, tagName = "td", broker = "") {
  const tr = document.createElement("tr");
  tableSchema.forEach((item) => {
    const td = document.createElement(tagName);
    td.id = `${broker}-${item}`;
    td.textContent = broker;
    tr.appendChild(td);
  });

  return tr;
}

/**
 * function generateTbody - динамическая генерация тела таблицы спредов
 * @param {Array} tableSchema Массив инструментов
 * @param {Array} tableBrokers Массив брокеров
 */
function generateTbody(tableSchema, tableBrokers) {
  const tbody = document.createElement("tbody");
  tableBrokers.forEach((broker) => {
    const tr = generateTr(tableSchema, "td", broker);
    tbody.appendChild(tr);
  });

  return tbody;
}

/**
 * function generateTableTemplate - генерация шаблона таблицы
 */
function generateTableTemplate() {
  const table = document.createElement("table");
  table.classList.add("table"); //класс необязателен - возможно навесить стили?
  return table;
}

/**
 * function initTable - инициализацаия таблицы спредов
 * @param {Array} tableSchema Массив инструментов для шапки таблицы
 * @param {Array} tableBrokers Массив брокеров для строк таблицы
 */

function initTableSpread(tableSchema, tableBrokers) {
  const container = document.querySelector(".table-container");
  const table = generateTableTemplate();
  const header = generateThead(tableSchema);
  const body = generateTbody(tableSchema, tableBrokers);

  table.appendChild(header);
  table.appendChild(body);

  container.appendChild(table);
}

/**
 * function refreshTableSpread - обновление спредов в таблице
 * @param {*} tableSchema Массив инструментов для шапки таблицы
 * @param {*} tableBrokers Массив брокеров для строк таблицы
 */
function refreshTableSpread(tableSchema, tableBrokers) {
  for (let i = 1; i < tableSchema.length; i++) {
    const symbol = tableSchema[i];
    //начнем с первого индекса, т.к. 0й это брокер
    tableBrokers.forEach((broker) => {
      const elementByID = document.getElementById(`${broker}-${symbol}`);
      const spread = getSpread(broker, symbol);
      elementByID.textContent = spread;
    });
  }
}

const tableSchema = getTableSchema();
const tableBrokers = getTableBrokers();

initTableSpread(tableSchema, tableBrokers);
refreshTableSpread(tableSchema, tableBrokers); //первичное заполнение таблицы
// повторить с интервалом 2 секунды
let timerId = setInterval(
  () => refreshTableSpread(tableSchema, tableBrokers),
  2000
);

// остановить вывод через 10 секунд
setTimeout(() => {
  clearInterval(timerId);
  console.log("stop");
}, 10000);
