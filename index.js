const form = document.getElementById('form');
const senhaInput = document.getElementById('senha');
const senhaButton = document.getElementById('btnSenha');
const formularioDiv = document.getElementById('pedido');

senhaButton.addEventListener('click', function() {
    const senhaDigitada = senhaInput.value;
    const senhaCorreta = "como"; // Senha
    
    if (senhaDigitada === senhaCorreta) {
        formularioDiv.style.display = 'block';
        senhaInput.value = ''; 
        document.getElementById('senhaForm').style.display = 'none';
    } else {
        alert('Senha incorreta! Tente novamente.');
    }
});

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const pizza = document.getElementById('pizza').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const quantidadeTurno = parseInt(document.getElementById('quantidadeTurno').value);
    const unidade = document.getElementById('unidade').value;

    const registro = {
        id: Date.now(),
        nome,
        pizza,
        quantidade,
        quantidadeTurno,
        horario,
        diasSemana,
        dataEntrada,
        dataSaida,
        unidade
    };

    adicionarRegistro(registro);
    salvarRegistro(registro);
    form.reset();
});

function adicionarRegistro(registro) {
    const registroBody = document.getElementById('registro-body');
    const newRow = document.createElement('tr');
    newRow.setAttribute('id', registro.id); 
    newRow.innerHTML = `
        <td>${registro.nome}</td>
        <td>${registro.curso}</td>
        <td>${registro.unidade}</td>
        <td>${registro.quantidade}</td>
        <td>${registro.quantidadeTurno}</td>
        <td>${registro.horario.join(', ')}</td>
        <td>${registro.diasSemana.join(', ')}</td>
        <td>${registro.dataEntrada}</td>
        <td>${registro.dataSaida}</td>
    `;
    registroBody.appendChild(newRow);
}

function salvarRegistro(registro) {
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(registro); 
    localStorage.setItem('registros', JSON.stringify(registros)); 
}

function removerRegistrosExpirados() {
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    const agora = new Date().toISOString().split('T')[0];
    
    registros = registros.filter(registro => registro.dataSaida >= agora);
    
    localStorage.setItem('registros', JSON.stringify(registros));
}

setInterval(removerRegistrosExpirados, 24 * 60 * 60 * 1000);