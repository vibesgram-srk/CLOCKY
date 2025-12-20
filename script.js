/* ================= CLOCK ================= */

function updateClock() {
  const now = new Date();

  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ms = now.getMilliseconds();
  const smoothSeconds = seconds + ms / 1000;

  let displayTime =
    (hours === 0 ? 12 : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes);

  document.getElementById("time").textContent = displayTime;

  const hourAngle = (hours * 30 + minutes * 0.5) * Math.PI / 180;
  const minuteAngle = (minutes * 6) * Math.PI / 180;
  const secondAngle = (smoothSeconds * 6) * Math.PI / 180;

  const radius = 148.5;

  document.getElementById("hourDot").style.transform =
    `translate(-50%, -50%) translate(${Math.sin(hourAngle)*radius}px, ${-Math.cos(hourAngle)*radius}px)`;

  document.getElementById("minuteDot").style.transform =
    `translate(-50%, -50%) translate(${Math.sin(minuteAngle)*radius}px, ${-Math.cos(minuteAngle)*radius}px)`;

  document.getElementById("secondDot").style.transform =
    `translate(-50%, -50%) translate(${Math.sin(secondAngle)*radius}px, ${-Math.cos(secondAngle)*radius}px)`;

  requestAnimationFrame(updateClock);
}

requestAnimationFrame(updateClock);


/* ================= MUSIC ================= */

const bgm = document.getElementById("bgm");
bgm.volume = 0.3;

function startMusic() {
  bgm.play().catch(err => console.log(err));
  document.removeEventListener("click", startMusic);
  document.removeEventListener("keydown", startMusic);
}

document.addEventListener("click", startMusic);
document.addEventListener("keydown", startMusic);


/* ================= SLIDE PAGES ================= */

const container = document.querySelector(".container");

function goNext() {
  container.classList.add("slide");
}

function goBack() {
  container.classList.remove("slide");
}


let tapCount = 0;

document.addEventListener("click", () => {
  tapCount++;

  if (tapCount === 3) {
    goNext();
    tapCount = 0;  // reset after slide
  }
});



/* ================= MORSE ================= */

const morseMap = {
  A: ".-",   B: "-...", C: "-.-.", D: "-..",
  E: ".",    F: "..-.", G: "--.",  H: "....",
  I: "..",   J: ".---", K: "-.-",  L: ".-..",
  M: "--",   N: "-.",   O: "---",  P: ".--.",
  Q: "--.-", R: ".-.",  S: "...",  T: "-",
  U: "..-",  V: "...-", W: ".--",  X: "-..-",
  Y: "-.--", Z: "--..",
  0: "-----", 1: ".----", 2: "..---", 3: "...--",
  4: "....-", 5: ".....", 6: "-....", 7: "--...",
  8: "---..", 9: "----."
};

const reverseMorse = Object.fromEntries(
  Object.entries(morseMap).map(([k, v]) => [v, k])
);

function toMorse() {
  const text = document.getElementById("textInput").value.toUpperCase();
  const result = text
    .split("")
    .map(ch => ch === " " ? "/" : morseMap[ch] || "")
    .join(" ");

  document.getElementById("output").value = result.trim();
}

function toText() {
  const morse = document.getElementById("textInput").value.trim();
  const result = morse
    .split(" ")
    .map(code => code === "/" ? " " : reverseMorse[code] || "")
    .join("");

  document.getElementById("output").value = result;
}
