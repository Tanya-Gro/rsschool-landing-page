import options from '/src/data/options.json';

const modal = document.querySelector('.modal');
const image = modal.querySelector('#modal-image');
const title = modal.querySelector('#modal-title');
const description = modal.querySelector('#modal-description');
const sizesBox = modal.querySelector('#sizes');
const additivesBox = modal.querySelector('#additives');
const priceEl = modal.querySelector('#total-price');

const sizeTpl = document.getElementById('size-pill-template').content;
const additiveTpl = document.getElementById('additive-pill-template').content;

let state = { basePrice: 0, sizes: [], additives: [] };

function recalcTotal() {
  const activeSize = state.sizes.find((b) => b.classList.contains('is-active'));
  const multiplier = activeSize ? Number(activeSize.dataset.multiplier) : 1;

  const additivesSum = state.additives
    .filter((b) => b.getAttribute('aria-pressed') === 'true')
    .reduce((sum, b) => sum + Number(b.dataset.price), 0);

  const total = state.basePrice * multiplier + additivesSum;
  priceEl.textContent = `$${total.toFixed(2)}`;
}

function renderOptions(category) {
  const cfg = options[category] ?? { sizes: [], additives: [] };

  const sizeNodes = cfg.sizes.map((s) => {
    const node = sizeTpl.cloneNode(true);
    const btn = node.querySelector('.pill');
    btn.dataset.multiplier = s.multiplier;
    btn.querySelector('.pill-title').textContent = s.label;
    return btn;
  });

  const additiveNodes = cfg.additives.map((a) => {
    const node = additiveTpl.cloneNode(true);
    const btn = node.querySelector('.pill');
    btn.dataset.price = a.price;
    btn.querySelector('.pill-title').textContent = a.label;
    return btn;
  });

  sizesBox.replaceChildren(...sizeNodes);
  additivesBox.replaceChildren(...additiveNodes);

  if (sizeNodes[0]) {
    sizeNodes[0].classList.add('is-active');
    sizeNodes[0].setAttribute('aria-pressed', 'true');
  }

  state.sizes = sizeNodes;
  state.additives = additiveNodes;
}

sizesBox.addEventListener('click', (e) => {
  const btn = e.target.closest('.pill');
  if (!btn) return;

  state.sizes.forEach((b) => {
    const active = b === btn;
    b.classList.toggle('is-active', active);
    b.setAttribute('aria-pressed', String(active));
  });

  recalcTotal();
});

additivesBox.addEventListener('click', (e) => {
  const btn = e.target.closest('.pill');
  if (!btn) return;

  const pressed = btn.getAttribute('aria-pressed') === 'true';
  btn.setAttribute('aria-pressed', String(!pressed));
  btn.classList.toggle('is-active', !pressed);

  recalcTotal();
});

export function openModal({ item, category }) {
  state.basePrice = Number(item.price);

  image.src = item.image;
  image.alt = item.name;
  title.textContent = item.name;
  description.textContent = item.description;

  renderOptions(category);
  recalcTotal();

  modal.showModal();
}

modal
  .querySelector('.close-btn')
  .addEventListener('click', () => modal.close());

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.close();
});
