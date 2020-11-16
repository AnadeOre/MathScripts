const { create, all } = require('mathjs')
const config = {};
const math = create(all, config);
const prompt = require('prompt-sync')();


//Define variables
const f = math.parse(prompt('Please enter the function: '))
const fder = math.parse(prompt('Please enter the derivative: '))
let p0 = parseFloat(prompt('Enter the starting point: ', 1));
const tol = prompt('Enter the desired tolerance: ')
const iter = prompt('Enter the maximum of iterations: ')


newton(f, fder, p0, tol, iter)

function newton(f, fder, p0, tol, iter) {
    //Solves an equation f(x)=0 with the Newton Method

    let counter = 1;
    let p = p0 - (f.evaluate({ x: p0 }) / fder.evaluate({ x: p0 }))

    while ((math.abs(p - p0) > tol) && (counter <= iter)) {
        p0 = p;
        p = p0 - (f.evaluate({ x: p0 }) / fder.evaluate({ x: p0 }));
    }

    if (counter > iter) {
        console.log('Max number of iterations reached')
    }

    console.log('The solution is: ', p)
    console.log(counter, ' iterations were necessary')
}