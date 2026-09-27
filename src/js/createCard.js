const cardTpl = document.getElementById('card-template').content;

export function createCard(item) {
  const node = cardTpl.cloneNode(true);
  const img = node.querySelector('img');
  img.src = item.image;
  img.alt = item.name;

  const [name, desc] = node.querySelectorAll('.title > *');
  name.textContent = item.name;
  desc.textContent = item.description;

  node.querySelector('.description > p').textContent = `$${item.price}`;
  return node;
}
