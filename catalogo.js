let carrinho = [];
let total = 0;

window.adicionar = function(nome, preco) {  // Agora a função está global
  carrinho.push({ nome, preco });
  total += preco;
  atualizarCarrinho();
};

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalEl = document.getElementById("total");
  lista.innerHTML = "";
  
  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;
    li.onclick = () => remover(index);
    lista.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}

function remover(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  let mensagem = "Olá! Gostaria de fazer um pedido:%0A";
  
  carrinho.forEach(item => {
    mensagem += `- ${item.nome} (R$${item.preco.toFixed(2)})%0A`;  // Corrigido
  });

  mensagem += `%0ATotal: R$${total.toFixed(2)}`;

  const link = `https://wa.me/5542999696273?text=${mensagem}`;  // Corrigido
  window.open(link, "_blank");
}
