const form = document.getElementById("form-js");

const pokeFunction = async () => {
  const inputPoke = document.getElementById("poke-name-js");
  const inputName = inputPoke.value;
  const result = document.getElementById("result-js");
  result.innerHTML = "";

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${inputName}`;
    const response = await fetch(url);
    const data = await response.json();

    const pokeName = document.createElement("p");
    pokeName.textContent = `Name: ${data.name}`;

    const pokeImg = document.createElement("img");
    pokeImg.src = data.sprites.front_default;
    pokeImg.alt = data.name;

    const pokeId = document.createElement("p");
    pokeId.textContent = `ID: ${data.id}`;

    const pokeType = document.createElement("p");
    pokeType.textContent = `Type: ${data.types.map((typeInfo) => typeInfo.type.name).join(", ")}`;

    result.append(pokeName, pokeImg, pokeId, pokeType);
  } catch (error) {
    alert("通信に失敗しました");
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  pokeFunction();
});
