function RenderPanfletosCartoes() {
  //renderização panfletos e cartões de visita========Carrossel 1 e 2
  const numberCarrossel = 6;
  const numberCarrossel2 = 7;
  fetch("./Panfletos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o JSON: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const wrapper = document.querySelectorAll(".cards-wrapper");

      data.produtos.forEach((produto) => {
        if (produto.valores) {
          // Produto com valores por quantidade (ex: panfletos)
          Object.keys(produto.valores).forEach((quantidade) => {
            produto.valores[quantidade].forEach((item) => {
              const card = document.createElement("div");
              card.className = "product-card";

              card.innerHTML = `
            <img src="Imagens/${item.img}" alt="${
                produto.material
              }" height="90px" />
            <h3>${produto.material} ${quantidade} un.</h3>
            <p style="font-size:13px">${item.impressao}</p>
            <p class="price">R$ ${item.preco.toFixed(2)}</p>
            <div class="size-selector">
              <select class="form-select">
                <option value="${item.formato}">${item.formato}</option>
              </select>
            </div>
            <a class="btn-whatsapp" style='text-align:center;' href="https://wa.me/+556193265219?text=${MsgWhatsapp(
              produto.material,
              quantidade,
              item.formato
            )}" target="_blank">Consultar WhatsApp</a>
            `;

              // <button class="btn btn-primary">Comprar</button>
              function MsgWhatsapp(produto, descricao, formato) {
                let msg = `Olá, estou interesado nos ${produto}. Quantidade:${descricao} e formato:${formato}. Gostaria de mais informações?`;
                return msg;
              }
              wrapper[numberCarrossel].appendChild(card); //configuração de mudança de posição!
            });
          });
        } else if (produto.opcoes) {
          // Produto com lista de opções (ex: cartões de visita)
          produto.opcoes.forEach((opcao) => {
            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
          <img src="Imagens/${opcao.img}" alt="${
              produto.material
            }" height="90px" />
          <h3>${produto.material}</h3>
          <p style="font-size:13px">${opcao.descricao}</p>
          <p class="price">consulte no WhatsApp</p>
          <div class="size-selector">
            <select class="form-select">
              <option value="">${produto.formato || "Tamanho único"}</option>
            </select>
          </div>
          </p>
          <a class="btn-whatsapp" style='text-align:center;' href="https://wa.me/5511999999999?text=${MsgWhatsapp(
            produto.material,
            opcao.descricao
          )};" target="_blank">Consultar WhatsApp</a>
          
          `;
            function MsgWhatsapp(produto, descricao) {
              let msg = `Olá, estou interesado nos ${produto}. Poderia me dar mais detalhes?`;
              return msg;
            }
            wrapper[numberCarrossel2].appendChild(card);
            // <button class="btn btn-primary">Comprar</button>;
          });
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });
}

export default RenderPanfletosCartoes;
