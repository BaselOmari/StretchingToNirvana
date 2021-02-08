
let video;
let poseNet;
let pose;
let skeleton;
let moves = ['t','w','m'];
let ind = 0;
let cycle = 0;

let brain;
let poseLabel = "x";
var triangle_img;
var mountain_img;
var warrior_img;

let timer = 15;

function setup() {
  triangle_img = loadImage('Triangle.jpg');
  mountain_img = loadImage('Mountain.jpg');
  warrior_img = loadImage('Warrior.png');
  
  createCanvas(1200, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    inputs: 34,
    outputs: 3,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'model.json',
    metadata: 'model_meta.json',
    weights: 'model.weights.bin',
  };
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  console.log('Stretching to Nirvana Ready!');
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  
  if (results[0].confidence > 0.75) {
    poseLabel = results[0].label;
  }
  else{
    poseLabel = "x";
  }
  //console.log(results[0].confidence);
  classifyPose();
}


function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('PoseNet ready');
}

function draw() {
  background(255);
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(3);
      stroke(173,217,230);

      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(173,217,230);
      stroke(0);
      ellipse(x, y, 16, 16);
    }
  }
  pop();

  let m = moves[ind % 3];
  
  // fill(255, 255, 0);
  // noStroke();
  // textSize(64);
  // textAlign(LEFT, CENTER);
  // text(poseLabel, 20,50);
  if (poseLabel == m){
    fill(0, 255, 0);
  //noStroke();
  textSize(40);
  textAlign(LEFT, CENTER);
    textStyle(BOLD)
    text ('Nice Job!',20,70)
  } else {
    fill(255, 0, 0);
  noStroke();
  textSize(35);
  textAlign(LEFT, CENTER);
    textStyle(BOLD)
    text ('Follow Image \n on the Right',20,70)
  }
  interface(m);
  
  if (frameCount % 60 == 0 && timer > 0 && poseLabel == m) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
    console.log (timer);
  } 
  
  if (timer == 0){
    ind++;
    timer = 15;
  }
  
//   if(ind % 3 == 0 && ind != 0) {
//     cycle++
    
//   }
  
  
  fill (0);
  noStroke();
  textSize(40);
  textAlign(CENTER, CENTER);
  text(timer, 570, 50);
  
  // fill (0);
  // noStroke();
  // textSize(40);
  // textAlign(CENTER, CENTER);
  // if (cycle % 2 == 1){
  //   text('Switch Sides', 500, 430);
  // }
  
  
  
  
}

function interface(label){
  let name;
  let img;
  if (label == 'm'){
    name = 'Mountain';
    img = mountain_img;
  } else if (label == 't'){
    name = 'Triangle';
    img = triangle_img;
  } else if (label == 'w'){
    name = 'Warrior';
    img = warrior_img;
  }
  fill (0);
  noStroke();
  textSize(32);
  textAlign(CENTER, CENTER);
  text(name + " Pose", 920, 60);
  
  image(img,640, 105, 560,373);
  
}