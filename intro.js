(() => {
  const intro = document.querySelector('.site-intro');
  if (!intro) { document.documentElement.classList.remove('intro-pending'); return; }
  const logo = intro.querySelector('img');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let finished = false;
  let timer;
  let deadline;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    clearTimeout(deadline);
    intro.remove();
    document.documentElement.classList.remove('intro-pending');
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('focusin', finish);
    try { sessionStorage.setItem('lee-intro-seen', '1'); } catch {}
  };
  const dismiss = () => {
    if (finished) return;
    intro.classList.add('is-leaving');
    clearTimeout(timer);
    timer = setTimeout(finish, reducedMotion.matches ? 0 : 200);
  };
  const onKey = event => { if (event.key === 'Escape') finish(); };
  const reveal = () => {
    if (finished) return;
    clearTimeout(timer);
    intro.classList.add('is-ready');
    timer = setTimeout(dismiss, reducedMotion.matches ? 0 : 700);
  };
  // The deadline stays independent of image decoding and the animation timers.
  // A slow or stalled image must never hold the page behind the intro.
  deadline = setTimeout(finish, 1800);
  try { if (sessionStorage.getItem('lee-intro-seen') === '1') { finish(); return; } } catch {}
  if (reducedMotion.matches) { finish(); return; }
  document.addEventListener('keydown', onKey);
  document.addEventListener('focusin', finish, {once:true});
  if (logo.decode) logo.decode().then(reveal, finish);
  else if (logo.complete) logo.naturalWidth ? reveal() : finish();
  else {
    logo.addEventListener('load', reveal, {once:true});
    logo.addEventListener('error', finish, {once:true});
  }
  addEventListener('pageshow', event => { if (event.persisted) finish(); });
})();
