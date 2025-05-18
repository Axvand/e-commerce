function RenderAdesivosDiversos() {
  fetch("./adesivos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o JSON: ${response.status}`);
      }
      return response.json();
    })
    .then((produto) => {
      const wrapper = document.querySelectorAll(".cards-wrapper");

      // Limpar wrapper antes (opcional)
      wrapper.innerHTML = "";

      produto.opcoes.forEach((opcao, index) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.style.height = "350px";

        card.innerHTML = `
        <img src="Imagens/${opcao.img}" alt="${
          produto.material
        }" height="90px" />
        <h3>${produto.material}</h3>
        <p style="font-size:13px">${opcao.descricao}</p>
        <p class="price">R$ ${opcao.preco.toFixed(2)}</p>
        <button class="btn btn-primary">Comprar</button>
      `;

        wrapper[5].appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });

  const wrapper = document.querySelectorAll(".cards-wrapper");
  console.log(wrapper);

  // ===============Carrossel2 adesivos Vidro======================
  fetch("./adesivosVidro.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o JSON: ${response.status}`);
      }
      return response.json();
    })
    .then((produto) => {
      const wrapper = document.querySelectorAll(".cards-wrapper");

      // Limpa o container antes
      wrapper[6].innerHTML = "";

      produto.formatos.forEach((formatoObj) => {
        const variacao = formatoObj.variacoes[0]; // primeira variação

        const card = document.createElement("div");
        card.className = "product-card";
        card.style.height = "350px";

        card.innerHTML = `
              <img src="Imagens/${variacao.img}" alt="${
          produto.material
        }" height="90px" />
              <h3>${produto.material} <br> Tamanho: ${formatoObj.formato}</h3>
              <p class="price">R$ ${variacao.preco.toFixed(2)}</p>
              <button class="btn btn-primary">Comprar</button>
            `;

        wrapper[6].appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });

  // ===============Carrossel3 adesivos Troca de óleo======================

  fetch("./adesivosTrocaDeOleo.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o JSON: ${response.status}`);
      }
      return response.json();
    })
    .then((produto) => {
      const wrapper = document.querySelectorAll(".cards-wrapper");
      wrapper[7].innerHTML = ""; // limpa conteúdo antigo

      produto.formatos.forEach((formatoObj) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.style.height = "350px";

        // Pega a primeira variação para exibir como padrão
        const primeiraVariacao = formatoObj.variacoes[0];

        // Gera as opções do select com quantidade
        const options = formatoObj.variacoes
          .map(
            (v, index) =>
              `<option value="${index}">${v.quantidade} un.</option>`
          )
          .join("");

        card.innerHTML = `
    <img src="Imagens/${primeiraVariacao.img}" alt="${
          produto.material
        }" height="90px" />
    <h3>${produto.material} <br> Tamanho: ${formatoObj.formato}</h3>
    <p class="price">R$ ${primeiraVariacao.preco.toFixed(2)}</p>
    <div class="size-selector">
      <select class="form-select">
        ${options}
      </select>
    </div>
    <button class="btn btn-primary">Comprar</button>
  `;

        // Atualiza preço e imagem ao mudar a seleção
        const select = card.querySelector("select");
        const priceTag = card.querySelector(".price");
        const imgTag = card.querySelector("img");

        select.addEventListener("change", (event) => {
          const index = event.target.value;
          const variacaoSelecionada = formatoObj.variacoes[index];
          priceTag.textContent = `R$ ${variacaoSelecionada.preco.toFixed(2)}`;
          imgTag.src = `Imagens/${variacaoSelecionada.img}`;
        });

        wrapper[7].appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });

  // ===============Carrossel4 adesivos Plotter Recorte======================
  fetch("./adesivosPlotterRecorte.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o JSON: ${response.status}`);
      }
      return response.json();
    })
    .then((produto) => {
      const wrapper = document.querySelectorAll(".cards-wrapper");
      wrapper[8].innerHTML = "";

      produto.formatos.forEach((formatoObj) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.style.height = "350px";

        const primeiraVariacao = formatoObj.variacoes[0];

        // Se tiver só 1 variação, não mostra select, só preço e imagem
        // Se tiver mais de 1 variação, cria select para escolher quantidade

        let selectHTML = "";

        if (formatoObj.variacoes.length > 1) {
          const options = formatoObj.variacoes
            .map(
              (v, idx) => `<option value="${idx}">${v.quantidade} un.</option>`
            )
            .join("");
          selectHTML = `
      <div class="size-selector">
        <select class="form-select">
          ${options}
        </select>
      </div>
    `;
        }

        card.innerHTML = `
    <img src="Imagens/${primeiraVariacao.img}" alt="${
          produto.material
        }" height="90px" />
    <h3>${produto.material} <br> Tamanho: ${formatoObj.formato}<br></h3>
    <p class="price">R$ ${primeiraVariacao.preco.toFixed(2)}</p>
    ${selectHTML}
    <button class="btn btn-primary">Comprar</button>
  `;

        if (formatoObj.variacoes.length > 1) {
          const select = card.querySelector("select");
          const priceTag = card.querySelector(".price");
          const imgTag = card.querySelector("img");

          select.addEventListener("change", (e) => {
            const idx = e.target.value;
            const v = formatoObj.variacoes[idx];
            priceTag.textContent = `R$ ${v.preco.toFixed(2)}`;
            imgTag.src = `Imagens/${v.img}`;
          });
        }

        wrapper[8].appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });
}

export default RenderAdesivosDiversos;
