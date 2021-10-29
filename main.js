song="";
song2="";
status1="";
leftwrist_x=0;
leftwrist_y=0;
rightwrist_x=0;
rightwrist_y=0;
score_leftwrist=0;
score_rightwrist=0;

function preload(){
song=loadSound("music2.mp3");
song2=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(400,500);
    webcam=createCapture(VIDEO);
    webcam.hide();
    canvas.center();
    posenet= ml5.poseNet(webcam,modelLoaded);
    posenet.on('pose',gotPoses);
}
  
function modelLoaded(){
console.log('model is loaded')

}

function gotPoses(results){
    if(results.length>0){
        //console.log(results);
        score_leftwrist=results[0].pose.keypoints[9].score;
        score_rightwrist=results[0].pose.keypoints[10].score;
      leftwrist_x=results[0].pose.leftWrist.x;
      leftwrist_y=results[0].pose.leftWrist.y;
      rightwrist_x=results[0].pose.rightWrist.x;
      rightwrist_y=results[0].pose.rightWrist.y
      console.log("leftwrist( "+ leftwrist_x + ","+ leftwrist_y+ ")" );
      console.log("rightwrist( "+ rightwrist_x + ","+ rightwrist_y+ ")" );
    }
}

function draw(){
image(webcam,0,0,400,500); 
fill("red");
stroke("crimson");
if(score_leftwrist>0.2){
    circle(leftwrist_x, leftwrist_y, 20);
    if(song.isPlaying()==true){
        song.stop();
        song2.play();
            }
}

if(score_rightwrist>0.2){
    circle(rightwrist_x, rightwrist_y, 20);
    if(song2.isPlaying()==true){
        song2.stop();
        song.play();
            }
}
}

