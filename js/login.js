function login() {
  const nome = document.getElementById("loginNome").value.trim();
  const senha = document.getElementById("loginSenha").value.trim();

  const user = consorcio.membros.find(
    m => m.nome === nome && m.senha === senha
  );

  if (!user) {
    alert("Usuário ou senha inválidos");
    return;
  }

  consorcio.usuarioLogado = user.nome; // 👈 NOME
  salvar();

  window.location.replace("dashboard.html");
}
