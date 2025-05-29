function RenderAdesivosDiversos() {
  const carrosselNumber1 = 1;
  const preçoMensagem = "Faça um Orçamento";
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
      wrapper[carrosselNumber1].innerHTML = "";

      produto.opcoes.forEach((opcao, index) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.style.height = "350px";
        // =======
        // =======
        // <p class="price">R$ ${opcao.preco.toFixed(2)}</p>
        // =======
        // =======

        card.innerHTML = `
        <img src="Imagens/${opcao.img}" alt="${
          produto.material
        }" height="90px" />
        <h3>${produto.material}</h3>
        <p style="font-size:13px">${opcao.descricao}</p>
        <p class="price">${preçoMensagem}</p>
       <a class="btn-whatsapp" style='text-align:center;' href="https://wa.me/+556193265219?text=${MsgWhatsapp(
         produto.material,
         opcao.descricao
       )}"  target="_blank">Consultar WhatsApp</a>
      `;

        function MsgWhatsapp(produto, formato, quantidade) {
          let msg = `Olá, estou interesado nos ${produto} de descrição:${formato}. Poderia me dar mais detalhes?`;
          return msg;
        }

        wrapper[carrosselNumber1].appendChild(card);

        function WhatsAppMessage(Produto) {
          let message = ``;
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });

  const wrapper = document.querySelectorAll(".cards-wrapper");
  console.log(wrapper);

  // ===============Carrossel2 adesivos Vidro======================
  const carrosselNumber2 = 2;
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
      wrapper[carrosselNumber2].innerHTML = "";

      produto.formatos.forEach((formatoObj) => {
        const variacao = formatoObj.variacoes[0]; // primeira variação

        const card = document.createElement("div");
        card.className = "product-card";
        card.style.height = "350px";

        //  ==========
        //  ==========
        // <p class="price">R$ ${variacao.preco.toFixed(2)}</p>
        //  ==========
        //  ==========

        card.innerHTML = `
              <img src="Imagens/${variacao.img}" alt="${
          produto.material
        }" height="90px" />
              <h3>${produto.material} <br> Tamanho: ${formatoObj.formato}</h3>
              <p class="price">${preçoMensagem}</p>
             <a class="btn-whatsapp" style='text-align:center;' href="https://wa.me/+556193265219?text=${MsgWhatsapp(
               produto.material,
               formatoObj.formato
             )}"  target="_blank">Consultar WhatsApp2</a>
      `;

        function MsgWhatsapp(produto, formato, quantidade) {
          let msg = `Olá, estou interesado nos ${produto} de tamanho: ${formato}. Poderia me dar mais detalhes?`;
          return msg;
        }

        wrapper[carrosselNumber2].appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });

  // ===============Carrossel3 adesivos Troca de óleo======================
  const carrosselNumber3 = 3;
  fetch("./adesivosPlotterRecorte.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o JSON: ${response.status}`);
      }
      return response.json();
    })
    .then((produtos) => {
      const wrapper = document.querySelectorAll(".cards-wrapper");
      wrapper[carrosselNumber3].innerHTML = "";

      produtos.forEach((produto, produtoIndex) => {
        // Para os dois primeiros produtos: dois cards com select dinâmico
        if (produtoIndex < 2) {
          produto.formatos.slice(0, 2).forEach((formatoObj) => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.style.height = "350px";

            const primeiraVariacao = formatoObj.variacoes[0];
            const options = formatoObj.variacoes
              .map(
                (v, i) => `<option value="${i}">${v.quantidade} un.</option>`
              )
              .join("");
            // ============
            // ============
            // <p class="price">R$ ${primeiraVariacao.preco.toFixed(2)}</p>
            // <div class="size-selector">
            //   <select class="form-select">${options}</select>
            // </div>
            // ============
            // ============

            card.innerHTML = `
            <img src="Imagens/${primeiraVariacao.img}" alt="${
              produto.material
            }" height="90px" />
            <h3>${produto.material} <br> Tamanho: ${formatoObj.formato}</h3>
            <p class="price">${preçoMensagem}</p>
            <div class="size-selector">
              <select class="form-select">${options}</select>
            </div>
            <a class="btn-whatsapp" style='text-align:center;' href="https://wa.me/+556193265219?text=${MsgWhatsapp(
              produto.material,
              formatoObj.formato
            )}"  target="_blank">Consultar WhatsApp</a>
      `;

            function MsgWhatsapp(produto, formato, quantidade) {
              let msg = `Olá, estou interesado nos ${produto} de tamanho: ${formato}. Poderia me dar mais detalhes?`;
              return msg;
            }

            const select = card.querySelector("select");
            const priceTag = card.querySelector(".price");
            const imgTag = card.querySelector("img");

            select.addEventListener("change", (event) => {
              const index = event.target.value;
              const variacaoSelecionada = formatoObj.variacoes[index];
              priceTag.textContent = `R$ ${variacaoSelecionada.preco.toFixed(
                2
              )}`;
              imgTag.src = `Imagens/${variacaoSelecionada.img}`;
            });

            wrapper[carrosselNumber3].appendChild(card);
          });
        } else {
          // Para os demais produtos: um card por variação (sem select)
          produto.formatos.forEach((formatoObj) => {
            formatoObj.variacoes.forEach((variacao) => {
              const card = document.createElement("div");
              card.className = "product-card";
              card.style.height = "350px";
              // ========
              // ========
              // <p class="price">R$ ${variacao.preco.toFixed(2)}</p>
              // <p>${variacao.quantidade} un.</p>
              // ========
              // ========

              card.innerHTML = `
              <img src="Imagens/${variacao.img}" alt="${
                produto.material
              }" height="90px" />
              <h3>${produto.material} <br> Tamanho: ${formatoObj.formato}</h3>
              <p class="price">R$ ${variacao.preco.toFixed(2)}</p>
              <p>${variacao.quantidade} un.</p>
              <a class="btn-whatsapp" style='text-align:center;' href="https://wa.me/+556193265219?text=${MsgWhatsapp(
                produto.material,
                formatoObj.formato
              )}"  target="_blank">Consultar WhatsApp</a>
      `;

              function MsgWhatsapp(produto, formato, quantidade) {
                let msg = `Olá, estou interesado nos ${produto}. Poderia me dar mais detalhes?`;
                return msg;
              }

              wrapper[6].appendChild(card);
            });
          });
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });
  // ====================================================
  const carrosselNumber4 = 4;
  fetch("./adesivosPlotterRecorte2.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o JSON: ${response.status}`);
      }
      return response.json();
    })
    .then((produto) => {
      const wrapper = document.querySelectorAll(".cards-wrapper");

      // Limpa o container antes
      wrapper[carrosselNumber4].innerHTML = "";

      produto.formatos.forEach((formatoObj, index) => {
        const primeiraVariacao = formatoObj.variacoes[0];

        const card = document.createElement("div");
        card.className = "product-card";
        card.style.height = "400px";

        const selectId = `select-${index}`;
        const imgId = `img-${index}`;
        const priceId = `price-${index}`;

        // Cria opções do select dinamicamente
        // ========
        // <p id="${priceId}" class="price">R$ ${primeiraVariacao.preco.toFixed(
        //   2
        // )}</p>
        // ========
        const options = formatoObj.variacoes.map(
          (v, i) => `<option value="${i}">${v.quantidade} un.</option>`
        );

        // ========
        card.innerHTML = `
        <img id="${imgId}" src="Imagens/${primeiraVariacao.img}" alt="${
          produto.material
        }" height="90px" />
        <h3>${produto.material} <br> Tamanho: ${formatoObj.formato}</h3>
        <select id="${selectId}" display="none" class="form-select mb-2">
          ${options.join("")}
        </select>
        <p id="" class="price">Faça um Orçamento</p>
         <a class="btn-whatsapp" style='text-align:center;' href="https://wa.me/+556193265219?text=${MsgWhatsapp(
           produto.material,
           formatoObj.formato
         )}"  target="_blank">Consultar WhatsApp</a>
      `;

        function MsgWhatsapp(produto, formato, quantidade) {
          let msg = `Olá, estou interesado nos ${produto} de tamanho: ${formato}. Poderia me dar mais detalhes?`;
          return msg;
        }

        // Adiciona comportamento dinâmico ao select
        setTimeout(() => {
          const select = document.getElementById(selectId);
          const img = document.getElementById(imgId);
          const price = document.getElementById(priceId);

          select.addEventListener("change", (e) => {
            const variacao = formatoObj.variacoes[e.target.value];
            img.src = `Imagens/${variacao.img}`;
            price.textContent = `R$ ${variacao.preco.toFixed(2)}`;
          });
        }, 0);

        wrapper[carrosselNumber4].appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });
}

export default RenderAdesivosDiversos;
