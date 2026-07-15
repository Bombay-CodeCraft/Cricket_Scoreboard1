/* ---------- theme switcher (family × light/dark) ---------- */
(function themeSwitcher(){
  const STORAGE_KEY = 'vpl-theme';
  const FAMILIES = ['forest', 'ocean', 'crimson'];
  const root = document.documentElement;

  const swatchButtons = document.querySelectorAll('.theme-swatch');
  const modeBtn = document.getElementById('modeToggle');

  function parseTheme(value){
    const parts = (value || 'forest-light').split('-');
    return { family: parts[0] || 'forest', mode: parts[1] || 'dark' };
  }

  function currentTheme(){
    return parseTheme(root.getAttribute('data-theme'));
  }

  function applyTheme(family, mode){
    const value = family + '-' + mode;
    root.setAttribute('data-theme', value);
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
    syncUI(family, mode);
  }

  function syncUI(family, mode){
    swatchButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.family === family);
    });
    if (modeBtn) {
      modeBtn.textContent = mode === 'dark' ? '☀️' : '🌙';
      modeBtn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Sync UI to whatever the inline head script already applied (no flash)
  const initial = currentTheme();
  syncUI(initial.family, initial.mode);

  swatchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const { mode } = currentTheme();
      const family = btn.dataset.family;
      if (FAMILIES.indexOf(family) === -1) return;
      applyTheme(family, mode);
    });
  });

  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      const { family, mode } = currentTheme();
      applyTheme(family, mode === 'dark' ? 'light' : 'dark');
    });
  }
})();