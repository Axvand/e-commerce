function RenderBlocos() {
  fetch("./blocos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar o JSON: ${response.status}`);
      }
      return response.json();
    })
    .then((produto) => {
      const wrapper = document.querySelectorAll(".cards-wrapper");

      produto.formatos.forEach((formatoObj) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.style.height = "350px";

        // Pegamos a primeira variação como default
        const primeiraVariacao = formatoObj.variacoes[0];

        // Criar opções do select
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
        <h3>${produto.material} <br> Tamanho:${formatoObj.formato}</h3>
        <p style="font-size:13px">${produto.impressao}</p>
        <p class="price" >R$ ${primeiraVariacao.preco.toFixed(2)}</p>
        <div class="size-selector">
          <select class="form-select">
            ${options}
          </select>
        </div>
        <a class="btn-whatsapp" style='text-align:center;' href="https://wa.me/+556193265219?text=${MsgWhatsapp(
          produto.material,
          formatoObj.formato
        )}" target="_blank">Consultar WhatsApp</a>
      `;

        function MsgWhatsapp(produto, formato, quantidade) {
          let msg = `Olá, estou interesado nas ${produto} de tamanho:${formato}. Poderia me dar mais detalhes?`;
          return msg;
        }

        // Adiciona evento para trocar o preço quando selecionar nova quantidade
        const select = card.querySelector("select");
        const priceTag = card.querySelector(".price");
        const imgTag = card.querySelector("img");

        select.addEventListener("change", (event) => {
          const index = event.target.value;
          const variacaoSelecionada = formatoObj.variacoes[index];

          priceTag.textContent = `R$ ${variacaoSelecionada.preco.toFixed(2)}`;
          imgTag.src = `Imagens/${variacaoSelecionada.img}`;
        });

        wrapper[2].appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
    });
}

export default RenderBlocos;
