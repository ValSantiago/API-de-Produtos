let express = require ("express")

const app = express ();

app.use (express.json ());

let produtos = []

app.post ("/produtos", (req, res) => {
    const {nome, preco, descricao} = req.body;

    if (!nome) {
        return res.status (400).json ({message: "Favor fornecer um nome para o produto."})
    }

    if (!preco) {
        return res.status (400).json ({message: "Favor fornecer o preço do produto."})
    }

    if (!descricao) {
        return res.status (400).json ({message: "O produto deve ter uma descrição."})
    }

    if (typeof preco !== "number" || preco <= 0) {
        return res.status (400).json ({message: "O preço deve ser um número positivo."})
    }

    const novoProduto = {
        nome,
        preco,
        descricao
    }
    produtos.push (novoProduto);

    res.status (201).json ({message: "Produto adicionado com sucesso.", produto: novoProduto})
})

// listar
app.get ("/produtos", (req, res) => {
    res.json (produtos)
})

// atualizar
app.put ("/produtos/:id", (req, res) => {
    const produtoId = req.params.id;
    const {nome, preco, descricao} = req.body;

    const produtoExistente = produtos.find (produto => produto.id === produtoId);
    if (!produtoExistente) {
        return res.status (404).json ({message: "Produto não encontrado."})
    }

    produtoExistente.nome = nome;
    produtoExistente.preco = preco;
    produtoExistente.descricao = descricao;

    res.json ({message: "Produto atualizado com sucesso.", produto: produtoExistente })
})

// deletar
app.delete("/produtos/:id", (req, res) => {
    const produtoId = req.params.id;

    const index = produtos.findIndex (produto => produto.id === produtoId);
    if (index === -1) {
        return res.status (404).json ({message: "Produto não encontrado."})
    }

    produtos.splice(index, 1) ;

    res.json({ message: 'Produto excluído com sucesso.' })
})

app.listen (3000)