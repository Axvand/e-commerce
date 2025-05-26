function RenderLonasPlacas() {
  fetch("./lonas.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o JSON: ${response.status}`);
      }
      return response.json();
    })
    .then((produtos) => {
      const wrappers = document.querySelectorAll(".cards-wrapper");
      produtos.forEach((produto, produtoIndex) => {
        // Tratamento especial para o material "Placas em PS"
        if (produto.material === "Placas em PS") {
          produto.categorias.forEach((categoria, categoriaIndex) => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.style.height = "364px";
            // Cria o <select> para os formatos
            const selectId = `select-${produtoIndex}-${categoriaIndex}`;
            let optionsHTML = "";
            categoria.formatos.forEach((formato, i) => {
              optionsHTML += `<option value="${i}">${formato.formato}</option>`;
            });
            // Valor inicial
            const primeiroFormato = categoria.formatos[0];
            let precoTexto = `R$ ${primeiroFormato.preco.toFixed(2)}`;
            card.innerHTML = `
            <img src="Imagens/${
              primeiroFormato.img
            }" id="img-${selectId}" height="80px" />
            <h3>${categoria.tipo}</h3>
            ${
              categoria.obs
                ? `<p style="font-size:13px; color:#888">${categoria.obs}</p>`
                : ""
            }
            <p class="price" id="preco-${selectId}">${precoTexto}</p>
              <select class="form-select" id="${selectId}">
                ${optionsHTML}
              </select>
           <a class="btn-whatsapp" style='text-align:center;' href="https://wa.me/+556193265219?text=${MsgWhatsapp(
             categoria.tipo
           )}" target="_blank">Consultar WhatsApp</a>
      `;

            function MsgWhatsapp(produto) {
              let msg = `Olá, estou interesado nas ${produto}. Poderia me dar mais detalhes?`;
              return msg;
            }
            // Insere o card no wrapper[3] e wrapper[4]
            const wrapperIndex = categoriaIndex + 3;
            if (wrappers[3]) {
              wrappers[3].appendChild(card);
            } else {
              console.warn(`Wrapper[${wrapperIndex}] não encontrado.`);
            }
            // Adiciona evento de mudança ao select
            setTimeout(() => {
              const select = document.getElementById(selectId);
              const precoEl = document.getElementById(`preco-${selectId}`);
              const imgEl = document.getElementById(`img-${selectId}`);
              select.addEventListener("change", (e) => {
                const idx = parseInt(e.target.value);
                const formato = categoria.formatos[idx];
                precoEl.innerHTML = `R$ ${formato.preco.toFixed(2)}`;
                imgEl.src = `Imagens/${formato.img}`;
              });
            }, 0);
          });
        }
        // Para os demais produtos (ex: Banners, Lonas, etc.)
        else {
          produto.categorias.forEach((categoria) => {
            categoria.formatos.forEach((formatoObj) => {
              const card = document.createElement("div");
              card.className = "product-card";
              card.style.height = "365px";
              // Lógica de preço
              let precoTexto = "";
              if ("preco" in formatoObj) {
                precoTexto = `R$ ${formatoObj.preco.toFixed(2)}`;
              } else if ("preco_por_m2" in formatoObj) {
                precoTexto = `R$ ${formatoObj.preco_por_m2.toFixed(2)} / m²`;
              } else if ("preco_por_m2_variavel" in formatoObj) {
                const min = formatoObj.preco_por_m2_variavel.min;
                const max = formatoObj.preco_por_m2_variavel.max;
                precoTexto = `R$ ${min.toFixed(2)} a<br>R$ ${max.toFixed(
                  2
                )} / m²`;
              }
              card.innerHTML = `
              <img src="Imagens/${formatoObj.img}" alt="${
                produto.material
              }" height="110px" />
              <h3>${categoria.tipo}</h3>
              <p style="font-size:14px">${formatoObj.formato}</p>
              ${
                categoria.obs
                  ? `<p style="font-size:13px; color:#888">${categoria.obs}</p>`
                  : ""
              }
              <p class="price">${precoTexto}</p>
             <a class="btn-whatsapp" style='text-align:center;' href="https://wa.me/+556193265219?text=${MsgWhatsapp(
               categoria.tipo,
               formatoObj.formato
             )}" target="_blank">Consultar WhatsApp</a>
      `;

              function MsgWhatsapp(produto, formato, quantidade) {
                let msg = `Olá, estou interesado nos ${produto} de tamanho:${formato}. Poderia me dar mais detalhes?`;
                return msg;
              }
              // Exemplo: adicionando no wrapper[5] para frente
              const wrapperIndex = 3;
              if (wrappers[wrapperIndex]) {
                wrappers[wrapperIndex].appendChild(card);
              } else {
                console.warn(`Wrapper[${wrapperIndex}] não encontrado.`);
              }
            });
          });
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });
}

export default RenderLonasPlacas;
