verificarLogin();

if (!ehAdmin()) {
  alert("Apenas o admin pode realizar o sorteio");
  window.location.href = "dashboard.html";
}

const mesSpan = document.getElementById("mes");
const valorSpan = document.getElementById("valor");
const resultado = document.getElementById("resultado");

// 🔹 Mês atual
mesSpan.textContent = mesAtualNome();

// 🔹 Valor arrecadado
function valorArrecadadoMes() {
  const ativos = consorcio.membros.filter(m => !m.sorteado);
  return ativos.length * consorcio.valorMensal;
}

valorSpan.textContent = `R$ ${valorArrecadadoMes().toFixed(2)}`;

// 🎲 Realiza o sorteio
function realizarSorteio() {
  const candidatos = consorcio.membros.filter(
    m => !m.sorteado && m.role !== "admin"
  );

  if (candidatos.length === 0) {
    resultado.textContent = "Todos os membros já foram sorteados.";
    return;
  }

  // 🔹 Calcula o valor ANTES
  const valorDoMes = candidatos.length * consorcio.valorMensal;

  //Mes atual
  const mes = mesAtualNome();

  const pendentes = consorcio.membros.filter(
    m => m.role !== "admin" && !m.pagamentos[mes]
  );

  if (pendentes.length > 0) {
    resultado.textContent = "Há membros com pagamento pendente.";
    return;
  }


  // 🔹 Sorteia
  const sorteado =
    candidatos[Math.floor(Math.random() * candidatos.length)];

  const nomeSorteado = sorteado.nome; // 🔐 garante o nome

  // 🔹 Marca como sorteado
  sorteado.sorteado = true;

  // 📜 Histórico CORRETO
  consorcio.historico.push({
    mes: mesAtualNome(),
    sorteado: nomeSorteado,
    valor: valorDoMes,
    data: new Date().toLocaleDateString("pt-BR")
  });

  // ➕ Avança o mês
  consorcio.mesIndex = (consorcio.mesIndex + 1) % 12;

  salvar();

  resultado.textContent =
    `🎉 ${nomeSorteado} foi sorteado e recebeu R$ ${valorDoMes.toFixed(2)}`;
}
