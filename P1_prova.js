module.exports = {
    adicionarProduto,
    atualizarProduto,
    removerProduto,
    venderProduto,
    relatorioEstoque,
    executarAcao
};

const prompt = require('prompt-sync')();

class Produto {
    constructor(nome, preco, quantidade) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }
}

const produtos = [];
const vendas = [];

function adicionarProduto(nome, preco, quantidade) {
    const novoProduto = new Produto(nome, preco, quantidade);
    produtos.push(novoProduto);
    return `Produto "${nome}" adicionado com sucesso!`;
}

function atualizarProduto(nome, novoPreco, novaQuantidade) {
    const produto = produtos.find((produto) => produto.nome === nome);

    if (produto) {
        produto.preco = novoPreco;
        produto.quantidade = novaQuantidade;
        return `Produto "${nome}" atualizado com sucesso!`;
    } else {
        return `Não foi possível atualizar, pois o produto "${nome}" não está cadastrado no sistema!`;
    }
}


function removerProduto(nome) {
    const indiceProduto = produtos.findIndex((produto) => produto.nome === nome);

    if (indiceProduto !== -1) {
        produtos.splice(indiceProduto, 1);
        return `Produto "${nome}" removido com sucesso!`;
    } else {
        return `Não foi possível remover, pois o produto "${nome}" não está cadastrado no sistema!`;
    }
}

function venderProduto(nome, quantidade) {
    const produtoVendido = produtos.find((produto) => produto.nome === nome);
    if (produtoVendido) {
        if (produtoVendido.quantidade >= quantidade) {
            produtoVendido.quantidade -= quantidade;
            const valorTotal = quantidade * produtoVendido.preco;
            vendas.push({ nome: produtoVendido.nome, quantidade, valorTotal });
            return `Você comprou ${quantidade} unidades de ${nome} por R$${valorTotal.toFixed(2)}`;
        } else {
            return `Não é possível vender ${quantidade} unidades de ${nome}, pois só temos ${produtoVendido.quantidade} em estoque`;
        }
    } else {
        return `Não é possível vender ${quantidade} unidades de ${nome}, pois este produto não está cadastrado`;
    }
}

function gerarBoletoVendas() {
    let totalVendas = 0;
    let boleto = "===== BOLETO DE VENDAS =====\n";
    for (const venda of vendas) {
        boleto += `Produto: ${venda.nome}, Quantidade: ${venda.quantidade}, Valor Total: R$${venda.valorTotal.toFixed(2)}\n`;
        totalVendas += venda.valorTotal;
    }
    boleto += `Total: R$${totalVendas.toFixed(2)}\n`;
    boleto += "=============================";
    return boleto;
}

function relatorioEstoque() {
    const produtosEmEstoque = produtos.filter(
        (produto) => produto.quantidade > 0
    );
    const relatorio = produtosEmEstoque.map((produto) => {
        return `Nome: ${produto.nome}, Preço: R$${(produto.preco).toFixed(2)}, Quantidade: ${produto.quantidade}`;
    });
    return relatorio;
}

function exibirMenu() {
    console.log("========= MENU =========");
    console.log("[1] Adicionar Produto");
    console.log("[2] Atualizar Produto");
    console.log("[3] Remover Produto");
    console.log("[4] Vender Produto");
    console.log("[5] Relatório de Estoque");
    console.log("[6] Sair");
    console.log("========================");
}

function executarAcao(opcao) {
    switch (opcao) {
        case "1":
            let continuarAdicionar = true;
            while (continuarAdicionar) {
                const nome = prompt("Digite o nome do produto (ou 0 para voltar ao menu):");
                if (nome === "0") {
                    continuarAdicionar = false;
                    break;
                }
                const preco = parseFloat(prompt("Digite o preço do produto (Ex: 000.00):"));
                const quantidade = parseInt(prompt("Digite a quantidade do produto:"));
                console.log(adicionarProduto(nome, preco, quantidade));
            }
            break;
        case "2":
            let continuarAtualizar = true;
            while (continuarAtualizar) {
                const nomeAtualizar = prompt("Digite o nome do produto a ser atualizado (ou 0 para voltar ao menu):");
                if (nomeAtualizar === "0") {
                    continuarAtualizar = false;
                    break;
                }
                const novoPreco = parseFloat(prompt("Digite o novo preço do produto (Ex: 000.00):"));
                const novaQuantidade = parseInt(prompt("Digite a nova quantidade do produto:"));
                console.log(atualizarProduto(nomeAtualizar, novoPreco, novaQuantidade));
            }
            break;
        case "3":
            let continuarRemover = true;
            while (continuarRemover) {
                const produtoRemover = prompt("Digite o nome do produto a ser removido (ou 0 para voltar ao menu):");
                if (produtoRemover === "0") {
                    continuarRemover = false;
                    break;
                }
                console.log(removerProduto(produtoRemover));
            }
            break;
        case "4":
            let continuarVendas = true;
            while (continuarVendas) {
                const nomeVender = prompt("Digite o nome do produto a ser vendido (ou 0 para voltar ao menu):");
                if (nomeVender === "0") {
                    continuarVendas = false;
                    break;
                }
                const quantidadeVender = parseInt(prompt("Digite a quantidade a ser vendida:"));
                console.log(venderProduto(nomeVender, quantidadeVender));
            }
            console.log(gerarBoletoVendas());
            break;
        case "5":
            console.log(relatorioEstoque());
            break;
        case "0":
            console.log("Saindo do sistema...");
            return;
        default:
            console.log("Opção inválida. Por favor, tente novamente.");
    }

    exibirMenu();
    const novaOpcao = prompt("Digite a opção desejada:");
    executarAcao(novaOpcao);
}
