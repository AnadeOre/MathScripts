const { create, all, rowDependencies } = require('mathjs')
const config = {};
const math = create(all, config);
const prompt = require('prompt-sync')();
const parser = math.parser()


const fstr = prompt('Please enter the function f(x): ')
const f = math.parse(fstr);
const a = parseFloat(prompt('Enter the first number of the interval: '));
const b = parseFloat(prompt('Enter the last number of the interval: '));
const n = parseFloat(prompt('Enter the amount of points for the inverval: '));

integralNC(f, a, b, n)

function weights(n) {
    //Calculates weights of the Newton Côtes formula for n points

    var i, x = Array(n);
    n--;
    for (i = n; i >= 0; i--) {
        x[i] = (i * 1 + (n - i) * 0) / n;
    } //x = linspace(0, 1, n);

    A = new Array(n + 1).fill(1);

    for (var i = 0; i < n + 1; i++) {
        A[i] = Array(n + 1).fill(1)
    }

    for (var j = 1; j <= n; j++) {
        for (var k = 0; k <= n; k++) {
            let a = A[j - 1][k] * x[k]
            A[j][k] = a
        }
    }
    let b1 = new Array(n + 1).fill(1)
    for (var i = 1; i < n + 1; i++) {
        b1[i] = i + 1
    }
    let b = new Array(n + 1).fill(0)
    for (var j = 0; j <= n; j++) {
        b[j] = 1 / b1[j]
    }
    const bm = math.matrix(b)
    const Am = math.matrix(A)

    return math.lusolve(Am, bm)
}

function integralNC(f, a, b, n) {
    //Calculates the integral of f over [a,b] using the Newton-Côtes of n points

    w = weights(n);
    var i, y = Array(n);
    n2 = n - 1;
    for (i = n2; i >= 0; i--) {
        y[i] = (i * b + (n2 - i) * a) / n2;
    }
    fy = new Array(n).fill(1)
    for (var j = 0; j < n; j++) {
        let eval = {
            x: y[j],
        }
        fy[j] = f.evaluate(eval);
    }

    const fvec = math.matrix(fy)
    Q = math.multiply((b - a), (math.multiply(fvec, w).subset(math.index(0))));
    console.log('The integral of ', fstr, ' between ', a, ' and ', b, ' is: ', Q)
}