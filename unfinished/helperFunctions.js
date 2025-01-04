function cents(q) {
    return 1200 * Math.log2(q);
}

function rToC(r) {
    return 1200 * Math.log2(r[1] / r[0]);
}

function rToO(r) {
    return Math.log2(r[1] / r[0]);
}

function rToQ(r) {
    return r[1] / r[0];
}

function logBase(a, b) {
    return Math.log(a) / Math.log(b);
}

function rToSlash(r) {
	return r[1] + '/' + r[0];
}

function eigenmonzo(m) {
	// m = [first coefficient, exponent numerator, exponent denominator, second coefficient, ...]
	let r = 1;
	for (let i = 2; i < m.length; i += 3) { // start at end of triad to avoid accessing nonexistent indices
		r *= Math.pow(m[i - 2], m[i - 1] / m[i]);
	}
	return r;
}

function multiplyEM(m, n) {
	// TODO go through each element of n and see if it's in m
	return m;
}

Number.prototype.mod = function(a) { // handles negative numbers properly
    return ((this % a) + a) % a;
};

function pitchUnitText(pitchUnit, u) {
    if (arguments.length != 2) throw 'Internal Error: Wrong number of arguments.';
    let uTrim = (Number.isInteger(u) ? u : u.toPrecision(6)); // using toPrecision() on an integer will result in trailing zeros
    switch (pitchUnit) {
        case 'o':   return uTrim +   ' O'; // octaves
        case 'mo':  return uTrim +  ' mO'; // millioctaves
        case 'c':   return uTrim +    '¢'; // cents
        case 'np':  return uTrim +  ' Np'; // nepers
        case 'mnp': return uTrim + ' mNp'; // millinepers
        default: throw 'Internal Error: Unknown pitch unit.';
    }
}

function octavesToPitchUnits(pitchUnit, oct) {
    if (arguments.length != 2) throw 'Internal Error: Wrong number of arguments.';
    switch (pitchUnit) {
        case 'o':   return oct;
        case 'mo':  return oct * 1000;
        case 'c':   return oct * 1200;
        case 'np':  return oct / Math.log(2);
        case 'mnp': return oct * 1000 / Math.log(2);
        default: throw 'Internal Error: Unknown pitch unit.';
    }
}

function pitchUnitsToOctaves(pitchUnit, u) {
    if (arguments.length != 2) throw 'Internal Error: Wrong number of arguments.';
    switch (pitchUnit) {
        case 'o':   return u;
        case 'mo':  return u / 1000;
        case 'c':   return u / 1200;
        case 'np':  return u * Math.log(2);
        case 'mnp': return u * Math.log(2) / 1000;
        default: throw 'Internal Error: Unknown pitch unit.';
    }
}

function coprime(r) {
    if (arguments.length != 1) throw 'Internal Error: Wrong number of arguments.';
    let maxDivisor = Math.min(...r);
    for (let divisor = 2; divisor <= maxDivisor; divisor++) {
	    if (r.every(function (e) {return e % divisor == 0})) return false; // check each number in r
    }
    return true;
}

function isInSubgroup(a, subgroup) {
    //return true; // TODO: why can't I get it to work without having to specify a subroup?
    for (let i = 0; i < subgroup.length; i++) {
	    while (a % subgroup[i] == 0) a /= subgroup[i];
	}
	return a == 1;
}

function reduce(r) { // smart version of the function, ES5+, takes ratios of arbitrary length
    if (arguments.length != 1) throw 'Internal Error: Wrong number of arguments.';
    let maxDivisor = Math.min(...r);
    for (let divisor = 2; divisor <= maxDivisor; divisor++) {
	    if (r.every(function (e) {return e % divisor == 0})) {
		    for (let i = 0; i < r.length; i++) r[i] /= divisor;
		}
    }
    return r;
}

function stack(r, s) { // simpler version of the reduce function that stacks exactly two intervals
    if (arguments.length != 2) throw 'Internal Error: Wrong number of arguments.';
	r[0] *= s[0];
	r[1] *= s[1];
	for (let i = Math.min(r[0], r[1]); i > 1; i--) {
		if ((r[0] % i == 0) && (r[1] % i == 0)) {
			r[0] /= i;
			r[1] /= i;
		}
	}
	return r;
}

function smallestPrimeFactor(a) {
    if (arguments.length != 1) throw 'Internal Error: Wrong number of arguments.';
    // if divisible by 2 
    if (a % 2 == 0) return 2;
    // iterate from 3 to sqrt(a)
    for (let i = 3; i * i <= a; i += 2) {
        if (a % i == 0) return i;
    }
    return a; 
}

function relativeError(n, edo) {
    let logN = Math.log2(n);
	return Math.abs(logN-(Math.round(logN*edo)/edo)) * edo * 2
}


function lmsToInt(c) {
	switch(c) {
		case 'l': case 'L': return 0;
		case 'm': case 'M': return 1;
		case 's': case 'S': return 2;
	}
}

function goodLog3d(arr) { // the console log was straight up getting my arrays wrong so I'm leaving no room for error
	let str = '';
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			str += 'arr[' + i + '][' + j + '][]:';
			for (let k = 0; k < arr[i][j].length; k++) {
				str += ' ' + arr[i][j][k];
			}
			str += '\n';
		}
	}
	console.log(str);
}

function deepLoop(min, max, fn) {
/*
	for (i[0] = min[0]; i[0] <= max[0]; i[0]++) {
		for (i[1] = min[1]; i[1] <= max[1]; i[1]++) {
			... {
				
			}
		}
	}
*/
	let 
}