if (consorcio.usuarioLogado === null || usuarioAtual().role !== "admin") {
  window.location.href = "login.html";
}


const selectMes = document.getElementById("mesInicio");
const valorInput = document.getElementById("valorMensal");
const msg = document.getElementById("msg");

// Preenche os meses no select
MESES.forEach((mes, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = mes;
  selectMes.appendChild(option);
});

// Define valores atuais
selectMes.value = consorcio.mesInicio;
valorInput.value = consorcio.valorMensal;

function salvarConfiguracao() {
  consorcio.mesInicio = parseInt(selectMes.value);
  consorcio.mesIndex = consorcio.mesInicio;
  consorcio.valorMensal = parseFloat(valorInput.value);

  salvar();

  msg.textContent = "✅ Configuração salva com sucesso!";
}
