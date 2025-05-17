//renderização panfletos e cartões de visita========Carrossel 1 e 2
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
              <p style="font-size:13px">${item.impressao}</p>
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
            <p class="price">consulte no WhatsApp</p>
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

// ======================Carrossel 3 noCards==================

let currentSlide = 1;
const totalSlides = 3;

setInterval(() => {
  currentSlide = (currentSlide % totalSlides) + 1;
  document.getElementById("btn3-" + currentSlide).checked = true;
}, 3000);

// =================Carrossel 4 === Comandas e Blocos==========================

fetch("./produtos2.json")
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
          (v, index) => `<option value="${index}">${v.quantidade} un.</option>`
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
        <button class="btn btn-primary">Comprar</button>
      `;

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

// ================================navAdesivos===========================
// Mapeamento entre os valores/classes clicáveis e as classes das seções
// const mapCategoriaParaSecao = {
//   adesivos: "adesivos",
//   "adesivos-vidro": "adesivosVidro",
//   "adesivos-troca-oleo": "adesivosTrocaDeOleo",
//   "adesivos-plotter-recorte": "adesivosPlotterRecorte",
// };

// const menu = document.querySelector(".menu");
// const menuMobile = document.getElementById("categoria-adesivo");
// const container = document.querySelector(".produtosAdesivosConteiner");

// // Todas as seções dentro do container
// const secoes = container.children;

// // Função que esconde todas as seções e mostra só a da categoria escolhida
// function mostrarSecao(categoria) {
//   const classeSecaoParaMostrar = mapCategoriaParaSecao[categoria];
//   if (!classeSecaoParaMostrar) return;

//   for (const secao of secoes) {
//     if (secao.classList.contains(classeSecaoParaMostrar)) {
//       secao.style.display = "block";
//     } else {
//       secao.style.display = "none";
//     }
//   }

//   // Atualiza a classe ativa dos botões (adiciona 'active' na div clicada, remove nas outras)
//   const botoes = menu.querySelectorAll(".buttonSection");
//   botoes.forEach((botao) => {
//     if (botao.classList.contains(categoria)) {
//       botao.classList.add("active");
//     } else {
//       botao.classList.remove("active");
//     }
//   });

//   // Atualiza o select no menu mobile para manter sincronizado
//   if (menuMobile.value !== categoria) {
//     menuMobile.value = categoria;
//   }
// }

// // Event listener para clique no menu (divs)
// menu.addEventListener("click", (e) => {
//   const botao = e.target.closest(".buttonSection");
//   if (!botao) return;

//   // Detecta a categoria clicada, que é uma das classes do botão
//   const classes = [...botao.classList];
//   const categoria = classes.find((c) =>
//     Object.keys(mapCategoriaParaSecao).includes(c)
//   );
//   if (!categoria) return;

//   mostrarSecao(categoria);
// });

// // Event listener para change no select
// menuMobile.addEventListener("change", (e) => {
//   mostrarSecao(e.target.value);
// });

// // Ao carregar a página, mostra a primeira seção e ativa o botão correspondente
// window.addEventListener("DOMContentLoaded", () => {
//   mostrarSecao("adesivos");
// });
// ===============Carrossel1adesivos======================
// fetch("./adesivos.json")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`Erro ao carregar o JSON: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((produto) => {
//     const wrapper = document.querySelectorAll(".cards-wrapper");

//     // Limpar wrapper antes (opcional)
//     wrapper.innerHTML = "";

//     produto.opcoes.forEach((opcao, index) => {
//       const card = document.createElement("div");
//       card.className = "product-card";
//       card.style.height = "350px";

//       card.innerHTML = `
//         <img src="Imagens/${opcao.img}" alt="${
//         produto.material
//       }" height="90px" />
//         <h3>${produto.material}</h3>
//         <p style="font-size:13px">${opcao.descricao}</p>
//         <p class="price">R$ ${opcao.preco.toFixed(2)}</p>
//         <button class="btn btn-primary">Comprar</button>
//       `;

//       wrapper[3].appendChild(card);
//     });
//   })
//   .catch((error) => {
//     console.error("Erro ao carregar o arquivo JSON:", error);
//   });

// const wrapper = document.querySelectorAll(".cards-wrapper");
// console.log(wrapper);

// ===============Carrossel2 adesivos Vidro======================
// fetch("./adesivosVidro.json")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`Erro ao carregar o JSON: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((produto) => {
//     const wrapper = document.querySelectorAll(".cards-wrapper");

//     // Limpa o container antes
//     wrapper[4].innerHTML = "";

//     produto.formatos.forEach((formatoObj) => {
//       const variacao = formatoObj.variacoes[0]; // primeira variação

//       const card = document.createElement("div");
//       card.className = "product-card";
//       card.style.height = "350px";

//       card.innerHTML = `
//               <img src="Imagens/${variacao.img}" alt="${
//         produto.material
//       }" height="90px" />
//               <h3>${produto.material} <br> Tamanho: ${formatoObj.formato}</h3>
//               <p class="price">R$ ${variacao.preco.toFixed(2)}</p>
//               <button class="btn btn-primary">Comprar</button>
//             `;

//       wrapper[4].appendChild(card);
//     });
//   })
//   .catch((error) => {
//     console.error("Erro ao carregar o arquivo JSON:", error);
//   });

// ===============Carrossel3 adesivos Troca de óleo======================

// fetch("./adesivosTrocaDeOleo.json")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`Erro ao carregar o JSON: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((produto) => {
//     const wrapper = document.querySelectorAll(".cards-wrapper");
//     wrapper[5].innerHTML = ""; // limpa conteúdo antigo

//     produto.formatos.forEach((formatoObj) => {
//       const card = document.createElement("div");
//       card.className = "product-card";
//       card.style.height = "350px";

//       // Pega a primeira variação para exibir como padrão
//       const primeiraVariacao = formatoObj.variacoes[0];

//       // Gera as opções do select com quantidade
//       const options = formatoObj.variacoes
//         .map(
//           (v, index) => `<option value="${index}">${v.quantidade} un.</option>`
//         )
//         .join("");

//       card.innerHTML = `
//     <img src="Imagens/${primeiraVariacao.img}" alt="${
//         produto.material
//       }" height="90px" />
//     <h3>${produto.material} <br> Tamanho: ${formatoObj.formato}</h3>
//     <p class="price">R$ ${primeiraVariacao.preco.toFixed(2)}</p>
//     <div class="size-selector">
//       <select class="form-select">
//         ${options}
//       </select>
//     </div>
//     <button class="btn btn-primary">Comprar</button>
//   `;

//       // Atualiza preço e imagem ao mudar a seleção
//       const select = card.querySelector("select");
//       const priceTag = card.querySelector(".price");
//       const imgTag = card.querySelector("img");

//       select.addEventListener("change", (event) => {
//         const index = event.target.value;
//         const variacaoSelecionada = formatoObj.variacoes[index];
//         priceTag.textContent = `R$ ${variacaoSelecionada.preco.toFixed(2)}`;
//         imgTag.src = `Imagens/${variacaoSelecionada.img}`;
//       });

//       wrapper[5].appendChild(card);
//     });
//   })
//   .catch((error) => {
//     console.error("Erro ao carregar o arquivo JSON:", error);
//   });

// ===============Carrossel4 adesivos Plotter Recorte======================
// fetch("./adesivosPlotterRecorte.json")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`Erro ao carregar o JSON: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((produto) => {
//     const wrapper = document.querySelectorAll(".cards-wrapper");
//     wrapper[6].innerHTML = "";

//     produto.formatos.forEach((formatoObj) => {
//       const card = document.createElement("div");
//       card.className = "product-card";
//       card.style.height = "350px";

//       const primeiraVariacao = formatoObj.variacoes[0];

//       // Se tiver só 1 variação, não mostra select, só preço e imagem
//       // Se tiver mais de 1 variação, cria select para escolher quantidade

//       let selectHTML = "";

//       if (formatoObj.variacoes.length > 1) {
//         const options = formatoObj.variacoes
//           .map(
//             (v, idx) => `<option value="${idx}">${v.quantidade} un.</option>`
//           )
//           .join("");
//         selectHTML = `
//       <div class="size-selector">
//         <select class="form-select">
//           ${options}
//         </select>
//       </div>
//     `;
//       }

//       card.innerHTML = `
//     <img src="Imagens/${primeiraVariacao.img}" alt="${
//         produto.material
//       }" height="90px" />
//     <h3>${produto.material} <br> Tamanho: ${formatoObj.formato}<br></h3>
//     <p class="price">R$ ${primeiraVariacao.preco.toFixed(2)}</p>
//     ${selectHTML}
//     <button class="btn btn-primary">Comprar</button>
//   `;

//       if (formatoObj.variacoes.length > 1) {
//         const select = card.querySelector("select");
//         const priceTag = card.querySelector(".price");
//         const imgTag = card.querySelector("img");

//         select.addEventListener("change", (e) => {
//           const idx = e.target.value;
//           const v = formatoObj.variacoes[idx];
//           priceTag.textContent = `R$ ${v.preco.toFixed(2)}`;
//           imgTag.src = `Imagens/${v.img}`;
//         });
//       }

//       wrapper[6].appendChild(card);
//     });
//   })
//   .catch((error) => {
//     console.error("Erro ao carregar o arquivo JSON:", error);
//   });

// ================================navAdesivosFinal==========================
// ================================Placas e LOnas==========================
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
