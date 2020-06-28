var fs = require('fs');
/**
 * Tortoise and Hare algorithm to solve the problem, first we look for the smallest cycle, than we compute what
 * is left after the end of the last cycle and before the beginning of the first cycle, then we just need to multiply every
 * gain we made by tour kept in memory by the number of time those tours are played.
 * @param  {number} L the limit of people accepted in a tour
 * @param  {number} C the number of times the roller coaster can function
 * @param  {number[]} P the array that keeps track of the groups position and their population
 * @return {number} result the maximal gain
 */
function totalGains(L, C, P) {
    var result = 0;
    var tourGains = [];
    var k = 0;
    var map = new Map();
    map.set(P.toString(), 0);
    var t = P.shift();
    var startCycle = -1;
    var cycleDetected = false;
    while (startCycle === -1 && !cycleDetected) {
        if (startCycle !== -1) {
            cycleDetected = true;
        }
        k++;
        var pop = 0;
        for (var i = 0; i <= P.length && pop + t <= L; i++) {
            pop += t;
            P.push(t);
            t = P.shift();
        }
        tourGains.push(pop);
        if (map.has(P.toString())) {
            startCycle = map.get(P.toString());
        }
        else {
            map.set(P.toString(), k);
        }
    }
    ;
    for (var i = 0; i < startCycle; i++) {
        result += tourGains[i];
    }
    var rest = (C - startCycle) % (tourGains.length - startCycle);
    for (var i = startCycle; i < tourGains.length; i++) {
        var numCylce = Math.floor((C - startCycle) / (tourGains.length - startCycle));
        if (rest > 0) {
            result += tourGains[i] * (numCylce + 1);
        }
        else {
            result += tourGains[i] * numCylce;
        }
        rest--;
    }
    return result;
}
var array_hard = fs.readFileSync("roller_coaster.hard").toString().split("\n");
var inputs_hard = array_hard[0].split(' ');
var L_hard = parseInt(inputs_hard[0]);
var C_hard = parseInt(inputs_hard[1]);
var N_hard = parseInt(inputs_hard[2]);
var P_hard = [];
for (var i = 0; i < N_hard; i++) {
    P_hard.push(parseInt(array_hard[i + 1]));
}
console.log("for the harder dataset: " + totalGains(L_hard, C_hard, P_hard));
var array_harder = fs.readFileSync("roller_coaster.harder").toString().split("\n");
var inputs_harder = array_harder[0].split(' ');
var L_harder = parseInt(inputs_harder[0]);
var C_harder = parseInt(inputs_harder[1]);
var N_harder = parseInt(inputs_harder[2]);
var P_harder = [];
for (var i = 0; i < N_harder; i++) {
    P_harder.push(parseInt(array_harder[i + 1]));
}
console.log("for the harder dataset: " + totalGains(L_harder, C_harder, P_harder));
