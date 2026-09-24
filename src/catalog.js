import { theme } from './theme';

theme();

const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

function activateTab(tab) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.classList.toggle('active', selected);
    t.setAttribute('aria-selected', String(selected));
    t.tabIndex = selected ? 0 : -1;
  });

  panels.forEach((panel) => {
    const isTarget = panel.id === tab.getAttribute('aria-controls');
    panel.hidden = !isTarget;
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab));
});

document.querySelector('.tabs').addEventListener('keydown', (e) => {
  const current = document.activeElement;
  if (!current || current.getAttribute('role') !== 'tab') return;

  const list = [...tabs];
  const i = list.indexOf(current);
  let next = null;

  if (e.key === 'ArrowRight') next = list[(i + 1) % list.length];
  if (e.key === 'ArrowLeft') next = list[(i - 1 + list.length) % list.length];

  if (next) {
    e.preventDefault();
    next.focus();
    activateTab(next);
  }
});
