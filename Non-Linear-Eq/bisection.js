const { create, all } = require('mathjs')
const config = {};
const math = create(all, config);
const prompt = require('prompt-sync')();

//Defining variables
const f = math.parse(prompt('Please enter the function: '))
let a = parseFloat(prompt('Enter your first point: ', 1));
let b = parseFloat(prompt('Enter your second point: ', 1));
const tol = prompt('Enter the desired tolerance: ')
const maxiter = prompt('Enter the maximum of iterations: ')



bisect(f, a, b, tol, maxiter)

function bisect(f, a, b, tol, maxiter) {
    //Calculates roots of a function using the Bisection Method

    if (f.evaluate({ x: a }) * f.evaluate({ x: b }) > 0) {
        console.log('f(a) and f(b) have the same sign!')
        return
    }

    if (a > b) {
        console.log('The first value must be greater than the second one!')
        return
    }
    let counter = 1;
    let I = math.abs(b - a) / 2;
    let m = math.sum(a + b) / 2;
    while ((I > tol) && (counter < maxiter)) {
        if (f.evaluate({ x: a }) * f.evaluate({ x: m }) < 0) {
            b = m; // a stays the same
        }
        else if (f.evaluate({ x: b }) * f.evaluate({ x: m }) < 0) {
            a = m; // b stays the same
        }
        else { // f(m)=0
            break;
        }
        m = a + I; // m = (a + b) / 2;
        counter = counter + 1;
        I = I / 2;
    }

    if (counter == maxiter) {
        console.log('Max iterations reached')
    }
    else {
        console.log('The solution is: ', m)
        console.log(counter, ' iterations were necessary')
    }
}
