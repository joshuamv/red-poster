//change these:
x = 100;
y = 105;

// create array to hold all particles
var pts = [];
var numPts;

function preload() {
	font = loadFont('fonts/TWKEverett-Bold.otf');
	font1 = loadFont('fonts/TWKEverett-Light.otf');
  }

function setup() {
	let posterHeight = windowHeight / 1.03
	createCanvas(posterHeight / 1.42, posterHeight);
	background(200, 10, 0);

	// create particles
	numPts = 10000;
	for (var i = 0; i < numPts; i++) {
		pts.push({}); // insert new object
		pts[i].idx = i; // give it an index
		initObj(pts[i]); // init object
	}
}

function draw() {

	//draw dots
	neuronsFire();

	//style
	noStroke();
	//mke opacity go up
	var titleOpacity = 1;
	if (frameCount % 60 == 0) {
		titleOpacity = titleOpacity + 3;
		console.log(titleOpacity);
	}
	fill(255, titleOpacity);
	textSize(100);
	textStyle(BOLD);
	angleMode(DEGREES);
	textFont(font);


	//title
	push();
		translate(width - 100, 0);
		rotate(90);
		text("Ukraine under invasion", 60, x);
	pop();

	textSize(50);
	fill(255);
	textStyle(NORMAL);
	stroke(150,0,0,0.1);
	strokeWeight(5);
	
	textFont(font1);

	text(`10  /  03  /  22`,
		305, height-y);

	textSize(20);
	text(`20  :  00                              Rabin Square`,
	-2, height-y*1.8);

	textSize(20);
	text(`We protest Putin's invasion of Ukraine`,
		100, height-(y*6));


	fill(255,4);

	textSize(20);
	text(`More than 2000 civilians killed`,
		100, height-(y*7));

	textSize(20);
	text(`Hospitals targeted by missiles`,
		100, height-(y*8));

	textSize(20);
	text(`Almost 2 million refugees`,
		100, height-(y*9));

	textSize(20);
	text(`Possible use of thermobaric weapons`,
		100, height-(y*10));


}


///functions///

function neuronsFire() {
	// update particle
	for (var i = 0; i < pts.length; i++) {
		updateObj(pts[i]);
	}
	// draw particle
	for (var i = 0; i < pts.length; i++) {
		drawObj(pts[i]);
	}
}

// set initial random parameters to a particle
function initObj(obj) {
	obj.x = random(width);
	obj.y = random(height);
	obj.w = random(1.001, 1.01);
	obj.c = [random(100, 250), random(20, 50), random(3, 5)];

}

function updateObj(obj) {

	var noiseScl = 0.0016;
	var screenScl = 10;

	// move the particle on each axis by mapping the noise function, with its current position.
	// try different variations to get different landscapes
	// try applying a similar formula to particle size (obj.w) and color array (obj.c)
	obj.x += map(noise(234 + obj.y * noiseScl, -947 + obj.x * noiseScl), 0, 1, -screenScl, screenScl);
	obj.y += map(noise(-123 + obj.x * noiseScl, 655 + obj.y * noiseScl), 0, 1, -screenScl, screenScl);

	// maintain screen edges (wrap around)
	if (obj.x > width) obj.x = 0;
	if (obj.x < 0) obj.x = width;
	if (obj.y > height) obj.y = 0;
	if (obj.y < 0) obj.y = height;
}


function drawObj(obj) {
	stroke(obj.c[0], obj.c[1], obj.c[2]);
	strokeWeight(obj.w);
	point(obj.x, obj.y);
}