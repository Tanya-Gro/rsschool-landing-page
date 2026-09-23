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

// export function theme() {
//   const KEY = 'CH-Theme';
//   const rootDiv = document.querySelector('.d-home');
//   const switcher = document.querySelector('.theme-switch');

//   if (!rootDiv || !switcher) return;

//   // 1. Читаем сохранённое значение или системную тему
//   const saved = safeGet(KEY);
//   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//   let current = saved || (prefersDark ? 'dark' : 'light');

//   // 2. Применяем
//   rootDiv.classList.toggle('dark', current === 'dark');

//   // 3. Обработчик
//   function switchTheme() {
//     current = current === 'light' ? 'dark' : 'light';
//     rootDiv.classList.toggle('dark', current === 'dark');
//     safeSet(KEY, current);
//   }

//   switcher.addEventListener('click', switchTheme);
// }

// function safeGet(key) {
//   try {
//     return localStorage.getItem(key);
//   } catch {
//     return null;
//   }
// }

// function safeSet(key, value) {
//   try {
//     localStorage.setItem(key, value);
//   } catch {
//     /* приватный режим, quota — молча игнорируем */
//   }
// }
