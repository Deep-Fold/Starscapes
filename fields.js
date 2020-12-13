function makeSkyField() {
	let f = new Array(cols * rows);
	var yoff = 0;
	for (var y = 0; y < rows; y++) {
		var xoff = 0;
		for (var x = 0; x < cols; x++) {
			var index = x + y * cols;
			let n = noise(xoff, yoff) * TWO_PI;
			let vec = createVector(0,1);
	
			vec.rotate(n);
			f[index] = vec;
			xoff += inc;
		}
	  	yoff += inc;
	}
	return f;
}

function makeCloudCircles() {
	// let circles = [];
	// for(let y = 0; y < height; y+= 5) {
	// 	if (random(0, 100) > 99) {
	// 		// let w = random(50, 150)
	// 		// let h = random(10, 30)
	// 		// let x = random(0, width);
			
	// 		for (let i = 0; i < 50; i ++) {
	// 			let c = lerpColor(color(57, 49, 75), color(223, 246, 245), 1 - ((yy + h) / (h*2)) * random(0, 1))
	// 			// let yy = random(-h, h);
	// 			// let c = lerpColor(color(57, 49, 75), color(223, 246, 245), 1 - ((yy + h) / (h*2)) * random(0, 1))

	// 			// circles.push({
	// 			// 	"x": x + random(-w, w),
	// 			// 	"y": y + yy,
	// 			// 	"r": random(5, 30),
	// 			// 	"c": c
	// 			// })
	// 		}
	// 	}
	// }
	// return circles;
}

function makeCloudField() {
	let f = new Array(cols * rows);
	var yoff = 0;
	for (var y = 0; y < rows; y++) {
		var xoff = 0;
		for (var x = 0; x < cols; x++) {
			var index = x + y * cols;
			let n = noise(xoff, yoff) * TWO_PI;
			let vec = createVector(0,1);


			vec.rotate(n);
			f[index] = vec;
			xoff += inc * 2.0;
		}
	  	yoff += inc * 2.0;
	}
	return f;
}

function makeStarCircles() {
	let circles = []
	for(let i = 0; i < 35; i++) {
		let x = random(0, width)
		let y = random(0, height)
		let r = random(40, 200)
		let fits = true

		for (c of circles) {
			let from = createVector(x, y)
			let to = createVector(c.x, c.y)

			if (from.dist(to) < r + c.r) {
				fits = false
			}
		}

		if (fits) {
			circles.push({
				"x": x,
				"y": y,
				"r": r,
				"d": Math.sign(random(-1, 1))
			})
		}
	}
	return circles;
}

function makeStarField(circles) {
	let f = new Array(cols * rows);

	for (var y = 0; y < rows; y++) {
		for (var x = 0; x < cols; x++) {
			var index = x + y * cols;
			let v = createVector(5, 0);
			let pos = createVector(x * particleScl, y * particleScl);
			
			for (const c of circles ) {
				let cPos = createVector(c.x, c.y);
				if (cPos.dist(pos) < c.r) {
				let a = atan2(c.y - pos.y, c.x - pos.x);				
				v.rotate(a-HALF_PI+ (0.4 *c.d))

				f[index] = v;
				} 
			}
		}
	}
	return f;
}