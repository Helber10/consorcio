function carregarHistorico() {
  const tbody = document.getElementById("historico");
  tbody.innerHTML = "";

  if (!consorcio.historico || consorcio.historico.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="3">Nenhum sorteio realizado</td>`;
    tbody.appendChild(tr);
    return;
  }

  consorcio.historico.forEach(h => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${h.mes}</td>
      <td>${h.sorteado}</td>
      <td>${h.valor.toFixed(2)}</td>
    `;

    tbody.appendChild(tr);
  });
}
