
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
  
// function randomRule() {
//   let ruleArr = ["X", "F", "+", "-", "A"]
//   let rule = "F"
//   let openedBrackets = 0

//   for (let i = 0; i < getRandomInt(5)+5; i++) {
//     rule += ruleArr[Math.floor(Math.random() * ruleArr.length)];
//     if (getRandomInt(100) > 40) {
//       openedBrackets += 1
//       rule += "["
//     }

//     if (getRandomInt(100) > 40 && openedBrackets > 0) {
//       openedBrackets -= 1
//       rule += "]"
//     }
//   }

//   for (let i = 0; i < openedBrackets; i++) {
//     rule += "]"
//   }
//   return rule;
// }

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//   }
// }

// function getRandomLRules() {
//   let props = ["F", "+", "-", "F", "+", "-", "A"]
//   let rules = {
//     "X": randomRule()
//   }

//   for (let i = 0; i < 2; i++) {
//     shuffleArray(props);
//     let prop = props.pop();
//     rules[prop] = randomRule();
//   }

//   console.log(rules);
//   return rules;

//   // return {
//   //   "X": ruleX,
//   //   "F": "FF"
//   // }
// }
  
function getRules() {
	// return {
	//   "X": "S+[[X]-X]-S[-SFX]+X",
	//   "S": "S"
	// }
	return {
		"X": "S[+X]S[-X]+X",
		"S": "SS"
	}
}
  
function lSystem(iters = 2, a= null) {
	let axiom = "X"
	if (a) {
		axiom = a;
	}
	//let rules = getRandomLRules();
	let rules = getRules();
	
	for (let i = 0; i < iters; i++) {
		axiom = getNewAxiom(axiom, rules);
	}
	return axiom;
}
  
function drawAxiom(origin, a, aScl, colblend) {
	let cursorPos = origin.copy();
	// let o = origin.copy();
	let cursorRot = PI;
	
	let savedPos = [];
	let savedRot = [];

	let renderer1 = createGraphics(width, height);
	let renderer2 = createGraphics(width, height);

	renderer1.noStroke();
	renderer2.noStroke();
	for (var i = 0; i < a.length; i++) {
		let c = a.charAt(i);
		switch(c) {
			case "F":
				let c = lerpColor(color(142, 71, 140), color(255, 174, 182), random(0, 1));
				c = lerpColor(c, skyColor, colblend);
				renderer1.fill(red(c), green(c), blue(c), random(30, 150))
				for(let i = 0; i < 10; i++) {
					renderer1.circle(cursorPos.x + random(-5, 5) * aScl, cursorPos.y  + random(-5, 5) * aScl, 10.0*aScl * random(0.1, 1.0) * random(0.1, 1.0))
				}
				// circle(cursorPos.x ,cursorPos.y, 10.0*aScl)
				break;
		
			case "S":
				//let d = o.dist(cursorPos);
				//let l = pow(10.0 / (d+1), 0.7) * 20.0;


				// stroke(0)
				// strokeWeight(1.0 * aScl)
				let posShift = createVector(0, 10*aScl ).rotate(cursorRot);
				// renderer.line(cursorPos.x, cursorPos.y, , cursorPos.y + posShift.y);


				let c2 = lerpColor(color(60, 89, 86), color(57, 123, 68), random(0, 1));
				c2 = lerpColor(c2, skyColor, colblend);
				renderer2.fill(red(c2), green(c2), blue(c2), random(30, 150))
				for(let i = 0; i < 30; i++) {
					let interpolate = random(0.0, 1.0);
					let xPos = lerp(cursorPos.x, cursorPos.x + posShift.x, interpolate)
					let yPos = lerp(cursorPos.y, cursorPos.y + posShift.y, interpolate)


					renderer2.circle(xPos+ random(-1, 1) * aScl, yPos+ random(-1, 1) * aScl, 2.0*aScl * random(0.1, 1.0))
				}

				cursorPos.add(posShift);
				break;
		
			case "+":
				cursorRot += PI*.25;
				break;
		
			case "-":
				cursorRot -= PI*.25;
				break;
		
			case "[":
				savedPos.push(cursorPos.copy());
				savedRot.push(cursorRot);
				break;
		
			case "]":
				cursorPos = savedPos.pop();
				cursorRot = savedRot.pop();
				break;
		}
	}
	renderer2.image(renderer1, 0, 0);
	return renderer2;
}
	
function getNewAxiom(a, r) {
	let newA = "";
	for (var i = 0; i < a.length; i++) {
		let c = a.charAt(i);
		if (c in r) {
		newA += r[c];
		} else {
		newA += c;
		}
	}
	return newA;
}