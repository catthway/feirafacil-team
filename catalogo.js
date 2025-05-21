// 

const botoesAdd = document.querySelectorAll('.btn-add');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalDisplay = document.getElementById('total');
const finalizarBtn = document.getElementById('finalizar-compra');

let carrinho = [];

botoesAdd.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const produto = btn.closest('.produto');
    const nome = produto.querySelector('h3').innerText;
    const precoTexto = produto.querySelector('p').innerText;
    const preco = parseFloat(precoTexto.replace('R$ ', '').replace(',', '.'));
    
    const existe = carrinho.find(item => item.nome === nome);
    if (existe) {
      existe.quantidade++;
    } else {
      carrinho.push({ nome, preco, quantidade: 1 });
    }
    atualizarCarrinho();
  });
});

function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, i) => {
    total += item.preco * item.quantidade;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nome} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
      <button onclick="removerItem(${i})">X</button>
    `;
    listaCarrinho.appendChild(li);
  });

  totalDisplay.textContent = Total: R$ ${total.toFixed(2).replace('.', ',')};
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

finalizarBtn.addEventListener('click', () => {
  if(carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  let mensagem = 'Olá, gostaria de fazer o pedido:\n';
  carrinho.forEach(item => {
    mensagem += - ${item.nome} x${item.quantidade} = R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}\n;
  });
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  mensagem += Total: R$ ${total.toFixed(2).replace('.', ',')}\n\nQual a forma de pagamento?;

  const numeroWhatsApp = '5542999696273'; // seu número aqui
  const url = https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)};
  window.open(url, '_blank');
});
