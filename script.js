var counter = {
  span : document.createElement("span"),
  start : function() {
    this.span.id= "countdown";
    this.span.innerText = "3";
    document.body.appendChild(this.span);
    var seconds = document.getElementById("countdown").textContent;
    var countdown = setInterval(function(){
      seconds--;
      document.getElementById("countdown").textContent = seconds;
      if (seconds <= 0) clearInterval(countdown);
      if (seconds == 0) document.getElementById("countdown").style.visibility = "hidden";
    }, 1000);
  }
};
var myMusic;
var image = {
  defaul: "./images/default.gif",
  cla: "./images/clap.gif",
  toTheLef: "./images/toTheLeft.gif",
  toTheRig: "./images/toTheRight.gif",
  leftFootSto: "./images/leftFootStomp.gif",
  rightFootSto: "./images/rightFootStomp.gif",
  slideToTheLe: "./images/slideToTheLeft.gif",
  slideToTheRi: "./images/slideToTheRight.gif",
  toTheBac:"./images/toTheBack.gif",
  toTheTo:"./images/toTheTop.gif",
  toTheFlo:"./images/totheFloor.gif",
  handsOnKne:"./images/handsOnYourKnees.gif",
  crissCros:"./images/crissCross.gif",
  revers:"./images/reverse.gif",
  charlieBrow:"./images/charlieBrown.gif",
  chaCh:"./images/chaCha.gif",
  hopp:"./images/hop.gif",
  turnAroun: "./images/turnAround.gif",
};
var myGamePiece;
var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 800;
    this.canvas.height = 900;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.play = setTimeout(updateGameArea,0);
    this.playb = setTimeout(updatePlayGame,0);
    this.interval = setInterval(updateGameArea, 2000); // 2 sec
    this.intervall = setInterval(updateGamePArea, 40); // 2 msec
    this.intervalll = setInterval(updatePlayGame, 252000); //period of 4:12
    this.score = 0;
    document.body.style.opacity = "0.8";
    document.body.style.backgroundImage = "url('IMG_0208.jpg')";
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};
var myScore;
var localStorageName = "gameHScore";
var highScore;
highScore = localStorage.getItem(localStorageName) == null ? 0 :
            localStorage.getItem(localStorageName);
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
};
function component(width, height, color, x, y, type, text, keyVal) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  };
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.text = text;
  if(text == "Score: "){
    this.text = "Score: " + myGameArea.score;
  }else if (text == "High Score: ") {
    this.text = "Score: " + highScore;
  };
  this.keyval = keyVal;

  this.update = function(){
    ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    }else if (type == "image") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    }else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function(x,y){
    this.x = x;
    this.y = y;
  };
  this.scoreUp = function(source){

    document.addEventListener("keydown", listener);
    setTimeout(pau ,2000);

    function listener(e){
      var x = e.keyCode;
      if( x == keyVal ){
        myGameArea.score += 10;
        myGamePiece.image.src = source;
        document.removeEventListener("keydown", listener);
      }else{
        document.removeEventListener("keydown", listener);
        document.body.style.backgroundImage='none';
        document.body.style.backgroundColor = "red";
        setTimeout(Cha, 100);
      }
    }
    function pau(){
      document.removeEventListener("keydown", listener);
      myGamePiece.image.src = image.defaul;
    }
    function Cha(){
      document.body.style.backgroundColor = "";
      document.body.style.backgroundImage = "url('IMG_0208.jpg')";
    }
  };
}
function startGame() {
  myGameArea.start();

  myScore = new component("30px", "Consolas", "white", 650, 30,"text", "Score: ");
  myHighScore = new component("30px", "Consolas", "white", 585, 60,"text", "High Score: ");

  myMusic = new sound("Dj Casper Cha Cha Slide.mp3");
  myMusic.play();

  myGamePiece = new component(275, 375, image.defaul, 275, 500, "image");

  toTheLeft= new component(120, 120, "left.png", 350, 100, "image", "NULL",37);
  toTheRight= new component(120, 120, "right.png", 350, 100, "image","NULL" ,39);
  toTheTop= new component(120, 120, "up.png", 350, 100, "image", "NULL" ,38);
  totheFloor= new component(120, 120, "down.png", 350, 100, "image", "NULL" ,40);
  slideToTheRight= new component("120px", "Consolas", "yellow", 375, 200, "text", "A", 65);
  slideToTheLeft= new component("120px", "Consolas", "yellow", 375, 200, "text", "D", 68);
  rightFootStomp= new component("120px", "Consolas", "yellow", 375, 200, "text", "W", 87);
  leftFootStomp= new component("120px", "Consolas", "yellow", 375, 200, "text", "S", 83);
  hop= new component("100px", "Consolas", "yellow", 300, 200, "text","Enter", 13);
  chaCha= new component("120px", "Consolas", "yellow", 375, 200, "text", "F", 70);
  charlieBrown= new component("100px", "Consolas", "yellow", 300, 200, "text", "Shift", 16);
  clap= new component("100px", "Consolas", "yellow", 300, 200, "text", "Space", 32);
  crissCross= new component("120px", "Consolas", "yellow", 375, 200, "text", "J", 74);
  reverse= new component("120px", "Consolas", "yellow", 375, 200, "text", "K", 75);
  turnaround= new component("120px", "Consolas", "yellow", 375, 200, "text", "L", 76);
  toTheBack= new component("120px", "Consolas", "yellow", 375, 200, "text", "H", 72);
  handsOnYourKnees= new component("120px", "Consolas", "yellow", 375, 200, "text", "G", 71);
};
function updateGameArea() {
  myGameArea.clear();
  myScore.text = "Score: " + myGameArea.score;
  myScore.update();
  myHighScore.text = "High Score: " + highScore;
  myHighScore.update();
};
function updateGamePArea(){
  myGamePiece.update();
}
function updatePlayGame () {
  setTimeout(clapM,24000);
  setTimeout(clapM,26000);
  setTimeout(clapM,28000);
  setTimeout(clapM,30000);
  setTimeout(toTheLeftM,33000);
  setTimeout(toTheBackM,35000);
  setTimeout(hopM,37000);
  setTimeout(rightFootStompM,39000);
  setTimeout(leftFootStompM,41000);
  setTimeout(chaChaM,43000);
  setTimeout(chaChaM,45000);
  setTimeout(turnAroundM,47000);
  setTimeout(getHighScore,47000);

  setTimeout(toTheLeftM,49000);
  setTimeout(toTheBackM,51000);
  setTimeout(hopM,53000);
  setTimeout(rightFootStompM,55000);
  setTimeout(leftFootStompM,57000);
  setTimeout(chaChaM,59000);
  setTimeout(getHighScore,60000);

  setTimeout(toTheRightM,63000);
  setTimeout(toTheLeftM,65000);
  setTimeout(toTheBackM,67000);
  setTimeout(hopM,69000);
  setTimeout(hopM,71000);
  setTimeout(rightFootStompM,73000);
  setTimeout(leftFootStompM,75000);
  setTimeout(slideToTheLeftM,78000);
  setTimeout(slideToTheRightM,80000);
  setTimeout(crissCrossM,82000);
  setTimeout(crissCrossM,84000);
  setTimeout(chaChaM,86000);
  setTimeout(getHighScore,87000);

  setTimeout(toTheLeftM,91000);
  setTimeout(toTheBackM,93000);
  setTimeout(hopM,95000);
  setTimeout(hopM,97000);
  setTimeout(rightFootStompM,99000);
  setTimeout(leftFootStompM,101000);
  setTimeout(handsOnYourKneesM,103000);
  setTimeout(handsOnYourKneesM,105000);
  setTimeout(handsOnYourKneesM,107000);
  setTimeout(handsOnYourKneesM,109000);
  setTimeout(handsOnYourKneesM,111000);
  setTimeout(chaChaM,113000);
  setTimeout(turnAroundM,115000);
  setTimeout(turnAroundM,117000);
  setTimeout(getHighScore,117000);

  setTimeout(toTheLeftM,118000);
  setTimeout(toTheBackM,120000);
  setTimeout(hopM,122000);
  setTimeout(hopM,124000);
  setTimeout(rightFootStompM,127000);
  setTimeout(leftFootStompM,129000);
  setTimeout(rightFootStompM,131000);
  setTimeout(leftFootStompM,133000);
  setTimeout(rightFootStompM,135000);
  setTimeout(leftFootStompM,137000);
  setTimeout(clapM,142000);
  setTimeout(clapM,144000);
  setTimeout(clapM,146000);
  setTimeout(getHighScore,146000);

  setTimeout(totheFloorM,148000);
  setTimeout(totheFloorM,150000);
  setTimeout(totheFloorM,152000);
  setTimeout(totheFloorM,154000);
  setTimeout(toTheTopM,156000);
  setTimeout(toTheTopM,158000);
  setTimeout(hopM,161000);
  setTimeout(rightFootStompM,163000);
  setTimeout(leftFootStompM,165000);
  setTimeout(chaChaM,167000);
  setTimeout(turnAroundM,171000);
  setTimeout(getHighScore,171000);


  setTimeout(toTheLeftM,173000);
  setTimeout(toTheBackM,175000);
  setTimeout(hopM,177000);
  setTimeout(hopM,180000);
  setTimeout(reverseM,182000);
  setTimeout(reverseM,184000);
  setTimeout(slideToTheLeftM,186000);
  setTimeout(slideToTheRightM,188000);
  setTimeout(reverseM,190000);
  setTimeout(reverseM,192000);
  setTimeout(chaChaM,194000);
  setTimeout(chaChaM,196000);
  setTimeout(chaChaM,198000);
  setTimeout(turnAroundM,201000);
  setTimeout(getHighScore,201000);

  setTimeout(toTheLeftM,203000);
  setTimeout(toTheBackM,205000);
  setTimeout(hopM,207000);
  setTimeout(hopM,209000);
  setTimeout(rightFootStompM,211000);
  setTimeout(leftFootStompM,213000);
  setTimeout(charlieBrownM,215000);
  setTimeout(charlieBrownM,217000);
  setTimeout(slideToTheLeftM,219000);
  setTimeout(slideToTheRightM,221000);
  setTimeout(toTheBackM,222000);
  setTimeout(chaChaM,224000);
  setTimeout(getHighScore,224000);
  /*
  setTimeout(toTheLeftM,3000);
  setTimeout(toTheRightM,6000);
  setTimeout(toTheTopM,9000);
  setTimeout(totheFloorM,12000);
  setTimeout(slideToTheRightM,15000);
  setTimeout(slideToTheLeftM,18000);
  setTimeout(rightFootStompM,21000);
  setTimeout(leftFootStompM,24000);
  setTimeout(clapM,27000);
  setTimeout(hopM,30000);
  setTimeout(chaChaM,33000);
  setTimeout(crissCrossM,37000);
  setTimeout(charlieBrownM,40000);
  setTimeout(turnAroundM,43000);
  setTimeout(handsOnYourKneesM,46000);
  setTimeout(toTheBackM,49000);
  setTimeout(reverseM,52000);
  setTimeout(getHighScore,53000);
  */
};
function toTheLeftM() {
  toTheLeft.update();
  toTheLeft.scoreUp(image.toTheLef);
};
function toTheRightM() {
  toTheRight.update();
  toTheRight.scoreUp(image.toTheRig);
};
function toTheTopM() {
  toTheTop.update();
  toTheTop.scoreUp(image.toTheTo);
};
function totheFloorM() {
  totheFloor.update();
  totheFloor.scoreUp(image.toTheFlo);
};
function slideToTheRightM(){
  slideToTheRight.update();
  slideToTheRight.scoreUp(image.slideToTheRi);
};
function slideToTheLeftM(){
  slideToTheLeft.update();
  slideToTheLeft.scoreUp(image.slideToTheLe);
};
function rightFootStompM(){
  rightFootStomp.update();
  rightFootStomp.scoreUp(image.rightFootSto);
};
function leftFootStompM(){
  leftFootStomp.update();
  leftFootStomp.scoreUp(image.leftFootSto);
};
function reverseM(){
  reverse.update();
  reverse.scoreUp(image.revers);
};
function hopM() {
  hop.update();
  hop.scoreUp(image.hopp);
};
function clapM() {
  clap.update();
  clap.scoreUp(image.cla);
};
function chaChaM() {
  chaCha.update();
  chaCha.scoreUp(image.chaCh);
};
function crissCrossM() {
  crissCross.update();
  crissCross.scoreUp(image.crissCros);
};
function charlieBrownM() {
  charlieBrown.update();
  charlieBrown.scoreUp(image.charlieBrow);
};
function turnAroundM() {
  turnAround.update();
  turnAround.scoreUp(image.turnAroun);
};
function handsOnYourKneesM() {
  handsOnYourKnees.update();
  handsOnYourKnees.scoreUp(image.handsOnKne);
};
function toTheBackM() {
  toTheBack.update();
  toTheBack.scoreUp(image.toTheBac);
};
function getHighScore() {
  highScore = Math.max(myGameArea.score, highScore);
  localStorage.setItem(localStorageName, highScore);
  //localStorage.setItem(localStorageName, 0);
}
function hideText() {
  var x = document.getElementById("introduction");
  x.style.display = "none";
}
