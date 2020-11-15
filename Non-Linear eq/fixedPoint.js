const { create, all } = require('mathjs')
const config = {};
const math = create(all, config);
const prompt = require('prompt-sync')();


//Defining variables:
const g = math.parse(prompt('Please enter the function: '))
let p0 = prompt('Enter your initial point: ', 1);
const tol = prompt('Enter the desired tolerance: ')
const iter = prompt('Enter the maximum of iterations: ')

fixedpoint(p0, g, tol, iter)


function fixedpoint(p0, g, tol, iter) {
    //Solves an equation x=g(x) with the Fixed-point Method
    let i = 0;
    let p = g.evaluate({ x: p0 })
    while (math.abs(p - p0) > tol && (i < iter)) {
        i = i + 1
        p0 = p;
        p = g.evaluate({ x: p0 })
    }
    if (math.abs(p - p0) > tol) {
        return console.log(p, i)
    }
    else {
        console.log('The fixed point is', p)
        console.log(`${i} iterations were necessary`)
    }
}
