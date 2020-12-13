function StarParticle() {
	this.position = createVector(random(width), random(height));
	this.previousPosition = this.position.copy();
	this.motion = createVector(0, 0);
	this.acceleration = createVector(0, 0);
	this.maxMotion = 6;
	this.steps = 0;
	this.maxSteps = 15;
	this.color = getPixel(this.position.x, this.position.y);
	this.targetColor = color(255);
	this.spread = 2.0;
	this.scale = 1.0;
	this.colorMerge = 0.975;

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
					//this.color = c;
					if (c != null) {
						this.color = lerpColor(this.targetColor, c, this.colorMerge);
					}
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
			stroke(this.color);
			fill(this.color)
			let sclFactor = (1.0-(this.steps/this.maxSteps))
			strokeWeight(particleScl*sclFactor);
			if (modeLines) {
				line(this.position.x, this.position.y, this.previousPosition.x, this.previousPosition.y);
			} else {
				for (let i = 0; i < 3; i++) {
					circle(this.position.x + random(-this.spread, this.spread), this.position.y + random(-this.spread, this.spread), particleScl * sclFactor * random(0.5, 1.5) * this.scale)
				}
			}
		}
		this.updatePrevious();
	}

	this.updatePrevious = function() {
		this.previousPosition.x = this.position.x;
		this.previousPosition.y = this.position.y;
	}
}