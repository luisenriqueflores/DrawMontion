
var myFont, fontReady = false;
var currentFrame=0;
var targetSpeed=20;
var speedIncrement=.05;
var waitTimeatSpeed=60*10;//10 seconds
var speed=3;
// Noise tends to look smoother with coordinates that are very close together
// These values will be multiplied by the x and y coordinates to make the
// resulting values very close together
let xScale = 0.015;
let yScale = 0.02;

let gap;
let offset;
var cont=0;
var circleMap=[];
var coords=[];
var dontChangeSpeed=false;
var frameCounter=0;

function preload() {
  myFont = loadFont('/assets/Roboto-Bold.ttf',()=>{fontReady = true;});
}

function setup() {

  
  createCanvas(windowWidth, windowHeight,WEBGL);
  audioPlayer = createAudio('/assets/audio.mp3');
  
  audioPlayer.attribute(
    'aria-description',
    'The playback speed of this audio player is controlled by the position of the mouse. The further to the right the mouse is, the faster the audio will play.'
  );
  //audioPlayer.showControls();
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
  //createBackground();
  changeColor();
  //let available_brushes = brush.box();
  // Set the stroke to a random brush, color, and weight = 1
  //  brush.set(random(available_brushes), random(palette), 1)
 //var d=dist( startx,starty, coords[i].x+offset, coords[i].y );
 // Draw a random flowLine (x, y, length, direction)
 //brush.flowLine(startx,starty, d, random(0,360))

}


function draw()
{
  translate(-width/2,-height/2)
  if (!fontReady) {
    return;
  }
  else{
    textFont(myFont,24);  
  }
  background(255); 
    
  if(freeze==true) {
    let available_brushes = brush.box();  
    brush.set("marker2", "black", 2);
    /*
    for(let i=0; i<available_brushes.length; i++)
    {
      text(available_brushes[i], 10, i*20); 
      brush.set(available_brushes[i], palette[0], 1);
      brush.flowLine(i*80,0, 100, 5);
    }
      */
    
    text("Click on the mouse to start", windowWidth/2, windowHeight/2); 
    return;
  }
  
  currentFrame+=speed;
  frameCounter++;    
  if(frameCounter == 1) //Push a coordinate every 10 frames
  {    
    frameCounter=0;
    if(mouseX>windowWidth || mouseY>windowHeight)  //outside the canvas boundaries
      coords.push({x:coords[coords.length-1].x, y:coords[coords.length-1].y,frame:currentFrame,color:lineColor,size:speed*1.5});
    else  
      coords.push({x:mouseX, y:mouseY,frame:currentFrame,color:lineColor,size:speed*1.5});
  }    

    
  if(dontChangeSpeed==false)
    speed +=speedIncrement;  

  if(dontChangeSpeed==false && (speed>=targetSpeed || speed<3)){
    dontChangeSpeed=true;
    setTimeout(()=> {speedIncrement=speedIncrement*-1;console.log("Calling changespped");dontChangeSpeed=false;       },2000);    
  }    

  background(255);
  noStroke();
  fill(0);  
  
  
  //text(circleMap.length, 10, 10);
  //text(currentFrame, 10, 10);
  //text("SPEED:"+speed, 10, 30);
  //text("targetSpeed:"+targetSpeed, 10, 60);
  //text("SpeedIncrement:"+speedIncrement, 10, 90);
  drawBG();
  drawLines();
}


let palette = ["#2c695a", "#4ad6af", "#7facc6", "#4e93cc", "#f6684f", "#ffd300"]
var freeze=true;
var lineColor=90;
function drawLines()
{  
  
 let newColor="";
  let startx=0;
  let starty=0;    
  let points=[];
  for(let i=0; i < coords.length-1; i++)
  {
    if(coords[i].frame+width>currentFrame)
    {
      //stroke(coords[i].color, 90, 90);     
      //strokeWeight(coords[i].size,);             
      //brush.stroke( coords[i].color, 90, 90 );
      let offset=coords[i].frame-currentFrame; 
      brush.strokeWeight(coords[i].size);
      brush.line( startx,starty, coords[i].x+offset, coords[i].y )
      points.push([coords[i].x+offset,coords[i].y]);
      startx=coords[i].x+offset;
      starty=coords[i].y;      
    }
  }
  
  //let points = [[30, 70], [85, 20], [130, 100], [180, 50]];
  //brush.spline(points, 0.5);
 
}

function changeColor()
{
  setTimeout(() => {
    lineColor=random(0, 255);  
    changeColor();
  }, (500));
  
}



function createBackground()
{
  gap = windowWidth/10;
  offset = cont+=100;
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

function mouseClicked() {
  if(freeze==true) {
    freeze=false;
    audioPlayer.play();
  }
  else{
    freeze=true;
    audioPlayer.pause();
  }
  
}



function drawBG(){
 
  gap = windowWidth/30;
  offset = cont+=1;
  if(cont>windowWidth) cont=0;
  // Loop through x and y coordinates, at increments set by gap
  for (let x = gap / 2; x < windowWidth*2; x += gap) {
    for (let y = gap / 2; y < windowHeight*2; y += gap) {
      // Calculate noise value using scaled and offset coordinates
      let noiseValue = noise((x + offset) * xScale, (y ) * yScale);
      let diameter = noiseValue * gap;      
      //circleMap.push({x:x, y:y, diameter:diameter});      
      var rand=random(0, 50).valueOf();
      fill(rand);    
      circle(x-cont, y, diameter);
    }
  }
  cont+=1;
  return;
  for (let i = 0; i < circleMap.length; i++) {
    if(cont>width) cont=0;
    if(circleMap[i].x-cont>width) continue;   
    circle(circleMap[i].x-cont, circleMap[i].y, circleMap[i].diameter);
  }
  cont+=20;
}