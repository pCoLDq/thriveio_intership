// Создайте функцию rgb(), которая будет принимать три числовых аргумента
// и возвращать строку вида «rgb(23,100,134)». Если аргументы не заданы,
// считать их равными нулю. Не проверять переменные на тип данных

function rgb(a = 0, b = 0, c = 0) {
  return `rgb(${a},${b},${c})`;
}
