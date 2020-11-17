const { create, all, rowDependencies } = require('mathjs')
const config = {};
const math = create(all, config);
const prompt = require('prompt-sync')();
const parser = math.parser()


const fstr = prompt('Please enter the function f(x): ')
const f = math.parse(fstr);
const a = parseFloat(prompt('Enter the first number of the interval: '));
const b = parseFloat(prompt('Enter the last number of the interval: '));
const L = parseFloat(prompt('Enter the number of subintervals: '));
const n = parseFloat(prompt('Enter the amount of points for the inverval: '));

CompNC(f, a, b, L, n)

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

function CompNC(f, a, b, L, n) {
    //Calculates the integral of f over [a,b] using the Composed Newton-Côtes formula for n points

    w = weights(n);
    var i, y = Array(n);
    for (i = L; i >= 0; i--) {
        y[i] = (i * b + (L - i) * a) / L;
    }
    h = math.divide((b - a), L);
    let Q = 0;
    let fz = new Array(n).fill(1)

    for (var l = 0; l < L; l++) {

        let z = linspace(y[l], y[l + 1], n);

        for (var k = 0; k < n; k++) {
            let eval = {
                x: z[k],
            }
            fz[k] = f.evaluate(eval);
        }
        const fvec = math.matrix(fz)
        Q = Q + math.multiply(h, (math.multiply(fvec, w).subset(math.index(0))));
    }
    console.log('The integral of ', fstr, ' between ', a, ' and ', b, ' is: ', Q)
}

function linspace(a, b, n) {
    if (typeof n === "undefined") n = Math.max(Math.round(b - a) + 1, 1);
    if (n < 2) { return n === 1 ? [a] : []; }
    var i, ret = Array(n);
    n--;
    for (i = n; i >= 0; i--) { ret[i] = (i * b + (n - i) * a) / n; }
    return ret;
}
