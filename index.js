const form = document.getElementById('pedido');
const senhaInput = document.getElementById('senha');
const senhaButton = document.getElementById('btnSenha');
const formularioDiv = document.getElementById('pedido');

senhaButton.addEventListener('click', function () {
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


form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    document.getElementById('totalpedido').style.display = '';
    document.getElementById('registros').style.display = '';

    const pizza = document.getElementById('pizza').value;
    const bebida = document.getElementById('bebida').value;
    const nome = document.getElementById('nome').value;
    const ende = document.getElementById('ende').value;
    const entrega = document.getElementById('entrega').value;

    const registro = {
        id: Date.now(),
        pizza,
        bebida,
        nome,
        ende,
        entrega,
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
        <td>${registro.pizza}</td>
        <td>${registro.bebida}</td>
        <td>${registro.nome}</td>
        <td>${registro.ende}</td>
        <td>${registro.entrega}</td>
    `;
    registroBody.appendChild(newRow);
    console.log('Formulário enviado');
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