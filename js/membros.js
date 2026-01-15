if (consorcio.usuarioLogado === null || usuarioAtual().role !== "admin") {
  window.location.href = "login.html";
}


const tbody = document.getElementById("listaMembros");
const msg = document.getElementById("msg");

// Lista apenas usuários (não admin)
function listarMembros() {
  tbody.innerHTML = "";

  consorcio.membros.forEach((membro, index) => {
    if (membro.role !== "user") return;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <input value="${membro.nome}" 
               onchange="editarNome(${index}, this.value)">
      </td>
      <td>
        <input value="${membro.senha}" 
               onchange="editarSenha(${index}, this.value)">
      </td>
      <td>
        <button onclick="excluirMembro(${index})">🗑 Excluir</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function editarNome(index, novoNome) {
  consorcio.membros[index].nome = novoNome;
  salvar();
  msg.textContent = "✅ Nome atualizado";
}

function editarSenha(index, novaSenha) {
  consorcio.membros[index].senha = novaSenha;
  salvar();
  msg.textContent = "✅ Senha atualizada";
}

function excluirMembro(index) {

  const membro = consorcio.membros[index];

  // 🚫 Bloqueia se já foi sorteado
  if (membro.sorteado) {
    msg.textContent =
      "❌ Não é possível excluir um membro que já foi sorteado.";
    return;
  }

  if (!confirm("Deseja realmente excluir este membro?")) return;

  consorcio.membros.splice(index, 1);
  salvar();
  listarMembros();
  msg.textContent = "🗑 Membro removido com sucesso";
}


listarMembros();
