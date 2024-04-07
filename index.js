const form = document.getElementById('pedido');
const senha = document.getElementById('senha');
const senhaBotao = document.getElementById('btnSenha');

senhaBotao.addEventListener('click', function () {
    const senhaDigitada = senha.value;
    const senhaCorreta = "como"; // Senha

    if (senhaDigitada === senhaCorreta) {
        form.style.display = 'block';
        senha.value = '';
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

