// ==================================================
//  BUBBLES APP (Canvas + Plain JavaScript)
//  Features:
//   - Draw a circle on left side with random color
//   - Draw an arrow on right side
//   - "Hit" button moves arrow towards circle
//   - Arrow stops & circle changes color on collision
//   - "Reset" button restores initial state
// ==================================================

// --------------------- Utilities ---------------------

// Generate random integer between min & max
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random HEX color string
function randomHexColor() {
  let c = '#';
  for (let i = 0; i < 6; i++) c += '0123456789ABCDEF'[randInt(0, 15)];
  return c;
}

// --------------------- Canvas Setup ---------------------

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// --------------------- World State ---------------------

// Circle + Arrow initial data
const state = {
  circle: { x: 110, y: canvas.height / 2, r: 36, color: randomHexColor() },
  arrow: {
    x: canvas.width - 140,
    y: canvas.height / 2,
    len: 60,
    thick: 6,
    head: 14,
    vx: -6,       // velocity in X direction
    moving: false // flag for animation
  },
  hitOnce: false
};

// --------------------- Drawing ---------------------

// Clear the canvas each frame
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the circle (bubble)
function drawCircle() {
  const { x, y, r, color } = state.circle;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

// Draw the arrow (rectangle shaft + triangle head)
function drawArrow() {
  const { x, y, len, thick, head } = state.arrow;

  // Arrow shaft
  ctx.fillStyle = '#111';
  ctx.fillRect(x - len, y - thick / 2, len, thick);

  // Arrow head
  ctx.beginPath();
  ctx.moveTo(x - len, y - 10);
  ctx.lineTo(x - len - head, y);
  ctx.lineTo(x - len, y + 10);
  ctx.closePath();
  ctx.fill();
}

// Draw everything (one frame)
function drawScene() {
  clear();
  drawCircle();
  drawArrow();
}

// --------------------- Collision Detection ---------------------

// Get tip coordinates of the arrow (triangle point)
function arrowTip() {
  const { x, len, head } = state.arrow;
  return { tx: x - len - head, ty: state.arrow.y };
}

// Check if arrow tip touches the circle
function didCollide() {
  const { tx, ty } = arrowTip();
  const dx = tx - state.circle.x;
  const dy = ty - state.circle.y;
  return Math.hypot(dx, dy) <= state.circle.r;
}

// --------------------- Animation ---------------------

let raf = null; // requestAnimationFrame reference

// Main animation loop
function step() {
  if (state.arrow.moving) {
    // Move arrow left
    state.arrow.x += state.arrow.vx;

    // Collision check
    if (!state.hitOnce && didCollide()) {
      state.hitOnce = true;
      state.arrow.moving = false;
      state.circle.color = randomHexColor(); // change circle color on hit
    }

    // Stop if arrow goes off-screen
    if (state.arrow.x < -100) state.arrow.moving = false;
  }

  // Redraw scene
  drawScene();

  // Loop until movement stops
  if (state.arrow.moving) raf = requestAnimationFrame(step);
  else raf = null;
}

// --------------------- Controls ---------------------

const hitBtn = document.getElementById('hitBtn');
const resetBtn = document.getElementById('resetBtn');

// Hit button → Start arrow movement
hitBtn.addEventListener('click', () => {
  if (state.arrow.moving) return; // prevent double trigger
  state.arrow.moving = true;
  if (!raf) step();
});

// Reset button → Restore initial state
resetBtn.addEventListener('click', () => {
  state.circle.color = randomHexColor();
  state.arrow.x = canvas.width - 140;
  state.arrow.y = canvas.height / 2;
  state.arrow.moving = false;
  state.hitOnce = false;
  drawScene();
});

// Extra: click on canvas to reposition circle vertically
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const y = e.clientY - rect.top;
  state.circle.y = Math.min(canvas.height - state.circle.r, Math.max(state.circle.r, y));
  drawScene();
});

// Initial render
drawScene();

// Keyboard shortcuts: Space/Enter = Hit, R = Reset
window.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    hitBtn.click();
    e.preventDefault();
  }
  if (e.key.toLowerCase() === 'r') resetBtn.click();
});
