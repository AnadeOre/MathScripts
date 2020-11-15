const { create, all } = require('mathjs')
const config = {};
const math = create(all, config);

function sum(A, B) {
    //Sum two matrices A and B
    const C = math.add(A, B);
    return console.log(C._data)
}

const A = math.matrix([[0, 1], [2, 3]])
const B = math.matrix([[1, 2], [3, 4]])

sum(A, B)


