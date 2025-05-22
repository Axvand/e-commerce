import RenderPanfletosCartoes from "./panfletoecartao.js";
import RenderBlocos from "./blocos.js";
import RenderLonasPlacas from "./lonasEPlacas.js";
import RenderAdesivosDiversos from "./adesivos.js";
import PesquisaProds from "./scriptPesq.js";
//renderização panfletos e cartões de visita========Carrossel 1 e 2:
RenderPanfletosCartoes();
//renderização blocos e comandas========Carrossel 3 :
RenderBlocos();
// renderização Placas e LOnas=========Carrossel 4 e 5
RenderLonasPlacas();
// Adesivos diversos======================Carrossel 4, 5, 6, 7
RenderAdesivosDiversos();
// =======================pesq=========
PesquisaProds();
// ======================================
let currentSlide = 1;
const totalSlides = 3;

setInterval(() => {
  currentSlide = (currentSlide % totalSlides) + 1;
  document.getElementById("btn3-" + currentSlide).checked = true;
}, 3000);
