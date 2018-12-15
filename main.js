document.getElementById("myProject").onclick = function () {
        location.href = "design.html";
    };

document.getElementById("myApp").onclick = function () {
        location.href = "https://marvelapp.com/48i3je9";
    };

document.getElementById("myBlog").onclick = function () {
        location.href = "https://medium.com/@elainepan_25203";
    };

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}
