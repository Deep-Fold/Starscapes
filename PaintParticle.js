function Particle() {
	this.position = createVector(random(width), random(height));
	this.previousPosition = this.position.copy();
	this.motion = createVector(0, 0);
	this.acceleration = createVector(0, 0);
	this.maxMotion = 6;
	this.steps = 0;
	this.maxSteps = 40;
	this.color = getPixel(this.position.x, this.position.y);

	this.update = function() {
		this.motion.add(this.acceleration);
		this.motion.limit(this.maxMotion);
		this.position.add(this.motion);
		this.acceleration.mult(0);
		this.steps += 1;
	}

	this.applyField = function(vectors) {
		var x = floor(this.position.x / particleScl);
		var y = floor(this.position.y / particleScl);
		var index = x + y * cols;
		var force = vectors[index];

		if (force) {
			if (this.position.x < width && this.position.x > 0) {
				if (this.position.y < height && this.position.y > 0) {
					let c = getPixel(this.position.x, this.position.y);					
					this.color = c;
				}
			}
		}

		this.applyForce(force);
	}

	this.applyForce = function(force) {
		this.acceleration.add(force);
	}

	this.draw = function() {
		if (this.color != null ) {
			let sclFactor = (1.0-(this.steps/this.maxSteps))

			stroke(this.color);
			fill(this.color)
			strokeWeight(particleScl*sclFactor);
			if (modeLines) {
				line(this.position.x, this.position.y, this.previousPosition.x, this.previousPosition.y);
			} else {
				for (let i = 0; i < 3; i++) {
					circle(this.position.x + random(-10, 10), this.position.y  + random(-10, 10), particleScl * sclFactor * random(0.2, 2.5))
				}
			}
		}
		this.updatePrev();
	}

	this.updatePrev = function() {
		this.previousPosition.x = this.position.x;
		this.previousPosition.y = this.position.y;
	}
}