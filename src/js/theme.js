export function theme() {
  const key = 'CH-Theme';
  let theme = localStorage.getItem(key);

  if (!theme) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  const switcher = document.querySelector('.theme-switch');
  const rootDiv = document.documentElement;

  if (!rootDiv || !switcher) return;

  if (theme === 'dark' && !rootDiv.classList.contains('dark')) {
    rootDiv.classList.add('dark');
  }

  function switchTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    rootDiv.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(key, theme);
  }

  switcher.addEventListener('click', switchTheme);
}
