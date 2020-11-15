const { create, all } = require('mathjs')
const config = {};
const math = create(all, config);
const prompt = require('prompt-sync')();


//Define variables
const f = math.parse(prompt('Please enter the function: '))
let p0 = parseFloat(prompt('Enter the first point: ', 1));
let p1 = parseFloat(prompt('Enter the second point: ', 1));
const tol = prompt('Enter the desired tolerance: ')
const iter = prompt('Enter the maximum of iterations: ')

secant(f, p0, p1, tol, iter)

function secant(f, p0, p1, tol, iter) {
    //Solves f(x)=0 with the Secant method
    let counter = 1;
    let f0 = f.evaluate({ x: p0 });
    let f1 = f.evaluate({ x: p1 });
    let p = p1 - f1 * (p1 - p0) / (f1 - f0);

    while ((math.abs(p - p1) > tol) && (counter <= iter)) {
        p0 = p1; f0 = f1;
        p1 = p; f1 = f.evaluate({ x: p });
        p = p1 - f1 * (p1 - p0) / (f1 - f0);
        counter = counter + 1;
    }

    if (counter > iter) {
        console.log('Max number of iterations reached')
    }

    console.log('The solution is: ', p)
    console.log(counter, ' iterations were necessary')

}
