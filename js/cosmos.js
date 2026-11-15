const canvas = document.getElementById('cosmos');
const ctx = canvas.getContext('2d');
let width, height, particles;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

particles = Array.from({ length: 100 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  z: Math.random() * 2 + 0.1,
  vx: (Math.random() - 0.5) * 0.5,
  vy: (Math.random() - 0.5) * 0.5
}));

function animate() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(138, 43, 226, 0.4)'; // Color púrpura astral
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.z, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
