// Создайте функцию m(a,b) оболочку для mul().
// m() должна принимать два аргумента а возвращать результат работы mul()
// с этими двумя аргументами После выполнения задания поэкспериментируйте,
// создайте функцию log(), которая будет принимать одно значение, а вызывать
// console.log() с этим значением.

function mul(n, m) {
  return n * m;
}

function m(a, b) {
  return mul(a, b);
}
