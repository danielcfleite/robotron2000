//gradient for background

var colors = new Array(
  [152, 11, 188],
  [218, 51, 168],
  [23, 17, 192],
  [233, 9, 136],
  [132, 14, 162],
  [7, 44, 118]
);

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient() {
  if ($ === undefined) return;

  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];

  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

  $("#gradient")
    .css({
      background:
        "-webkit-gradient(linear, left top, right top, from(" +
        color1 +
        "), to(" +
        color2 +
        "))",
    })
    .css({
      background:
        "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)",
    });

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] =
      (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
    colorIndices[3] =
      (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
  }
}

setInterval(updateGradient, 10);

// ----bot stats---
const stats = document.querySelectorAll("[data-stat]");
const parts = {
  bracos: {
    forca: 29,
    poder: 35,
    energia: -21,
    velocidade: -5,
  },

  blindagem: {
    forca: 41,
    poder: 20,
    energia: 0,
    velocidade: -20,
  },
  nucleos: {
    forca: 0,
    poder: 7,
    energia: 48,
    velocidade: -24,
  },
  pernas: {
    forca: 27,
    poder: 21,
    energia: -32,
    velocidade: 42,
  },
  foguetes: {
    forca: 0,
    poder: 28,
    energia: 0,
    velocidade: -2,
  },
};

// menu functionality
const controle = document.querySelectorAll("[data-controle]");
controle.forEach((element) => {
  element.addEventListener("click", (event) => {
    manipulaDados(event.target.dataset.controle, event.target.parentNode);
    atualizaStats(event.target.dataset.part, event.target.dataset.controle);
  });
});

function manipulaDados(content, controll) {
  const peca = controll.querySelector("[data-contador]");
  if (content === "+") {
    peca.value = parseInt(peca.value) + 1;
  } else if (content === "-") {
    peca.value = parseInt(peca.value) - 1;
  }
}

function atualizaStats(part, content) {
  stats.forEach((element) => {
    if (content === "+") {
      element.textContent =
        parseInt(element.textContent) + parts[part][element.dataset.stat];
    } else if (content === "-") {
      element.textContent =
        parseInt(element.textContent) - parts[part][element.dataset.stat];
    }
  });
}
