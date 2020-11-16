const { create, all } = require('mathjs')
const config = {};
const math = create(all, config);
const prompt = require('prompt-sync')();
const parser = math.parser()


//Define variables
const z1 = math.parse(prompt('Please enter the first function: '));
const z2 = math.parse(prompt('Enter the second function: '));
const p00 = parseFloat(prompt('Enter the first number of the interval: '));
const p01 = parseFloat(prompt('Enter the last number of the interval: '));

let p0 = [p00, p01];

newtonvec(z1, z2, p0, 0.001, 1000)


function newtonvec(z1, z2, p0, tol, iter) {
    // Solves a equation system F(x) = 0 with the Newton method F is a 2 funcitons matrix
    let counter = 1;

    const x = math.parse('x')
    const y = math.parse('y')

    const z1x = math.derivative(z1, x)
    const z2x = math.derivative(z2, x)
    const z1y = math.derivative(z1, y)
    const z2y = math.derivative(z2, y)

    let evalp0 = {
        x: p0[0],
        y: p0[1]
    }


    let Fp0 = math.matrix([[z1.evaluate(evalp0)], [z2.evaluate(evalp0)]])
    let DFp0 = math.matrix([[z1x.evaluate(evalp0), z1y.evaluate(evalp0)], [z2x.evaluate(evalp0), z2y.evaluate(evalp0)]])

    let DF0inv = math.multiply(math.inv(DFp0), -1);
    let deltap = math.multiply(DF0inv, Fp0);
    let p1 = p0[0] + deltap.subset(math.index(0, 0));
    let p2 = p0[1] + deltap.subset(math.index(1, 0));
    while ((math.max(math.abs(deltap)) > tol) && (counter <= iter)) {
        let evalp = {
            x: p1,
            y: p2
        }
        let DFp = math.matrix([[z1x.evaluate(evalp), z1y.evaluate(evalp)], [z2x.evaluate(evalp), z2y.evaluate(evalp)]]);
        let Fp = math.matrix([[z1.evaluate(evalp)], [z2.evaluate(evalp)]]);
        let DFpinv = math.multiply(math.inv(DFp), -1);
        deltap = math.multiply(DFpinv, Fp);
        p1 = p1 + deltap.subset(math.index(0, 0));
        p2 = p2 + deltap.subset(math.index(1, 0));
        counter = counter + 1;
    }

    if (counter > iter) {
        console.log('Max iterations were reached')
    }

    console.log('The result is: ', [p1, p2])
    console.log(counter, ' iterations were necessary.')

}

