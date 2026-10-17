/* AADHAYA — scroll-driven 3D product film (pull handle turns as you scroll).
   Loaded by: <div id="film3d"></div> (placed after the hero) + <script src="film.js?v=1" defer></script>
   Frames: film/f001.webp … film/f192.webp (Gemini clip, watermark cropped out, product unchanged).
   Frames load only when the visitor nears this section, so the homepage stays fast.
   To switch off: delete the <div id="film3d"></div> line. */
(function () {
  var host = document.getElementById('film3d');
  if (!host || host.dataset.on) return; host.dataset.on = 1;

  var N = 192, SW = 1100, SH = 720, FOCUS = 630, BG = '10,10,11';
  var css =
    '#film3d{position:relative;height:520vh;background:var(--bg,#0a0a0b)}' +
    '#film3d .f-stage{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden}' +
    '#film3d canvas{position:absolute;inset:0;width:100%;height:100%;display:block}' +
    '#film3d .f-cap{position:absolute;z-index:2;max-width:30rem;left:max(24px,7vw);top:50%;transform:translateY(-50%);opacity:0;pointer-events:none;transition:opacity .5s ease,transform .6s cubic-bezier(.2,.7,.2,1)}' +
    '#film3d .f-cap.on{opacity:1;pointer-events:auto}' +
    '#film3d .f-cap.up{transform:translateY(calc(-50% - 24px))}#film3d .f-cap.down{transform:translateY(calc(-50% + 24px))}' +
    '#film3d .f-eye{font:500 11px/1.4 var(--sans,system-ui);letter-spacing:.3em;text-transform:uppercase;color:var(--gold,#C8A84A);display:flex;align-items:center;gap:12px}' +
    '#film3d .f-eye:before{content:"";width:28px;height:1px;background:var(--gold,#C8A84A)}' +
    '#film3d h2{font-family:var(--serif,Georgia,serif);font-weight:400;font-size:clamp(40px,5.6vw,80px);line-height:1.02;margin:.35em 0 .3em;color:var(--txt,#ECEAE4);text-wrap:balance}' +
    '#film3d h2 em{font-style:italic;color:var(--gold,#C8A84A)}' +
    '#film3d p{color:var(--mut,#97948c);max-width:26rem;font-family:var(--sans,system-ui);font-weight:300;line-height:1.6}' +
    '#film3d .f-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}' +
    '#film3d .f-chips span{font:400 11px/1 var(--sans,system-ui);letter-spacing:.12em;text-transform:uppercase;border:1px solid var(--line,rgba(255,255,255,.12));border-radius:99px;padding:8px 12px;color:var(--txt,#ECEAE4)}' +
    '#film3d .f-cta{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}' +
    '#film3d .f-rail{position:absolute;z-index:2;right:max(22px,4vw);top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:12px}' +
    '#film3d .f-track{width:1px;height:160px;background:rgba(255,255,255,.12);position:relative}' +
    '#film3d .f-fill{position:absolute;left:0;top:0;width:1px;height:0;background:var(--gold,#C8A84A);box-shadow:0 0 10px var(--gold,#C8A84A)}' +
    '#film3d .f-count{font:400 10px/1 var(--sans,system-ui);letter-spacing:.18em;color:var(--mut,#97948c);writing-mode:vertical-rl;font-variant-numeric:tabular-nums}' +
    '@media (max-width:760px){#film3d{height:440vh}' +
      '#film3d .f-cap{left:20px;right:20px;top:auto;bottom:calc(64px + env(safe-area-inset-bottom,0px));transform:none;max-width:none}' +
      '#film3d .f-cap.up{transform:translateY(-18px)}#film3d .f-cap.down{transform:translateY(18px)}' +
      '#film3d h2{font-size:38px}#film3d p{font-size:14px}#film3d .f-rail{top:96px;transform:none}#film3d .f-track{height:90px}}' +
    '@media (prefers-reduced-motion:reduce){#film3d .f-cap{transition:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  host.setAttribute('aria-label', 'Product film');
  host.innerHTML =
    '<div class="f-stage"><canvas role="img" aria-label="Aadhaya pull handle turning as you scroll"></canvas>' +
    '<div class="f-cap on" data-a="0" data-b="0.2"><div class="f-eye">Architectural hardware</div><h2>The first thing<br>every guest <em>touches.</em></h2><p>Door pull handles from Rajkot, made to be held every day for years.</p></div>' +
    '<div class="f-cap" data-a="0.24" data-b="0.46"><div class="f-eye">Every angle</div><h2>Turned, fluted,<br><em>balanced.</em></h2><div class="f-chips"><span>Fluted barrel</span><span>Turned finials</span><span>Round rosettes</span></div></div>' +
    '<div class="f-cap" data-a="0.5" data-b="0.7"><div class="f-eye">Finish</div><h2>Black with gold.<br>Or <em>all gold.</em></h2><p>One design, two moods. Pick the finish that suits the door.</p></div>' +
    '<div class="f-cap" data-a="0.76" data-b="1.01"><div class="f-eye">For dealers &amp; architects</div><h2>See it in<br>your <em>showroom.</em></h2><p>Live stock and dealer rates are on the Aadhaya order app.</p>' +
      '<div class="f-cta"><a class="btn btn-gold" href="https://order.aadhayahardware.com" target="_blank" rel="noopener">Order Now</a><a class="btn btn-ghost" href="https://wa.me/919913235199" target="_blank" rel="noopener">WhatsApp</a></div></div>' +
    '<div class="f-rail" aria-hidden="true"><div class="f-track"><div class="f-fill"></div></div><div class="f-count">01 / 04</div></div></div>';

  var cv = host.querySelector('canvas'), ctx = cv.getContext('2d');
  var fill = host.querySelector('.f-fill'), count = host.querySelector('.f-count');
  var caps = [].slice.call(host.querySelectorAll('.f-cap'));
  var imgs = new Array(N), cur = 0, target = 0, raf = 0, W = 0, H = 0, dpr = 1, last = -1, started = false;

  function src(i) { return 'film/f' + ('00' + (i + 1)).slice(-3) + '.webp'; }
  function ok(im) { return im && im.complete && im.naturalWidth; }
  function near(i) { if (ok(imgs[i])) return imgs[i]; for (var d = 1; d < N; d++) { if (ok(imgs[i - d])) return imgs[i - d]; if (ok(imgs[i + d])) return imgs[i + d]; } return null; }
  function size() { dpr = Math.min(window.devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); last = -1; draw(Math.round(cur)); }
  function grad(x0, y0, x1, y1, a0, a1) { var g = ctx.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, 'rgba(' + BG + ',' + a0 + ')'); g.addColorStop(1, 'rgba(' + BG + ',' + a1 + ')'); return g; }
  function draw(i) {
    var im = near(i); if (!im || !W) return;
    var mob = W < 760;
    var s = mob ? Math.min(H / SH, W / 500) : Math.min(Math.max(H / SH, W / SW), H / SH * 1.12);
    var dw = SW * s, dh = SH * s, fx = mob ? 0.5 : 0.6;
    var lo = Math.min(0, W - dw), hi = Math.max(0, W - dw), x = Math.min(hi, Math.max(lo, W * fx - FOCUS * s));
    var y = mob ? (H - dh) * 0.38 : (H - dh) / 2;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = 'rgb(' + BG + ')'; ctx.fillRect(0, 0, W, H);
    ctx.drawImage(im, x, y, dw, dh);
    var f = Math.min(90, dw * .12), fv = Math.min(70, dh * .1);
    ctx.fillStyle = grad(x, 0, x + f, 0, 1, 0); ctx.fillRect(x, y, f, dh);
    ctx.fillStyle = grad(x + dw - f, 0, x + dw, 0, 0, 1); ctx.fillRect(x + dw - f, y, f, dh);
    ctx.fillStyle = grad(0, y, 0, y + fv, 1, 0); ctx.fillRect(x, y, dw, fv);
    ctx.fillStyle = grad(0, y + dh - fv * 1.6, 0, y + dh, 0, 1); ctx.fillRect(x, y + dh - fv * 1.6, dw, fv * 1.6);
    if (mob) { var t = y + dh * .55; ctx.fillStyle = grad(0, t, 0, y + dh, 0, 1); ctx.fillRect(0, t, W, y + dh - t); ctx.fillStyle = 'rgb(' + BG + ')'; ctx.fillRect(0, y + dh - 1, W, H); }
    else { ctx.fillStyle = grad(0, 0, W * .5, 0, .7, 0); ctx.fillRect(0, 0, W * .5, H); }
    last = i;
  }
  function prog() { var r = host.getBoundingClientRect(), span = host.offsetHeight - window.innerHeight; return Math.min(1, Math.max(0, -r.top / span)); }
  function onScroll() {
    var p = prog(); target = p * (N - 1); fill.style.height = (p * 100) + '%';
    var act = 0;
    caps.forEach(function (c, k) { var a = +c.dataset.a, b = +c.dataset.b, on = p >= a && p < b; c.classList.toggle('on', on); c.classList.toggle('up', !on && p >= b); c.classList.toggle('down', !on && p < a); if (on) act = k; });
    count.textContent = '0' + (act + 1) + ' / 04';
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick() {
    raf = 0;
    var red = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    cur = red ? target : cur + (target - cur) * 0.18;
    if (Math.abs(target - cur) < 0.05) cur = target;
    var i = Math.round(cur); if (i !== last) draw(i);
    if (cur !== target) raf = requestAnimationFrame(tick); // stops when settled — no constant repaint
  }
  function load(i, cb) { var im = new Image(); im.decoding = 'async'; im.onload = function () { cb && cb(); }; im.src = src(i); imgs[i] = im; }
  function start() {
    if (started) return; started = true;
    var k = 1;
    (function batch() { var e = Math.min(N, k + 8); for (; k < e; k++) load(k, function () { if (last < 0 || Math.abs(Math.round(cur) - last) > 0) draw(Math.round(cur)); }); if (k < N) setTimeout(batch, 40); })();
  }
  load(0, size); // first frame right away (≈12 KB)
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { start(); io.disconnect(); } }, { rootMargin: '150% 0px' });
    io.observe(host);
  } else start();
  window.addEventListener('resize', size, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  size(); onScroll();
})();
