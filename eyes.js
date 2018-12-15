/*for About-face from https://codepen.io/mattah/pen/VjNdPR */
var config = {
  returnSpeed: 0.4
};

function r2d(r) {
  return 180 / Math.PI * r;
}

function random(min, max) {
  return min + (max - min) * Math.random();
}

/* get left pupil*/
var leftPupil=document.querySelector(".eye#left .pupil");
/* get left pupil's style*/
var myStyle=window.getComputedStyle(leftPupil, null).transform;
/* get left pupil's left transform (it's value is actually always 50)*/
var iX = parseInt((myStyle.split(","))[4]);
/* get left pupil's top transform (it's value is actually always 50)*/
var iX = parseInt((myStyle.split(","))[5]);
//console.log(iX);


var hideLeft = document.querySelector("#hideLeft");
var hideRight = document.querySelector("#hideRight");
var hideTop = document.querySelector("#hideTop");
var hideBottom = document.querySelector("#hideBottom");

//variables used to control the 4 divs
var leyeRight = false;
var leyeLeft = false;
var leyeUp = false;
var leyesDown = false;

/**
* Eye model object
* -----------------------------
*/
function Eye(sel) {
  // dom
  this.eye = document.querySelector(sel);
  this.pupil = this.eye.children[0];
  this.lid = this.eye.children[1];

  // widths
  this.ew = this.eye.offsetWidth;
  this.pw = this.pupil.offsetWidth;

  // centered position for the eye white
  this.cx = this.eye.getBoundingClientRect().right - this.ew/2;
  this.cy = this.eye.getBoundingClientRect().bottom - this.ew/2;

  //centered position for the eye pupil
  this.px = this.eye.getBoundingClientRect().right - this.ew/2;
  this.py = this.eye.getBoundingClientRect().bottom - this.ew/2;

  // state
  this.bLidUp = true;
}



Eye.prototype.movePupil = function(r, theta) {
  var x, y;

  if (r > 1) r = 1; // clamp
  r *= (this.ew/2 - this.pw/2); // restrict edge of pupil to edge of eye

  // convert polar to rectangular
  // x = r * Math.cos(theta) + (this.ew - this.pw)/2;
  // y = r * Math.sin(theta) + (this.ew - this.pw)/2;
  this.px = r * Math.cos(theta) + (this.ew - this.pw)/2;
  this.py = r * Math.sin(theta) + (this.ew - this.pw)/2;

  // this.pupil.style.transform = 'translateX(' + x + 'px)' +
  //                               'translateY(' + y + 'px)';

  this.pupil.style.transform = 'translateX(' + this.px + 'px)' +
                                'translateY(' + this.py + 'px)';

}

Eye.prototype.isRight = function(){

}

Eye.prototype.blink = function() {
  if (this.bLidUp) {
    this.bLidUp = false;
    this.lid.style.transform = 'translateY(80%)';
  } else {
    this.bLidUp = true;
    this.lid.style.transform = 'translateY(0%)';
  }
}


/**
* pupil-mouse tracking and draw
* -----------------------------
*/
var leye = new Eye('.eye#left'),
    reye = new Eye('.eye#right'),
    eyes = [leye, reye], // array of eyes to move
    eyeCount = eyes.length,
    wrapper = document.getElementsByClassName('wrapper')[0], // boundary container
    R = 0, //todo: capitalized vars typically constants
    THETA = 0,
    wrapperWidth = wrapper.offsetWidth,
    wrapperHeight = wrapper.offsetHeight,
    bMouseOver = false;

/**
* update the computed pupil (polar) coordinates given a mouse event
* treat bbox as circumscribed by a bounding circle for more
* intuitive pupil movement
*/
function updateEyes(event) {
  var mx = event.pageX, //xpos of mouse
      my = event.pageY, //ypos of mouse
      width = window.innerWidth, //width of web page
      height = window.innerHeight; //height of web page

  var x, y, bboxWidth, bboxHeight, bbRadius;

  bMouseOver = true;

  // center x, y
  x = mx - width/2;
  y = my - height/2;

  // get bbox bounds
  bboxWidth = wrapperWidth;
  bboxHeight = wrapperHeight;
  bbRadius = Math.sqrt(Math.pow(bboxWidth,2) + Math.pow(bboxHeight, 2)) /2;

  // computer,  theta
  R = Math.sqrt(Math.pow(x,2) + Math.pow(y,2)) / bbRadius;
  THETA = Math.atan2(y,x);

}

function returnToNeutral() {
  bMouseOver = false;
}

/* draw pupil updates on animation frame */
function draw() {
  window.requestAnimationFrame(draw);

  // reduce R if mouse isn't on screen
  var dr = config.returnSpeed;
  if (!bMouseOver && R!==0) {
    dr = (Math.abs(R) < 0.01) ? 0.01 : R * dr;
    R -= dr;
  }

  // move all eyes
  for (var e=0; e<eyes.length; e++) {
    eyes[e].movePupil(R, THETA);
  }

  //if left eye's pupil position goes to more than 50px comparing to its orignal position, flag the boolean variable
  if(leye.px-iX > 5){
    leyeRight = true;
    hideRight.style.display = "block";
  }else{
    leyeRight = false;
    hideRight.style.display = "none";
  }

  if(leye.px-iX < -5){
    leyeLeft = true;
    hideLeft.style.display = "block";
  }else{
    leyeLeft = false;
    hideLeft.style.display = "none";
  }

// if(leye.py-iY>5){
//   leyesDown = true;
//   hideBottom.style.display = "block";
// }else{
//   leyesDown = false;
//   hideBottom.style.diplay = "none";
// }

  console.log(leyeRight);
}

draw();

function showIt() {
  document.getElementById("hideBottom").style.display = "block";
}
setTimeout("showIt()", 5000); // after 5 sec
/**
* add eye
* -----------------------------
*/
// function addEye() {
//   var newEye = document.createElement('div'),
//       newPupil = document.createElement('div'),
//       newLid = document.createElement('div');
//
//   // set class names of new nodes, and ID of eye
//   newPupil.className += ' pupil';
//   newLid.className += ' lid';
//   newEye.className += ' eye';
//   newEye.id = 'eye-' + (++eyeCount);
//
//   // Add new eye to dom
//   document.body.appendChild(newEye);
//   newEye.appendChild(newPupil);
//   newEye.appendChild(newLid);
//
//   // style eye
//   var x = random(-0.5, 0.5) * wrapperWidth,
//       y = random(-0.5, 0.5) * wrapperHeight,
//       scale = random(0.25, 0.9);
//   newEye.style.transform = 'translateX(' + x + 'px)' +
//                            ' translateY('+ y +'px)' +
//                            ' scale(' + scale + ')';
//
//   var eyeObj = new Eye('#' + newEye.id);
//   eyes.push(eyeObj);
// }


/**
* blinking
* -----------------------------
*/

/* logic */
function blinkLogic() {
  var r = Math.random();

  // single blink
  if (r<0.5) blinkEyes();

  // fast double blink
  else if (r<0.6) {
    blinkEyes();
    setTimeout(blinkEyes, 120);
  }

  // slow double blink
  else if (r < 0.8) {
    blinkEyes();
    setTimeout(blinkEyes, 500 + Math.random()*400);
  }
}

/* blink and unblink eyes */
function blinkEyes() {
  eyes.forEach(function(eye) {
    eye.blink();
  });
  setTimeout(function() {
    eyes.forEach(function(eye) {
      eye.blink();
    });
  }, 75);
}

/* check blink logic every 800 ms */
setInterval(blinkLogic, 3500);



/**
* Event handlers
*------------------------------------
*/

document.addEventListener('mousemove', updateEyes, false);

/* click action */
//document.addEventListener('click', addEye);

/* return eyes to neutral position */
document.addEventListener('mouseleave', returnToNeutral, false);

window.addEventListener('resize', function() {
  wrapperWidth = wrapper.offsetWidth;
  wrapperHeight = wrapper.offsetHeight;
});
