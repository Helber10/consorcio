const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];

let consorcio = JSON.parse(localStorage.getItem("consorcio")) || {
  mesInicio: 1,
  mesIndex: 1,
  valorMensal: 300,
  membros: [
    {
      nome: "admin",
      senha: "1234",
      role: "admin",
      sorteado: false,
      pagamentos: {}
    }
  ],
  usuarioLogado: null, // 👈 AGORA É NOME
  historico: []
};

function salvar() {
  localStorage.setItem("consorcio", JSON.stringify(consorcio));
}

// ✅ Usuário atual PELO NOME
function usuarioAtual() {
  return consorcio.membros.find(
    m => m.nome === consorcio.usuarioLogado
  );
}

// 🔹 Nome do mês atual
function mesAtualNome() {
  return MESES[consorcio.mesIndex];
}

// 🔒 Proteção de páginas
function verificarLogin() {
  // NÃO roda na página de login
  if (window.location.pathname.includes("login.html")) return;

  if (!consorcio.usuarioLogado) {
    window.location.replace("login.html");
    return;
  }

  const user = usuarioAtual();
  if (!user) {
    consorcio.usuarioLogado = null;
    salvar();
    window.location.replace("login.html");
    return;
  }

  if (document.getElementById("usuario")) {
    document.getElementById("usuario").textContent =
      `${user.nome} (${user.role})`;
  }
}

// 🔒 Admin
function ehAdmin() {
  const user = usuarioAtual();
  return user && user.role === "admin";
}

// 🚪 Logout
function logout() {
  consorcio.usuarioLogado = null;
  salvar();
  window.location.replace("login.html");
}

function membrosAtivos() {
  return consorcio.membros.filter(
    m => m.role === "user" && !m.sorteado
  );
}

function valorArrecadadoMes() {
  return membrosAtivos().length * consorcio.valorMensal;
}

function avancarMes() {
  consorcio.mesIndex = (consorcio.mesIndex + 1) % 12;
  salvar();
}
