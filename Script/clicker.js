// Função para inicializar as memórias com memórias padrão
function inicializarMemorias() {
    if (!localStorage.getItem('memorias')) {
        const memoriasPadrao = [
            { data: "2024-07-19", descricao: "Nosso primeiro beijo 💋", imagens: ["img2.jpg"] },
            { data: "2024-08-16", descricao: "Um mês de namoro ❤️", imagens: ["img5.jpg", "img4.jpg"] },
            { data: "2024-08-07", descricao: "Nossa Aliança 💍", imagens: ["img3.jpg"] } // Alterado para img3.jpg
        ];
        localStorage.setItem('memorias', JSON.stringify(memoriasPadrao));
    }
    exibirMemorias(); // Exibe as memórias
}

// Função para exibir as memórias na página
function exibirMemorias() {
    const memorias = JSON.parse(localStorage.getItem('memorias')) || [];
    const memoriaContainer = document.getElementById('memorias');
    memoriaContainer.innerHTML = '';

    memorias.forEach((memoria, index) => {
        const memoriaDiv = document.createElement('div');
        memoriaDiv.classList.add('memoria');
        memoriaDiv.innerHTML = `
            <span onclick="abrirModalMemoria('${escape(memoria.data)}', '${escape(memoria.descricao)}', '${escape(JSON.stringify(memoria.imagens || []))}')">
                <strong>📅 ${memoria.data}</strong> - ${memoria.descricao}
            </span>
            <span class="remover" onclick="removerMemoria(${index})">❌</span>
        `;
        memoriaContainer.appendChild(memoriaDiv);
    });
}

// Função para adicionar uma nova memória
function adicionarMemoria() {
    const data = document.getElementById('dataMemoria').value;
    const descricao = document.getElementById('descricaoMemoria').value;
    const imagemInput = document.getElementById('imagemMemoria');
    const imagemArquivo = imagemInput.files[0];

    // Verifica se a data e a descrição não estão vazias
    if (!data.trim() || !descricao.trim()) {
        alert("Por favor, preencha todos os campos antes de adicionar uma memória.");
        return;
    }

    // Verifica se há uma imagem selecionada e lê a imagem usando FileReader
    let imagens = [];
    if (imagemArquivo) {
        const reader = new FileReader();
        reader.onload = function(event) {
            imagens.push(event.target.result); // Armazena o conteúdo da imagem
            salvarMemoria(data, descricao, imagens);
        };
        reader.readAsDataURL(imagemArquivo); // Lê a imagem como uma URL base64
    } else {
        salvarMemoria(data, descricao, imagens);
    }
}

// Função para salvar a memória no localStorage
function salvarMemoria(data, descricao, imagens) {
    const memorias = JSON.parse(localStorage.getItem('memorias')) || [];
    memorias.push({ data: data.trim(), descricao: descricao.trim(), imagens: imagens });
    localStorage.setItem('memorias', JSON.stringify(memorias));
    exibirMemorias();
    alert("Memória adicionada com sucesso! 🌟");
}


function removerMemoria(index) {
    const memorias = JSON.parse(localStorage.getItem('memorias')) || [];
    memorias.splice(index, 1);
    localStorage.setItem('memorias', JSON.stringify(memorias));
    exibirMemorias();
}

// Função para restaurar memórias padrão
function restaurarMemorias() {
    const memoriasPadrao = [
        { data: "2024-07-19", descricao: "Nosso primeiro beijo 💋", imagens: ["img2.jpg"] },
        { data: "2024-08-16", descricao: "Um mês de namoro ❤️", imagens: ["img5.jpg", "img4.jpg"] },
        { data: "2024-08-23", descricao: "Nossa Aliança 💍", imagens: ["img3.jpg"] } // Alterado para img3.jpg
    ];

    localStorage.setItem('memorias', JSON.stringify(memoriasPadrao));
    exibirMemorias();
    alert('Memórias padrão restauradas com sucesso! 💖');
}

// Função para calcular o contador de tempo
function calcularTempo() {
    const dataInicio = new Date('2024-07-16');
    const dataAtual = new Date();
    const diferenca = dataAtual - dataInicio;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById('contador-dias').innerText = `Estamos juntos há ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos 💖`;
}

// Inicialização do site
window.onload = function() {
    inicializarMemorias();
    setInterval(calcularTempo, 1000);

    setTimeout(function() {
        document.getElementById('tela-introducao').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    }, 3000);
};

// Função para abrir o modal com detalhes e imagens
function abrirModalMemoria(data, descricao, imagens) {
    const imagensArray = JSON.parse(unescape(imagens)); // Decodificar e fazer o parse das imagens
    const modal = document.getElementById('modalMemoria');

    // Atualizar título e descrição
    document.getElementById('tituloMemoria').innerText = `Memória de ${unescape(data)}`;
    document.getElementById('descricaoMemoriaModal').innerHTML = `
        <p>${unescape(descricao)}</p>
        <div class="galeria-modal">
            ${imagensArray.map(img => `<img src="${img}" alt="Memória de ${data}" class="imagem-memoria">`).join('')}
        </div>
    `;

    // Exibir o modal
    modal.style.display = 'flex';
}

// Função para fechar o modal
function fecharModalMemoria() {
    const modal = document.getElementById('modalMemoria');
    modal.style.display = 'none';
}

// Funcionalidade de interatividade
document.querySelectorAll('.evento').forEach(evento => {
    evento.addEventListener('click', function() {
        const eventoConteudo = evento.querySelector('.evento-conteudo');
        if (eventoConteudo.classList.contains('expandido')) {
            eventoConteudo.classList.remove('expandido');
        } else {
            eventoConteudo.classList.add('expandido');
        }
    });
});

// Adicionar a classe de expansão para o evento
const estiloExpansao = document.createElement('style');
estiloExpansao.innerHTML = `
    .evento-conteudo.expandido {
        background-color: #ff9a9e;
        padding: 30px;
        font-size: 1.2em;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(estiloExpansao);

// Obter o botão e a linha do tempo
const btnAbrirLinha = document.getElementById('abrirLinhaDoTempo');
const linhaDoTempo = document.getElementById('linhaDoTempo');

// Adicionar evento de clique para o botão
btnAbrirLinha.addEventListener('click', function() {
    // Alternar a classe 'visible' para mostrar ou esconder a linha do tempo
    linhaDoTempo.classList.toggle('visible');
    
    // Alterar o texto do botão dependendo do estado da linha do tempo
    if (linhaDoTempo.classList.contains('visible')) {
        btnAbrirLinha.innerText = 'Fechar Linha do Tempo';
    } else {
        btnAbrirLinha.innerText = 'Ver Linha do Tempo';
    }
});
