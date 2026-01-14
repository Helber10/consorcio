verificarLogin();

if (!ehAdmin()) {
  alert("Apenas o admin pode acessar pagamentos");
  window.location.href = "dashboard.html";
}

// 🔹 Sempre pegar o mês ASSIM
function mesAtualPagamento() {
  return mesAtualNome();
}

const lista = document.getElementById("listaPagamentos");

// 🔄 Carregar status de pagamentos
function carregarPagamentos() {
  const mes = mesAtualPagamento(); // ✅ DECLARADO PRIMEIRO
  lista.innerHTML = "";

  consorcio.membros.forEach(m => {
    if (m.role === "admin") return;

    const pago = m.pagamentos[mes] === true;

    const li = document.createElement("li");
    li.textContent = `${m.nome} — ${pago ? "✅ Pago" : "❌ Pendente"}`;
    lista.appendChild(li);
  });
}

// ✅ Marcar todos como pagos
function marcarTodosPagos() {
  const mes = mesAtualPagamento(); // ✅ DECLARADO PRIMEIRO

  consorcio.membros.forEach(m => {
    if (m.role !== "admin") {
      m.pagamentos[mes] = true;
    }
  });

  salvar();
  carregarPagamentos();
  alert("Todos os membros foram marcados como pagos!");
}
