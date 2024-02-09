let mic, recorder, soundFile, vSlider, recBool, cnv, cnvDiv, statusTag, questionsTag;
let startBtn, stopBtn, nextBtn;
let ctr = 1;

// // One-liner to resume playback when user interacted with the page.
// document.querySelector('button').addEventListener('click', function() {
//     context.resume().then(() => {
//       console.log('Playback resumed successfully');
//     });
//   });


let questionsDict ={
    1: "What differences, if any, did you notice in your movements during the improvisation with the OCSM matrix compared to your usual dance style?",
    2: "In what ways, if any, did the OCSM matrix influence your choice of movements or sequences?",
    3: "How would you describe the impact of the OCSM matrix on your dance performance?",
    4: "Were there any moments in the improvisation that you found particularly meaningful or expressive?",
    5: "Were there any moments during the improvisation that surprised you or your partner, especially in relation to the OCSM matrix?",
    6: "Were there any aspects of the dance that evolved differently than you anticipated due to the OCSM matrix?",
    7: "How did you apply your dance skills and techniques during the improvisation with the OCSM matrix?",
    8: "Did the OCSM matrix play a role in the way you incorporated specific dance movements or techniques?",
    9: "Can you describe how you communicated or interacted with your partner creatively while using the OCSM matrix?",
    10: "Did the OCSM matrix framework influence your ability to anticipate and respond to changes in the dance?",
    11: "How did you feel about the dance improvisation process with the OCSM matrix?",
    12: "Did using the OCSM matrix affect your level of engagement or motivation during the improvisation? In what way?"
}


function setup() {
    getAudioContext().suspend();

    cnv = createCanvas(800, 400);
    cnvDiv = select("#canvas");
    cnv.id('cnv');
    cnv.parent(cnvDiv);
    background(50);
    textSize(30);
    textWrap(WORD);
    fill("white");




    recBool  = false;

    startBtn = select("#start");
    startBtn.mousePressed(record);
    statusTag = select("#status");
    questionsTag = select("#qs")

    stopBtn = select("#stop");
    stopBtn.mousePressed(stop);

    nextBtn = select("#next");
    nextBtn.mousePressed(next);
    nextBtn.hide();

    
    mic = new p5.AudioIn();
    mic.start();
    recorder = new p5.SoundRecorder();
    recorder.setInput(mic);
    soundFile = new p5.SoundFile();
}

function draw(){
    background(50);
    let qstr = 'Question '+ ctr.toString() +":"
    text(qstr, width/20, 50);
    text(questionsDict[ctr], width/20, height/4, width-50);
    // console.log(questionsDict[1]);
    // print("Frame:",frameCount)

}

function record(){
    if (mic.enabled) {
        statusTag.html("Now recording, click 'STOP' when done...");
        recorder.record(soundFile);
        recBool = true;
        
    }

}

function stop(){
    if (recBool) {
        statusTag.html("Recording stopped, click 'Next' to answer next question...");
        nextBtn.show()
        recorder.stop();
        recBool = false;
        
    }

}

function next(){
    // soundFile.play();
    let fnm = 'Q'+ ctr.toString()+".wav"
    save(soundFile, fnm);
    nextBtn.hide();
    statusTag.html("Click 'START' to record...");
    ctr += 1;

}

function mousePressed() {
    userStartAudio();
}

