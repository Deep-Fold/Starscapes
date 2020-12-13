
let drawSteps = [
  function() { background(255)},
  doSkyStep,
  doStarStep,
  drawStars,
  function() {drawMountain(1)},
  function() {drawMountain(2)},
  function() {drawMountain(3)},
  function() {drawMountain(4)},
  function() {drawMountain(5)},
]

let drawIndex = drawSteps.length;

function setup() {
  let cvs = createCanvas(resolutionX, resolutionY);
  cvs.parent("container")

  skyColor = color(57, 120, 168);
  skyColor2 = color(57, 49, 75);
  skyAccentColor = color(205, 96, 147);
  skyAccentColor2 = color(142, 71, 140);
  mountainColor =  color(57, 123, 68);
  mountainColor2 = color(182, 213, 60);
  starColor = color(244, 180, 27);
  starColor2 = color(138, 235, 241);
  cloudColor = color(223, 246, 245);

  document.getElementById("skyColor1").value = skyColor.toString('#rrggbb');
  document.getElementById("skyColor2").value = skyColor2.toString('#rrggbb');
  document.getElementById("skyAccentColor1").value = skyAccentColor.toString('#rrggbb');
  document.getElementById("skyAccentColor2").value = skyAccentColor2.toString('#rrggbb');
  document.getElementById("mountainColor1").value = mountainColor.toString('#rrggbb');
  document.getElementById("mountainColor2").value = mountainColor2.toString('#rrggbb');
  document.getElementById("starColor1").value = starColor.toString('#rrggbb');
  document.getElementById("starColor2").value = starColor2.toString('#rrggbb');
  document.getElementById("cloudColor1").value = cloudColor.toString('#rrggbb');

  cols = floor(width / particleScl);
  rows = floor(height / particleScl);
}

function drawFromSeed() {
  resizeCanvas(resolutionX, resolutionY);
  cols = floor(width / particleScl);
  rows = floor(height / particleScl);

  
  drawIndex = 0;
}

function doCloudStep() {
  let clouds = makeCloudCircles();
  drawCloudCircles(clouds);
  let cloudParticles = [];

  for (cloud of clouds) {
      let p = new StarParticle();
      p.position = createVector(cloud.x, cloud.y )
      p.previousPosition = p.position.copy()
      p.targetColor = lerpColor(skyColor, skyColor2, random(0,1));

      p.spread = 10;
      cloudParticles.push(p);
  }

  let cloudField = makeCloudField();
  drawField(cloudField, cloudParticles, 20)
}

function doSkyStep() {
  drawBackground();

  let skyField = makeSkyField();
  let skyParticles = [];

  for (var x = -40; x < width; x += particleScl) {
    for (var y = -40; y < height; y += particleScl) {

      let p = new Particle();
      p.pos = createVector(x, y)
      p.previousPosition = createVector(x, y)
      skyParticles.push(p);
    }
  }

 drawField(skyField, skyParticles, 40);
}

function doStarStep() {
  let circles = makeStarCircles();
  let starParticles = [];

  for (c of circles) {
    let rScl = c.r* 0.5;
		for(let j = 0; j < floor(c.r * 0.35);j++) {
			let p = new StarParticle();
			p.position = createVector(random(c.x - rScl, c.x + rScl), random(c.y - rScl, c.y + rScl))
      p.previousPosition = p.position.copy();
      p.targetColor = lerpColor(starColor, starColor2, random(0,1));
			starParticles.push(p);  
		}
  }

  let starField = makeStarField(circles);
  drawField(starField, starParticles, 20)
}

function draw() {
  if (drawIndex < drawSteps.length) {
    drawSteps[drawIndex]();
    drawIndex ++;
  }
}


function drawStars() {
  for(let i = 0; i < 500; i++) {
    strokeWeight(random(0.3, 5.0));
    stroke(255, 255, 255, random(0, 255));
    var h = random(0, 30) * random(4, 30);
    point(random(0, width), h);
  }
}

function drawCloudCircles(clouds) {
  noStroke();
  for (cloud of clouds) {
    let c = lerpColor(cloud.c, skyColor, random(0.0, 1.0))
    fill(c)
    circle(cloud.x, cloud.y, cloud.r)
  }
}

function drawBackground() {
  strokeWeight(mountainDetail*1.5);
  for(let y = 0; y < height; y+= mountainDetail) {
    stroke(lerpColor(skyColor2, skyColor, y/height * random(0.7, 1.3)));
    line(0, y, width, y)
  }
  noStroke();
  for(let y = 0; y < height; y+= 5) {
    if (random(0, 100) > 95) {
      let c = lerpColor(skyColor, skyAccentColor, random(0, 1))
      fill(c)
      circle(random(0, width), y, random(100, 200))
    }

    if (random(0, 100) > 95) {
      let c = lerpColor(skyColor, skyAccentColor2, random(0, 1))
      fill(c)
      circle(random(0, width), y, random(100, 200))
    }
  }
}

function drawMountain(distance) {
  let mountainHeight = height - mountainStart;
  let particles = [];
  let renderer = createGraphics(width, height);
  let iters = 30 - distance * 2 - random(0, 10);
  let lRenderers = [];

  for(let x = 0; x < width + mountainDetail; x+=mountainDetail) {
    let n = noise(x*0.001 * (distance/.7), distance*50);
    let heighestPoint = (mountainHeight * 0.85) + (distance/10.0)*mountainHeight + mountainStart;
    let altitude = n*(mountainHeight * 0.85) + (distance/10.0)*mountainHeight + mountainStart ;

    renderer.strokeWeight(mountainDetail*2);
    for (let y = altitude; y < height + mountainDetail; y+=mountainDetail) {

      let c = lerpColor(mountainColor, mountainColor2, pow(y/(heighestPoint-150), 7));
      c = lerpColor(skyColor, c, pow(distance/5.0, 2.0))

      renderer.stroke(c);
      renderer.point(x,y);
    }

    if (random(0, 100) > 20 * (5 - mountainDetail)) {
      let yy = random(0, 50)
      noStroke();
      fill(red(cloudColor), green(cloudColor), blue(cloudColor), random(50, 150));
      circle(x, altitude + yy, random(10, 40));
  
      let p = new StarParticle();
      p.position = createVector(x, altitude + yy)
      p.previousPosition = p.position.copy();
      p.maxSteps = iters + floor(random(-10, 5));
      p.targetColor = skyColor2;
      p.spread = 9.0;
      p.colorMerge = 0.98;
      particles.push(p);
    }
  }

 
  let cloudField = makeCloudField();
  
  drawField(cloudField, particles, iters + 5, skyColor)
  image(renderer, 0, 0);

  for (l of lRenderers) {
    image(l, 0, 0);
  }
}