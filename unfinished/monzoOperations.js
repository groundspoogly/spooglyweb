function rToM(r) { // TODO: this function changes the argument variable to read [1,1] after it completes. Replacing r with rTemp and leaving r unmodified did not help. Creating a constant in the function that calls rToM somehow modified the constant too.
    let m = [];
	if (r[0] % 1 != 0 || r[1] % 1 != 0) throw 'Internal Error: Non-integer value.';
	for (let div = 2; r[0] > 1 || r[1] > 1; div++) {
	    let exp = 0;
	    while (r[0] % div == 0) {
		    r[0] /= div;
			exp--;
		}
	    while (r[1] % div == 0) {
		    r[1] /= div;
			exp++;
		}
		if (exp != 0) m.push([div, exp]);
	}
	return m;
}

function mToR(m) {
    let r = [1, 1];
    for (let i = 0; i < m.length; i++) {
	    if (m[i][1] < 0) r[0] *= Math.pow(m[i][0], -m[i][1]);
		else r[1] *= Math.pow(m[i][0], m[i][1]);
	}
	return r;
}

function stackM(mArr, expArr) { // stack unsorted monzos
	let productM = [];
	
	// make an array of all different bases in the monzos so that we don't have to go through all possible numbers
	let allBases = [];
	for (let i = 0; i < mArr.length; i++) {
	    for (let j = 0; j < mArr[i].length; j++) {
		    if (allBases.indexOf(mArr[i][j][0]) < 0) {
			    // insert in the proper spot so the array doesn't have to be sorted
				if (allBases.length == 0 || mArr[i][j][0] >= allBases[allBases.length - 1]) allBases.push(mArr[i][j][0]);
				else {
				    for (let b = 0; b < allBases.length; b++) { // the condition is just here to prevent hypothetical infinite loops, and the last index of the array could actually be ignored because it was already analyzed
					    if (mArr[i][j][0] < allBases[b]) {
				            allBases.splice(b, 0, mArr[i][j][0]);
				            break;
						}
					}
				}
			}
		}
	}
	for (let b = 0; b < allBases.length; b++) { // for each possible base
	    let exp = 0;
		for (let i = 0; i < mArr.length; i++) { // for each monzo
		    // search the current monzo for the given base; if it exists, add the exponent and stop searching
		    for (let j = 0; j < mArr[i].length; j++) {
		        if (mArr[i][j][0] == allBases[b]) {
				    exp += mArr[i][j][1] * expArr[i];
					break;
				}
		    }
		}
		if (exp != 0) productM.push([allBases[b], exp]);
	}
	return productM;
}

function findMissingStep(count0, count1, count2, r0, r1, period) { // calculate an unknown step size in an MV3 scale
    return mToR(stackM([rToM(period), rToM(r0), rToM(r1)], [1/count2, -count0/count2, -count1/count2]));
}

function missingStepRange(count0, count1, count2, r0, r1, period) { // calculate the above for a range of step counts
    //for (let count1 = 0; count1 <= count1Max; count1++) {
	    let r2 = findMissingStep(count0, count1, count2, r0, r1, period);
	    document.getElementById('pre').innerHTML += r2[0] + ':' + r2[1] + ' ' + rToC(r2) + 'c<br>';
	//}
}

function approximate(maxD, subgroup, maxError, target) {
    for (let d = 1; d <= maxD; d++) {
	    if (isInSubgroup(d, subgroup)) {
		    for (let n = d; n <= d * 2; n++) { // TODO: update this loop with an unbounded zig-zag approach
			    let cents = 1200 * Math.log2(n / d);
			    if (Math.abs(cents - target) <= maxError && coprime(new Array(d, n)) && isInSubgroup(n, subgroup)) console.log(d + ':' + n + ' ' + cents + ' ' + (cents - target));
			}
		}
	}
}