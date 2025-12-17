/* ================= CLOCK ================= */

function updateClock() {
  const now = new Date();

  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ms = now.getMilliseconds();

  const smoothSeconds = seconds + ms / 1000;

  document.getElementById("time").textContent =
    (hours === 0 ? 12 : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes);

  const hourAngle =
    (hours * 30 + minutes * 0.5) * Math.PI / 180;
  const minuteAngle =
    (minutes * 6) * Math.PI / 180;
  const secondAngle =
    (smoothSeconds * 6) * Math.PI / 180;

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
bgm.volume = 0.3; // soft background volume

function startMusic() {
  bgm.play().then(() => {
    console.log("Music started");
  }).catch(err => {
    console.log("Music error:", err);
  });

  document.removeEventListener("click", startMusic);
  document.removeEventListener("keydown", startMusic);
}

// Browser requires user interaction
document.addEventListener("click", startMusic);
document.addEventListener("keydown", startMusic);
