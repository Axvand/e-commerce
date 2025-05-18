function RenderLonasPlacas() {
  fetch("./lonas.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o JSON: ${response.status}`);
      }
      return response.json();
    })
    .then((produto) => {
      const wrapper = document.querySelectorAll(".cards-wrapper");
      console.log(wrapper);
      produto.categorias.forEach((categoria) => {
        categoria.formatos.forEach((formatoObj) => {
          const card = document.createElement("div");
          card.className = "product-card";
          card.style.height = "350px";

          // Lógica de preço
          let precoTexto = "";
          let precoNumber = 0;

          if ("preco" in formatoObj) {
            precoNumber = formatoObj.preco;
            precoTexto = `R$ ${precoNumber.toFixed(2)}`;
          } else if ("preco_por_m2" in formatoObj) {
            precoNumber = formatoObj.preco_por_m2;
            precoTexto = `R$ ${precoNumber.toFixed(2)} / m²`;
          } else if ("preco_por_m2_variavel" in formatoObj) {
            const min = formatoObj.preco_por_m2_variavel.min;
            const max = formatoObj.preco_por_m2_variavel.max;
            precoTexto = `R$ ${min.toFixed(2)} a <br>R$ ${max.toFixed(2)} / m²`;
          }

          card.innerHTML = `
          <img src="Imagens/${formatoObj.img}" alt="${
            produto.material
          }" height="90px" />
          <h3>${categoria.tipo}</h3>
          <p style="font-size:14px">${formatoObj.formato}</p>
          ${
            categoria.obs
              ? `<p style="font-size:13px; color:#888">${categoria.obs}</p>`
              : ""
          }
          <p class="price">${precoTexto}</p>
          <button class="btn btn-primary">Comprar</button>
        `;

          wrapper[3].appendChild(card);
        });
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });

  // ================== Placas ==========================
  fetch("./placas.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o JSON: ${response.status}`);
      }
      return response.json();
    })
    .then((produto) => {
      const wrapper = document.querySelectorAll(".cards-wrapper");

      produto.categorias.forEach((categoria, i) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.style.height = "350px";

        const primeiraOpcao = categoria.formatos[0];

        // Criar opções do dropdown
        const options = categoria.formatos
          .map((f, index) => `<option value="${index}">${f.formato}</option>`)
          .join("");

        card.innerHTML = `
        <img src="Imagens/${primeiraOpcao.img}" alt="${
          categoria.tipo
        }" height="90px" />
        <h3 style=>${produto.material}<br><span style="font-size: 14px;">${
          categoria.tipo
        }</span></h3>
        <p style="font-size:13px">${categoria.obs || ""}</p>
        <p class="price">R$ ${primeiraOpcao.preco.toFixed(2)}</p>
        <div class="size-selector">
          <select class="form-select">
            ${options}
          </select>
        </div>
        <button class="btn btn-primary">Comprar</button>
      `;

        // Eventos para trocar preço e imagem conforme o formato selecionado
        const select = card.querySelector("select");
        const priceTag = card.querySelector(".price");
        const imgTag = card.querySelector("img");

        select.addEventListener("change", (event) => {
          const index = event.target.value;
          const formatoSelecionado = categoria.formatos[index];
          priceTag.textContent = `R$ ${formatoSelecionado.preco.toFixed(2)}`;
          imgTag.src = `Imagens/${formatoSelecionado.img}`;
        });

        wrapper[4].appendChild(card); // ou [i] se quiser separar os grupos
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });
}

export default RenderLonasPlacas;
