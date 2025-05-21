function abrirCatalogo() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('catalogo').style.display = 'block';
}

let carrinho = [];

function adicionarAoCarrinho(produto, preco) {
  carrinho.push({ produto, preco });
  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const itensContainer = document.getElementById('itens-carrinho');
  itensContainer.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('item-carrinho');
    div.innerHTML = `
      <span>${item.produto} - R$${item.preco.toFixed(2)}</span>
      <button onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    itensContainer.appendChild(div);
    total += item.preco;
  });

  document.getElementById('total').innerText = total.toFixed(2);
}

function finalizarCompra() {
  document.getElementById('formas-pagamento').style.display = 'block';
}

function enviarWhatsapp() {
  let mensagem = 'Pedido Feira Fácil:\n';
  let total = 0;
  carrinho.forEach(item => {
    mensagem += - ${item.produto} - R$${item.preco.toFixed(2)}\n;
    total += item.preco;
  });
  mensagem += Total: R$${total.toFixed(2)};

  const url = https://wa.me/SEUNUMERO?text=${encodeURIComponent(mensagem)};
  window.open(url, '_blank');
}
