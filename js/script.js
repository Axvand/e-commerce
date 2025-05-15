//renderização panfletos e cartões de visita
fetch("./produtos.json")
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
              <p>${produto.impressao}</p>
              <p class="price">R$ ${item.preco.toFixed(2)}</p>
              <div class="size-selector">
                <select class="form-select">
                  <option value="${item.formato}">${item.formato}</option>
                </select>
              </div>
              <button class="btn btn-primary">Comprar</button>
            `;
            wrapper[0].appendChild(card);
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
            <p class="price">Preço: consulte no WhatsApp</p>
            <div class="size-selector">
              <select class="form-select">
                <option value="">${produto.formato || "Tamanho único"}</option>
              </select>
            </div>
            <button class="btn btn-primary">Comprar</button>
          `;
          wrapper[1].appendChild(card);
        });
      }
    });
  })
  .catch((error) => {
    console.error("Erro ao carregar o arquivo JSON:", error);
  });

// ======================Carrossel3==================

let currentSlide = 1;
const totalSlides = 3;

setInterval(() => {
  currentSlide = (currentSlide % totalSlides) + 1;
  document.getElementById("btn3-" + currentSlide).checked = true;
}, 3000);
