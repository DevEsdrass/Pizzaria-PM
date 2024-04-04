const form = document.getElementById('form');
const senhaInput = document.getElementById('senha');
const senhaButton = document.getElementById('btnSenha');
const formularioDiv = document.getElementById('formulario');

senhaButton.addEventListener('click', function() {
    const senhaDigitada = senhaInput.value;
    const senhaCorreta = "123"; // Senha
    
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
    const curso = document.getElementById('curso').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const quantidadeTurno = parseInt(document.getElementById('quantidadeTurno').value);
    const horario = Array.from(document.getElementById('horario').selectedOptions).map(option => option.value);
    const diasSemana = Array.from(document.getElementById('diasSemana').selectedOptions).map(option => option.value);
    const dataEntrada = document.getElementById('dataEntrada').value;
    const dataSaida = document.getElementById('dataSaida').value;
    const unidade = document.getElementById('unidade').value;

    const registro = {
        id: Date.now(),
        nome,
        curso,
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