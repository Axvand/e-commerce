import RenderPanfletosCartoes from "./panfletoecartao.js";
import RenderBlocos from "./blocos.js";
import RenderLonasPlacas from "./lonasEPlacas.js";
import RenderAdesivosDiversos from "./adesivos.js";
import PesquisaProds from "./scriptPesq.js";
import SetAtributeElements from "./pastasTagsPapel.js";
//renderização panfletos e cartões de visita======== Só realocar tudo.
RenderPanfletosCartoes();
//renderização blocos e comandas========
RenderBlocos();
// renderização Placas e LOnas=========
RenderLonasPlacas();
// Adesivos diversos======================Carrossel 4, 5, 6, 7
RenderAdesivosDiversos();
// =======================pesq=========
PesquisaProds();
// ======================================
// SetAtributeElements();
// ======================================
let currentSlide = 1;
const totalSlides = 3;

setInterval(() => {
  currentSlide = (currentSlide % totalSlides) + 1;
  document.getElementById("btn3-" + currentSlide).checked = true;
}, 3000);
