const canvas = document.getElementById('cosmos');
const ctx = canvas.getContext('2d');
let width, height, stars;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  radius: Math.random() * 1.5,
  alpha: Math.random(),
  speed: (Math.random() * 0.02) + 0.01,
  vx: (Math.random() - 0.5) * 0.2,
  vy: (Math.random() - 0.5) * 0.2
}));

function animate() {
  ctx.clearRect(0, 0, width, height);
  stars.forEach(s => {
    s.x += s.vx;
    s.y += s.vy;
    s.alpha += s.speed;
    if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
    
    if (s.x < 0) s.x = width;
    if (s.x > width) s.x = 0;
    if (s.y < 0) s.y = height;
    if (s.y > height) s.y = 0;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(215, 180, 255, ${s.alpha})`; // Tono lila estelar
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
