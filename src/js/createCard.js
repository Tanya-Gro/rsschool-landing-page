const cardTpl = document.getElementById('card-template').content;

export function createCard(item, onOpen) {
  const node = cardTpl.cloneNode(true);
  const article = node.querySelector('.preview');

  const img = node.querySelector('img');
  img.src = item.image;
  img.alt = item.name;

  const [name, desc] = node.querySelectorAll('.title > *');
  name.textContent = item.name;
  desc.textContent = item.description;

  node.querySelector('.description > p').textContent = `$${item.price}`;

  article.addEventListener('click', () => onOpen(item));

  article.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== 'Space') return;
    e.preventDefault();

    onOpen(item);
  });

  return node;
}
