// Создайте массив d4 с числовыми величинами 45,78,10,3.
// Напишите функцию сортировки my(a,b), которая при вызове
// d4.sort(my) отсортирует элементы массива по убыванию чисел. Вызовите d4.sort(my)

let d4 = [45, 78, 10, 3];

function my(a, b) {
  return b - a;
}
console.log(d4.sort(my));
