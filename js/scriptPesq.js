function PesquisaProds() {
  const input = document.getElementById("search-input");
  const popup = document.getElementById("search-popup");
  const container = document.getElementById("results-container");

  const arquivos = [
    "./adesivos.json",
    "./adesivosPlotterRecorte.json",
    "./adesivosPlotterRecorte2.json",
    "./adesivosVidro.json",
    "./blocos.json",
    "./etiquetas.json",
    "./lonas.json",
    "./Panfletos.json",
  ];
  console.log("Atualizar");
  let produtosIndexados = [];

  async function carregarTodos() {
    const promises = arquivos.map((arq) =>
      fetch(arq).then((res) => res.json())
    );
    const resultados = await Promise.all(promises);

    resultados.forEach((data, index) => {
      const nomeArquivo = arquivos[index];

      if (Array.isArray(data)) {
        data.forEach((item) => indexarMaterial(item, nomeArquivo));
      } else if (data.produtos) {
        data.produtos.forEach((item) => indexarMaterial(item, nomeArquivo));
      } else {
        indexarMaterial(data, nomeArquivo);
      }
    });
  }

  function indexarMaterial(data, origem) {
    const nomeMaterial = data.material || "Produto";
    const imgDefault = data.img || "";

    // caso tenha "categorias"
    if (data.categorias) {
      data.categorias.forEach((cat) => {
        const tipo = cat.tipo || "";
        const obs = cat.obs || "";
        (cat.formatos || []).forEach((formato) => {
          produtosIndexados.push({
            nome: nomeMaterial,
            tipo: tipo,
            descricao: `${formato.formato || ""} ${obs}`,
            preco:
              formato.preco ||
              formato.preco_por_m2 ||
              (formato.preco_por_m2_variavel
                ? `${formato.preco_por_m2_variavel.min} - ${formato.preco_por_m2_variavel.max}`
                : ""),
            img: formato.img || imgDefault,
            origem,
          });
        });
      });
    }

    // caso tenha "formatos"
    if (data.formatos) {
      data.formatos.forEach((f) => {
        (f.variacoes || []).forEach((variacao) => {
          produtosIndexados.push({
            nome: nomeMaterial,
            tipo: f.formato || "",
            descricao: `${variacao.quantidade || ""} un`,
            preco: variacao.preco || "",
            img: variacao.img || imgDefault,
            origem,
          });
        });
      });
    }

    // caso tenha "opcoes"
    if (data.opcoes) {
      data.opcoes.forEach((o) => {
        produtosIndexados.push({
          nome: nomeMaterial,
          tipo: "",
          descricao: o.descricao || "",
          preco: o.preco || "",
          img: o.img || imgDefault,
          origem,
        });
      });
    }

    // caso tenha "valores"
    if (data.valores) {
      Object.entries(data.valores).forEach(([quantidade, lista]) => {
        lista.forEach((item) => {
          produtosIndexados.push({
            nome: nomeMaterial,
            tipo: item.formato || "",
            descricao: `${item.impressao || ""} - ${quantidade} un`,
            preco: item.preco,
            img: item.img || imgDefault,
            origem,
          });
        });
      });
    }

    // caso tenha "opcoes" no nível mais externo
    if (data.opcoes) {
      data.opcoes.forEach((o) => {
        produtosIndexados.push({
          nome: nomeMaterial,
          tipo: "",
          descricao: o.descricao,
          preco: o.preco,
          img: o.img || imgDefault,
          origem,
        });
      });
    }
  }

  function buscar(termo) {
    const t = termo.toLowerCase();
    return produtosIndexados.filter(
      (item) =>
        item.nome.toLowerCase().includes(t) ||
        item.tipo.toLowerCase().includes(t) ||
        item.descricao.toLowerCase().includes(t)
    );
  }

  function mostrarResultados(resultados) {
    if (resultados.length === 0) {
      popup.classList.add("hidden");
      return;
    }

    const html = resultados
      .map((r) => {
        const msg = encodeURIComponent(
          `Olá! Tenho interesse no produto:\n\n🛍 ${r.nome}\n📦 Tipo: ${
            r.tipo
          }\n📄 ${r.descricao}\n💰 Preço: ${
            typeof r.preco === "number" ? "R$ " + r.preco.toFixed(2) : r.preco
          }`
        );
        const linkWhatsApp = `https://wa.me/5511999999999?text=${msg}`; // Altere o número!

        return `
      <div class="card">
       <img src="https://axvand.github.io/e-commerce${r.img.replace(
         /\./g,
         ""
       )}" alt="${r.nome}" />
        <div class="card-info">
          <h3>${r.nome}</h3>
          <p><strong>Tipo:</strong> ${r.tipo}</p>
          <p><strong>Descrição:</strong> ${r.descricao}</p>
          <p><strong>Preço:</strong> ${
            typeof r.preco === "number" ? "R$ " + r.preco.toFixed(2) : r.preco
          }</p>
          <a class="btn-whatsapp" href="${linkWhatsApp}" target="_blank">Consultar WhatsApp</a>
          <p style="font-size: 0.75rem; color: #999;"><i>Fonte: ${
            r.origem
          }</i></p>
        </div>
      </div>
    `;
      })
      .join("");

    container.innerHTML = html;
    popup.classList.remove("hidden");
  }

  input.addEventListener("input", () => {
    const termo = input.value.trim();
    if (termo.length < 2) {
      popup.classList.add("hidden");
      return;
    }
    const resultados = buscar(termo);
    mostrarResultados(resultados);
  });

  // Fecha o popup se clicar fora dele
  document.addEventListener("click", function (event) {
    const isClickInsidePopup = popup.contains(event.target);
    const isSearchInput = input.contains(event.target);

    if (!isClickInsidePopup && !isSearchInput) {
      popup.classList.add("hidden");
    }
  });

  carregarTodos();
}
export default PesquisaProds;
