const apiURL = "http://localhost:3000/produtos";

// Função para renderizar a lista de produtos
async function renderizarProdutos() {
    const produtosLista = document.getElementById("produtosLista");
    produtosLista.innerHTML = ""; // Limpa a lista antes de renderizar novamente

    const response = await fetch(apiURL);
    const produtos = await response.json();

    produtos.forEach(produto => {
        const produtoCard = document.createElement("div");
        produtoCard.className = "produto-card";
        produtoCard.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <p>${produto.nome}</p>
            <span>${produto.descricao}</span>
            <button class="excluir-produto" onclick="excluirProduto(${produto.id})">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        produtosLista.appendChild(produtoCard);
    });
}

// Função para adicionar um novo produto
async function adicionarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const imagem = document.getElementById("imagem").value;

    const novoProduto = { nome, descricao, imagem };

    await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProduto)
    });

    document.getElementById("produtoForm").reset();
    renderizarProdutos();
}

// Função para excluir um produto
async function excluirProduto(id) {
    await fetch(`${apiURL}/${id}`, {
        method: "DELETE"
    });
    renderizarProdutos();
}

// Carrega e renderiza os produtos ao carregar a página
renderizarProdutos();

// Event listener para o formulário
document.getElementById("produtoForm").addEventListener("submit", adicionarProduto);
