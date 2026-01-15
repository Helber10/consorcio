function cadastrarMembro() {
  const nome = document.getElementById("nomeMembro").value.trim();
  const senha = document.getElementById("senhaMembro").value;
  const msg = document.getElementById("msg");

  if (!nome || !senha) {
    msg.textContent = "Preencha nome e senha.";
    return;
  }

  if (consorcio.membros.length >= 11) {
    msg.textContent = "Limite de 10 membros atingido.";
    return;
  }

  if (consorcio.membros.find(m => m.nome === nome)) {
    msg.textContent = "Membro já existe.";
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
  document.getElementById("nomeMembro").value = "";
  document.getElementById("senhaMembro").value = "";
  msg.textContent = "Membro cadastrado com sucesso!";
  listarMembros();
}


function listarMembros() {
  const ul = document.getElementById("listaMembros");
  ul.innerHTML = "";

  consorcio.membros
    .filter(m => m.role === "user")
    .forEach((m, i) => {
      const li = document.createElement("li");
      li.textContent = `${i + 1} - ${m.nome}`;
      ul.appendChild(li);
    });
}
