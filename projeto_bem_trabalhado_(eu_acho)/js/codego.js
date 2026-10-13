document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-notas');
    const inputNome = document.getElementById('nome');
    const inputDisciplina = document.getElementById('disciplina');
    const inputNota1 = document.getElementById('nota1');
    const inputNota2 = document.getElementById('nota2');
    const inputNota3 = document.getElementById('nota3');
    const inputNota4 = document.getElementById('nota4');

    const resultadoDiv = document.getElementById('resultado');
    const historicoDiv = document.getElementById('historico');
    const avisoDiv = document.getElementById('aviso');

    const historico = [];

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = inputNome.value.trim();
        const disciplina = inputDisciplina.value.trim();
        const n1 = parseFloat(inputNota1.value);
        const n2 = parseFloat(inputNota2.value);
        const n3 = parseFloat(inputNota3.value);
        const n4 = parseFloat(inputNota4.value);

        // Validação dos dados
        if ([n1, n2, n3, n4].some(n => isNaN(n) || n < 0 || n > 10)) {
            exibirAviso('Preencha todas as notas com valores entre 0 e 10.');
            return;
        }

        ocultarAviso();

        const media = (n1 + n2 + n3 + n4) / 4;
        const aprovado = media >= 6.0;
        const situacao = aprovado ? 'Aprovado' : 'Reprovado';
        const mensagemTonys = aprovado 
            ? 'O Tonys aceitou você no time!' 
            : 'O Tonys não te aceitou desta vez. Estude mais!';

        resultadoDiv.classList.remove('vazio');
        resultadoDiv.innerHTML = `
            <div class="cartao-resultado ${aprovado ? 'aprovado' : 'reprovado'}">
                <h4>${nome} — ${disciplina}</h4>
                <p><strong>Notas:</strong> ${n1.toFixed(1)} | ${n2.toFixed(1)} | ${n3.toFixed(1)} | ${n4.toFixed(1)}</p>
                <p><strong>Média:</strong> ${media.toFixed(2)}</p>
                <p><strong>Situação:</strong> <span class="status ${aprovado ? 'ok' : 'erro'}">${situacao}</span></p>
                <p><em>${mensagemTonys}</em></p>
            </div>
        `;

        historico.unshift({
            nome,
            disciplina,
            media: media.toFixed(2),
            situacao,
            aprovado
        });

        renderizarHistorico();
    });

    form.addEventListener('reset', () => {
        ocultarAviso();
        resultadoDiv.classList.add('vazio');
        resultadoDiv.innerHTML = 'Preencha o formulário para ver o boletim do estudante.';
    });

    function exibirAviso(mensagem) {
        avisoDiv.textContent = mensagem;
        avisoDiv.hidden = false;
    }

    function ocultarAviso() {
        avisoDiv.textContent = '';
        avisoDiv.hidden = true;
    }

    function renderizarHistorico() {
        if (historico.length === 0) {
            historicoDiv.innerHTML = '<div class="muted">Ainda não há cálculos</div>';
            return;
        }

        historicoDiv.innerHTML = historico.map(item => `
            <div class="item-historico ${item.aprovado ? 'status-aprovado' : 'status-reprovado'}">
                <strong>${item.nome}</strong> (${item.disciplina}) — Média: <strong>${item.media}</strong> [${item.situacao}]
            </div>
        `).join('');
    }
});