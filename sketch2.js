var currentFrame=0;
var speed=1;
// Noise tends to look smoother with coordinates that are very close together
// These values will be multiplied by the x and y coordinates to make the
// resulting values very close together
let xScale = 0.015;
let yScale = 0.02;

let gapSlider;
let gap;
let offsetSlider;
let offset;
var cont=0;
var circleMap=[];
var coords=[];
function setup() {
  createCanvas(400, 400);

  // Draw the grid
  background(255);
  noStroke();
  fill(0);
  background(0);

  // Set width of the lines
  strokeWeight(10);

  // Set color mode to hue-saturation-brightness (HSB)
  colorMode(HSB);
  // Get the current gap and offset values from the sliders
  createBackground()
}

function draw()
{
  if(currentFrame==2000) end();
  background(255);
  noStroke();
  fill(0);
  
  strokeWeight(10);  
  colorMode(HSB);  
  coords.push({x:mouseX, y:mouseY,px:pmouseX,py:pmouseY,frame:currentFrame});
  if(coords.length==0) return;
  
  for(let i=0; i < coords.length-1; i++)
  {
    if(coords[i].frame+width>currentFrame)
    {
      let offset=coords[i].frame-currentFrame;
      let lineHue = coords[i].x - coords[i].y;
      stroke(lineHue, 90, 90);          
      line(coords[i].px+offset, coords[i].py, coords[i].x+offset, coords[i].y)
    }
  }
  
  text(currentFrame, 10, 10);
  text(speed, 10, 30);
  


  currentFrame+=speed;
}

function createBackground()
{
  gap = 2;
  offset = cont+=10;
  // Loop through x and y coordinates, at increments set by gap
  for (let x = gap / 2; x < width*2; x += gap) {
    for (let y = gap / 2; y < height*2; y += gap) {
      // Calculate noise value using scaled and offset coordinates
      let noiseValue = noise((x + offset) * xScale, (y ) * yScale);
      let diameter = noiseValue * gap;
      circleMap.push({x:x, y:y, diameter:diameter});      
    }
  }
}

function mouseMoved() {
  
  
}

function drawBG(){
 
  for (let i = 0; i < circleMap.length; i++) {
    if(cont>width) cont=0;
    if(circleMap[i].x-cont>width) continue;   
    circle(circleMap[i].x-cont, circleMap[i].y, circleMap[i].diameter);
  }
  cont+=60;
}