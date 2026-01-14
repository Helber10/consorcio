verificarLogin();

if (!ehAdmin()) {
  alert("Apenas o admin pode cadastrar membros");
  window.location.href = "dashboard.html";
}

function cadastrarMembro() {
  const nome = document.getElementById("nome").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  const existe = consorcio.membros.some(m => m.nome === nome);
  if (existe) {
    alert("Já existe um membro com esse nome");
    return;
  }

  consorcio.membros.push({
    nome,
    senha,
    role: "user",
    sorteado: false,
    pagamentos: {}
  });

  salvar();
  alert("Membro cadastrado com sucesso!");

  document.getElementById("nome").value = "";
  document.getElementById("senha").value = "";
}
