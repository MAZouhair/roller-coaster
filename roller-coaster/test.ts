declare function require(name:string);
const fs = require('fs');





/**
 * Tortoise and Hare algorithm to solve the problem, first we look for the smallest cycle, then we compute what
 * is left after the end of the last cycle and before the beginning of the first cycle, then we just need to multiply every
 * gain we made by tour kept in memory by the number of time those tours are played.
 * @param  {number} L the limit of people accepted in a tour 
 * @param  {number} C the number of times the roller coaster can function
 * @param  {number[]} P the array that keeps track of the groups position and their population
 * @return {number} result the maximal gain
 */


function totalGains(L, C, P) {
    let result = 0;
    let tourGains = []; 
    let k: number = 0
    let map = new Map<string,number>();
    map.set(P.toString(),0)
    let t:number = P.shift(); 

    let startCycle: number = -1; 
    let cycleDetected: boolean = false;


    while (startCycle === -1 && !cycleDetected){

        if (startCycle !== -1){
            cycleDetected = true;
        }

        k++;
        let pop: number = 0;
        for (let i = 0; i <= P.length && pop + t <= L; i++) { 
            pop+= t; 
            P.push(t);
            t = P.shift(); 
        }
        tourGains.push(pop)

        if (map.has(P.toString())){
            startCycle = map.get(P.toString());
        }
        else{
            map.set(P.toString(),k);
        }
    };
    
    

    for (let i = 0; i < startCycle; i++) {
        result+= tourGains[i];
    }

    let rest = (C - startCycle) % (tourGains.length - startCycle);

    for (let i = startCycle; i < tourGains.length; i++) {
        let numCycle: number = Math.floor((C - startCycle) / (tourGains.length - startCycle));
        if (rest > 0) {
            result+= tourGains[i] * (numCycle + 1);
        }
        else{
            result+= tourGains[i] * numCycle
        }
        rest--; 
    }
    return result;
}

var array_hard = fs.readFileSync("roller_coaster.hard").toString().split("\n");
const inputs_hard: string[] = array_hard[0].split(' ');
const L_hard: number = parseInt(inputs_hard[0]);
const C_hard: number = parseInt(inputs_hard[1]);
const N_hard: number = parseInt(inputs_hard[2]);
let P_hard: number[] = [];
for (let i = 0; i < N_hard; i++) {
    P_hard.push(parseInt(array_hard[i+1]));
}

console.log("for the harder dataset: "+totalGains(L_hard,C_hard,P_hard))




var array_harder = fs.readFileSync("roller_coaster.harder").toString().split("\n");
const inputs_harder: string[] = array_harder[0].split(' ');
const L_harder: number = parseInt(inputs_harder[0]);
const C_harder: number = parseInt(inputs_harder[1]);
const N_harder: number = parseInt(inputs_harder[2]);
let P_harder: number[] = [];
for (let i = 0; i < N_harder; i++) {
    P_harder.push(parseInt(array_harder[i+1]));
}

console.log("for the harder dataset: "+totalGains(L_harder,C_harder,P_harder))

