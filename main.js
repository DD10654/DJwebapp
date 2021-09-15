song = "";
end_of_time = "";
let_it_go = "";
peter_pan = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRight = 0;
scoreLeft = 0;

function preload() {
    end_of_time = loadSound("end.mp3");
    let_it_go = loadSound("let.mp3");
    peter_pan = loadSound("peter.mp3");
    song = document.getElementById("name").value;

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    PoseNet = ml5.poseNet(video, modelLoaded)
    PoseNet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if (scoreRight > 0.02) {
        circle(rightWristX, rightWristY, 20);
        //start

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }

        else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }

        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }

        else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    //end
    }
    if (scoreLeft > 0.02) {
        circle(leftWristX, leftWristY, 20);
        tempLeft = Number(leftWristY);
        newLeftwristY = floor(tempLeft);
        volume = newLeftwristY / 500;
        document.getElementById("vol").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play1() {
    song = document.getElementById("name").value;


    if (song == "end_of_time") {
        end_of_time.play();
        let_it_go.stop();
        peter_pan.stop();
    }

    else if (song == "let_it_go") {
        end_of_time.stop();
        let_it_go.play();
        peter_pan.stop();
    }

    else if (song == "peter_pan") {
        end_of_time.stop();
        let_it_go.stop();
        peter_pan.play();
    }
}

function stop1() {
    end_of_time.stop();
    let_it_go.stop();
    peter_pan.stop();
}

function pause1() {
    if (song == "end_of_time") {
        end_of_time.pause();
        let_it_go.stop();
        peter_pan.stop();
    }

    else if (song == "let_it_go") {
        end_of_time.stop();
        let_it_go.pause();
        peter_pan.stop();
    }

    else if (song == "peter_pan") {
        end_of_time.stop();
        let_it_go.stop();
        peter_pan.pause();
    }
}

function modelLoaded() {
    console.log("Model Loaded!")
}

function gotPoses(result) {
    if(result.length > 0){
        console.log(result);
        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
        console.log("The Left Wrist X is " + leftWristX + " and the Y is " + leftWristY + ".");
        console.log("The Right Wrist X is " + rightWristX + " and the Y is " + rightWristY + ".");
        scoreLeft = result[0].pose.keypoints[9].score;
        scoreRight = result[0].pose.keypoints[10].score;
        console.log("Score Left is - " + scoreLeft + ", and Right is - " + scoreRight);
    }
}

