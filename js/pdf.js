function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Relatório do Consórcio", 20, 20);

  doc.setFontSize(12);
  let y = 40;

  if (consorcio.historico.length === 0) {
    doc.text("Nenhum sorteio realizado.", 20, y);
  } else {
    consorcio.historico.forEach(item => {
      doc.text(
        `Mês ${item.mes} - ${item.sorteado} - R$ ${item.valor.toFixed(2)}`,
        20,
        y
      );
      y += 10;
    });
  }

  doc.save("relatorio_consorcio.pdf");
}
