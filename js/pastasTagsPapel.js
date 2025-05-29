function SetAtributeElements() {
  const pastasTagsPapel = document.querySelectorAll("slide3-link");

  const mensagemLetra1 =
    "Olá, estou interessado nos papeis timbrados. Poderia me dá mais informações.";
  const mensagemLetra2 =
    "Olá, estou interessado nas tags. Poderia me dá mais informações.";
  const mensagemLetra3 =
    "Olá, estou interessado nas pastas. Poderia me dá mais informações.";

  function SetAtribute(element, message) {
    element.href = `https://wa.me/+556193265219?text=${message}`;
    element.target = "_blank";
  }

  SetAtribute(pastasTagsPapel[2], mensagemLetra1);
  SetAtribute(pastasTagsPapel[1], mensagemLetra2);
  SetAtribute(pastasTagsPapel[2], mensagemLetra3);
}

export default SetAtributeElements;
