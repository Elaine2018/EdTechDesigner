var wrapperEl =document.querySelector('.wrapper')
var photoShow = document.querySelector('.photoshow');

function show (box, content) {
  box.addEventListener('click', function() {
  for(var i = 0; i < photoShow.length; i++) {
    clearActive(photoShow[i])
  }
    wrapperEl.classList.add('active');
      content.classList.add('active');
  })
}

show(document.querySelector('#USA'), document.querySelector('.picUSA'));
show(document.querySelector('#Canada'), document.querySelector('.picCanada'));
show(document.querySelector('#Spain'), document.querySelector('.picSpain'));
show(document.querySelector('#France'), document.querySelector('.picFrance'));
show(document.querySelector('#Germany'), document.querySelector('.picGermany'));
show(document.querySelector('#Norway'), document.querySelector('.picNorway'));
show(document.querySelector('#Italy'), document.querySelector('.picItaly'));
show(document.querySelector('#Denmark'), document.querySelector('.picDenmark'));
show(document.querySelector('#Austria'), document.querySelector('.picAustria'));
show(document.querySelector('#Croatia'), document.querySelector('.picCroatia'));
show(document.querySelector('#China'), document.querySelector('.picChina'));
show(document.querySelector('#SouthKorea'), document.querySelector('.picSouthKorea'));
show(document.querySelector('#Japan'), document.querySelector('.picJapan'));
show(document.querySelector('#Indonesia'), document.querySelector('.picIndonesia'));
show(document.querySelector('#Vietnam'), document.querySelector('.picVietnam'));
show(document.querySelector('#Cambodia'), document.querySelector('.picCambodia'));
show(document.querySelector('#Thailand'), document.querySelector('.picThailand'));
show(document.querySelector('#Australia'), document.querySelector('.picAustralia'));
show(document.querySelector('#NewZealand'), document.querySelector('.picNewZealand'));


var close = document.querySelector('.close')
close.addEventListener('click',
    function(e) {
         wrapperEl.classList.remove('active');
         content.classList.remove('active');
    }
)

function clearActive(el) {
 el.classList.remove('active');
}

// Get the video
var video = document.getElementById("myVideo");

// Get the button
var btn = document.getElementById("myBtn");

function myFunction(){
  location.href="hobby.html";
}
