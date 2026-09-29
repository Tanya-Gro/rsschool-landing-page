import catalog from '/src/data/catalog.json';

import { theme } from './theme';
import { createCard } from './createCard';
import { openModal } from './modal';

theme();

const MOBILE_BREAKPOINT = 768;
const MOBILE_VISIBLE = 4;

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
const addCardsBtn = document.getElementById('add-cards');

const expanded = new Map(panels.map((p) => [p.dataset.category, false]));

const isMobile = () =>
  window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;

function renderPanel(panel, items, category) {
  panel.replaceChildren(
    ...items.map((item) =>
      createCard(item, (it) => openModal({ item: it, category }))
    )
  );
}

function applyVisibility(panel) {
  const cards = [...panel.querySelectorAll('.preview')];
  const category = panel.dataset.category;
  const showAll = !isMobile() || expanded.get(category);

  cards.forEach((card, i) => {
    card.hidden = !showAll && i >= MOBILE_VISIBLE;
  });
}

function updateAddButton() {
  const activePanel = panels.find((p) => !p.hidden);
  if (!activePanel) return;

  const total = activePanel.querySelectorAll('.preview').length;
  const category = activePanel.dataset.category;
  const needButton =
    isMobile() && total > MOBILE_VISIBLE && !expanded.get(category);

  addCardsBtn.hidden = !needButton;
  addCardsBtn.setAttribute('aria-controls', activePanel.id);
}

function activateTab(tab) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.classList.toggle('active', selected);
    t.setAttribute('aria-selected', String(selected));
    t.tabIndex = selected ? 0 : -1;
  });

  panels.forEach((panel) => {
    panel.hidden = panel.id !== tab.getAttribute('aria-controls');
  });

  updateAddButton();
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab));
});

document.querySelector('.tabs').addEventListener('keydown', (e) => {
  const current = document.activeElement;
  if (!current || current.getAttribute('role') !== 'tab') return;

  const i = tabs.indexOf(current);
  let next = null;

  if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
  if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];

  if (next) {
    e.preventDefault();
    next.focus();
    activateTab(next);
  }
});

addCardsBtn.addEventListener('click', () => {
  const activePanel = panels.find((p) => !p.hidden);
  if (!activePanel) return;

  expanded.set(activePanel.dataset.category, true);
  applyVisibility(activePanel);
  updateAddButton();
});

window.addEventListener('resize', () => {
  panels.forEach(applyVisibility);
  updateAddButton();
});

(() => {
  panels.forEach((panel) => {
    const category = panel.dataset.category;
    const items = catalog[category] ?? [];
    renderPanel(panel, items, category);
    applyVisibility(panel);
  });
  updateAddButton();
})();
