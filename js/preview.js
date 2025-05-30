const d = JSON.parse(localStorage.getItem('portfolioData') || '{}');
if (!d.name) location.href = 'index.html';

/* ---------- dynamic palette ---------- */
const root = document.documentElement;
root.style.setProperty('--accent', d.accent);

const base = hexToHSL(d.accent);
root.style.setProperty('--bg1', `hsl(${base.h} ${base.s}% 95%)`);
root.style.setProperty('--bg2', `hsl(${base.h + 30} ${base.s * 0.6}% 85%)`);
root.style.setProperty('--bg3', `hsl(${base.h + 60} ${base.s * 0.5}% 75%)`);

function hexToHSL(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.slice(0, 2), 16) / 255,
        g = parseInt(hex.slice(2, 4), 16) / 255,
        b = parseInt(hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100) };
}

/* ---------- build markup ---------- */
const container = document.getElementById('portfolioRoot');
const icon = (link, cls) =>
  `<a href="${link || '#'}" class="${link ? '' : 'disabled'}"><i class="${cls}"></i></a>`;

container.innerHTML = `
<div class="left">
  <img src="${d.profilePic || 'https://placehold.co/280x350'}" alt="Profile" class="profile-img">
  <div class="name">${d.name}</div>
  <div class="role">${d.role}</div>
  <div class="socials">
    ${icon(d.socials.email   ,'fa-solid fa-envelope')}
    ${icon(d.socials.linkedin,'fa-brands fa-linkedin')}
    ${icon(d.socials.github  ,'fa-brands fa-github')}
    ${icon(d.socials.leetcode,'fa-solid fa-code')}
    ${icon(d.socials.twitter ,'fa-brands fa-x-twitter')}
    ${icon(d.socials.facebook,'fa-brands fa-facebook')}
  </div>
</div>

<div class="right">
  <div class="about"><h3>ABOUT ME</h3><div class="tagline">${d.tagline}</div><p>${d.about}</p></div>

  <div class="edu"><h3>EDUCATION</h3>
    ${d.edu.map(l => line(l, 'degree')).join('')}
  </div>

  <div class="exp"><h3>EXPERIENCE</h3>
    ${d.exp.map(l => line(l, 'position')).join('')}
  </div>

  <a class="button" href="#" onclick="window.print()">Resume</a>
</div>`;

function line(str, cls) {
  const [y, title, org] = (str || '').split('|').map(s => s.trim());
  return `<div class="${cls}-item"><span class="year">${y || ''}</span> <span class="${cls}">${title || ''}</span><br><small>${org || ''}</small></div>`;
}

/* font‑awesome late‑load */
const fa = document.createElement('link');
fa.rel = 'stylesheet';
fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
document.head.appendChild(fa);
