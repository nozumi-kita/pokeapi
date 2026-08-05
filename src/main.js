const form = document.getElementById("form-js");
const url = "https://pokeapi.co/api/v2/pokemon/";

const pokeFunction = async () => {
  const inputPoke = document.getElementById("poke-name-js");
  const inputName = inputPoke.value;
  const result = document.getElementById("result-js");
  result.innerHTML = "";

  try {
    const pokeUrl = `${url}${inputName}`;
    const responsePoke = await fetch(pokeUrl);
    const dataPoke = await responsePoke.json();

    const speciesUrl = dataPoke.species.url;
    const responseSpecies = await fetch(speciesUrl);
    const dataSpecies = await responseSpecies.json();

    renderPoke(dataPoke, result);

    if (dataSpecies.evolves_from_species) {
      const evolutionFromName = dataSpecies.evolves_from_species.name;
      const responseEvolutionFrom = await fetch(`${url}${evolutionFromName}`);
      const dataEvolutionFrom = await responseEvolutionFrom.json();

      renderPoke(dataEvolutionFrom, result, "進化前");
    }
  } catch (error) {
    alert("通信に失敗しました");
  }
};

const renderPoke = (data, result, evolve = "") => {
  if (evolve) {
    const evolveFrom = document.createElement("p");
    evolveFrom.textContent = evolve;
  }
  const pokeName = document.createElement("p");
  pokeName.textContent = `Name: ${data.name}`;

  const pokeImg = document.createElement("img");
  pokeImg.src = data.sprites.front_default;
  pokeImg.alt = data.name;

  const pokeId = document.createElement("p");
  pokeId.textContent = `ID: ${data.id}`;

  const pokeType = document.createElement("p");
  pokeType.textContent = `Type: ${data.types.map((typeInfo) => typeInfo.type.name).join(", ")}`;

  result.append(evolve, pokeName, pokeImg, pokeId, pokeType);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  pokeFunction();
});
