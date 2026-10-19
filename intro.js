(() => {
  const intro = document.querySelector('.site-intro');
  if (!intro) { document.documentElement.classList.remove('intro-pending'); return; }
  const logo = intro.querySelector('img');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let finished = false;
  let timer;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    intro.remove();
    document.documentElement.classList.remove('intro-pending');
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('focusin', finish);
  };
  const dismiss = () => {
    if (finished) return;
    intro.classList.add('is-leaving');
    clearTimeout(timer);
    timer = setTimeout(finish, reducedMotion.matches ? 0 : 450);
  };
  const onKey = event => { if (event.key === 'Escape') finish(); };
  const reveal = () => {
    if (finished) return;
    clearTimeout(timer);
    intro.classList.add('is-ready');
    timer = setTimeout(dismiss, reducedMotion.matches ? 150 : 2000);
  };
  // Wait for image decoding so slower phones get the complete logo reveal.
  timer = setTimeout(finish, 4000);
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
