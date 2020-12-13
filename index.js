let modeLines = false;
let mountainStart = 300;

let skyColor, skyColor2, skyAccentColor, skyAccentColor2, mountainColor,
mountainColor2, starColor, starColor2, cloudColor;

var cols, rows;
var flowfield;
var particles = [];
var inc = 0.1;
let mountainDetail = 10;
var particleScl = 15;
let resolutionX = 600;
let resolutionY = 900;
let seed = 1;


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

document.getElementById("seedText").value = getRandomInt(Number.MAX_SAFE_INTEGER);

function generate() {
    resolutionX = Math.max(1.0, Number(document.getElementById("resolutionX").value));
    resolutionY = Math.max(1.0, Number(document.getElementById("resolutionY").value));

    mountainDetail = Math.max(1.0, Number(document.getElementById("mountainDetail").value));
    particleScl = Math.max(1.0, Number(document.getElementById("particleDetail").value));

    modeLines = Boolean(document.getElementById("modeSelectLines").checked);

    skyColor = color(document.getElementById("skyColor1").value);
    skyColor2 = color(document.getElementById("skyColor2").value);

    skyAccentColor = color(document.getElementById("skyAccentColor1").value);
    skyAccentColor2 = color(document.getElementById("skyAccentColor2").value);
    
    mountainColor = color(document.getElementById("mountainColor1").value);
    mountainColor2 = color(document.getElementById("mountainColor2").value);

    starColor = color(document.getElementById("starColor1").value);
    starColor2 = color(document.getElementById("starColor2").value);

    cloudColor = color(document.getElementById("cloudColor1").value);

    seed = Number(document.getElementById("seedText").value);
    randomSeed(seed);
    noiseSeed(seed);
    drawFromSeed()
}

function generateRandom() {
    seed = getRandomInt(Number.MAX_SAFE_INTEGER);
    
    document.getElementById("seedText").value = seed;
    mountainStart = resolutionY / 2.5;
    generate();
}
