(() => {
  const intro = document.querySelector('.site-intro');
  if (!intro) { document.documentElement.classList.remove('intro-pending'); return; }
  const skip = intro.querySelector('button');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let finished = false;
  let timer;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    const hadFocus = intro.contains(document.activeElement);
    intro.remove();
    document.documentElement.classList.remove('intro-pending');
    if (hadFocus) document.querySelector('.skip-link')?.focus({preventScroll:true});
    document.removeEventListener('keydown', onKey);
  };
  const dismiss = () => {
    intro.classList.add('is-leaving');
    clearTimeout(timer);
    timer = setTimeout(finish, reducedMotion.matches ? 0 : 450);
  };
  const onKey = event => {
    if (event.key === 'Escape') dismiss();
    // Keep keyboard navigation on the skip control until the page is visible.
    if (event.key === 'Tab') { event.preventDefault(); skip.focus(); }
  };
  timer = setTimeout(finish, reducedMotion.matches ? 200 : 2600);
  skip.addEventListener('click', dismiss, {once:true});
  document.addEventListener('keydown', onKey);
  intro.querySelector('img').addEventListener('error', finish, {once:true});
  if (intro.querySelector('img').complete && !intro.querySelector('img').naturalWidth) finish();
  // Restoring the page from the back-forward cache should never replay the intro.
  addEventListener('pageshow', event => { if (event.persisted) finish(); });
})();
