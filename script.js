const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonID = document.getElementById("pokemon-id");
const weightElement = document.getElementById("weight");
const heightElement = document.getElementById("height");
const typesElement = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-image");

searchBtn.addEventListener("click", () => {
  const input = searchInput.value.toLowerCase().trim();
  requestData(input);
});

const requestData = async (input) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    if (!res.ok) throw new Error("Pokémon not found");
    const data = await res.json();
    formatData(data);
  } catch (err) {
    console.error(err);
    alert("Pokémon not found");
  }
};

const formatData = (data) => {
  const { height, weight, name, id, stats, types, sprites } = data;

  pokemonName.textContent = name.toUpperCase();
  pokemonID.textContent = `${id}`;
  weightElement.textContent = `Weight: ${weight}`;
  heightElement.textContent = `Height: ${height}`;

  hp.textContent = stats[0].base_stat;
  attack.textContent = stats[1].base_stat;
  defense.textContent = stats[2].base_stat;
  specialAttack.textContent = stats[3].base_stat;
  specialDefense.textContent = stats[4].base_stat;
  speed.textContent = stats[5].base_stat;

  typesElement.innerHTML = "";
  types.forEach((typeInfo) => {
    const typeElement = document.createElement("div");
    typeElement.textContent = typeInfo.type.name.toUpperCase();
    typesElement.appendChild(typeElement);
  });

  spriteContainer.innerHTML = "";
  const spriteImg = document.createElement("img");
  spriteImg.id = "sprite";
  spriteImg.src = sprites.front_default;
  spriteContainer.appendChild(spriteImg);
};
