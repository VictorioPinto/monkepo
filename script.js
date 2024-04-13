const imagem = document.getElementsByTagName("img")[0];
const ul = document.getElementsByTagName("ul")[0];
const input = document.getElementsByTagName("input")[0];
const h2 = document.getElementsByTagName("h2")[0];
let pokemonOriginal = {};

const fetchPokemon = async (id) => {
  let req = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  let data = await req.json();

  let name = data.name;
  let idPokemon = data.id;

  let genreal;

  if (idPokemon <= 151) {
    genreal = 1;
  } else if (idPokemon <= 251) {
    genreal = 2;
  } else if (idPokemon <= 386) {
    genreal = 3;
  } else if (idPokemon <= 493) {
    genreal = 4;
  } else if (idPokemon <= 649) {
    genreal = 5;
  } else if (idPokemon <= 721) {
    genreal = 6;
  } else if (idPokemon <= 809) {
    genreal = 7;
  } else if (idPokemon <= 898) {
    genreal = 8;
  } else {
    genreal = 9;
  }

  let type2 = data["types"][1]
    ? data["types"][1]["type"]["name"]
    : data["types"][0]["type"]["name"];

  pokemonOriginal.name = data.name;
  pokemonOriginal.genreal = genreal;
  pokemonOriginal.height = data.height / 10;
  pokemonOriginal.type1 = data["types"]["0"]["type"]["name"];
  pokemonOriginal.type2 = type2;
  pokemonOriginal.weight = data.weight / 10;
  console.log(pokemonOriginal);
};

const adivinhar = async (id) => {
  const req = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id.toLowerCase()}`
  );
  h2.textContent = "adivinhe o pokemon";
  const data = await req.json();
  const idPokemon = data.id;
  let tipo1 = data.types["0"].type.name;
  let tipo2;
  if (data.types["1"] == null) {
    tipo2 = data.types["0"].type.name;
  } else {
    tipo2 = data.types["1"].type.name;
  }
  let gen;

  if (idPokemon <= 151) {
    gen = 1;
  } else if (idPokemon <= 251) {
    gen = 2;
  } else if (idPokemon <= 386) {
    gen = 3;
  } else if (idPokemon <= 493) {
    gen = 4;
  } else if (idPokemon <= 649) {
    gen = 5;
  } else if (idPokemon <= 721) {
    gen = 6;
  } else if (idPokemon <= 809) {
    gen = 7;
  } else if (idPokemon <= 898) {
    gen = 8;
  } else {
    gen = 9;
  }
  let weight = data.weight / 10;
  let height = data.height / 10;

  ul.innerHTML += `<div class="${data.name} div" >
  <li> <img src="${data.sprites.front_default}" alt="">

  <li class="nome">
   ${data.name}
  </li>
  <li ${
    pokemonOriginal.genreal > gen
      ? 'class="cima errado gen"'
      : pokemonOriginal.genreal < gen
      ? 'class="baixo errado gen"'
      : 'class="certo gen"'
  } >
   ${gen} 
   <br> 
   GEN
   </li>
  <li  ${
    pokemonOriginal.type1 == data.types["0"].type.name
      ? 'class="certo tipo1"'
      : data.types["0"].type.name == pokemonOriginal.type2
      ? 'class="tipo1 amarelo"'
      : 'class="errado tipo1"'
  }>
  ${data.types["0"].type.name}
  </li>
  <li  ${seila(tipo1, tipo2)}"'
  >
  ${data.types["1"] ? data.types["1"].type.name : data.types["0"].type.name}
  </li>
  <li ${
    pokemonOriginal.weight > weight
      ? 'class="cima errado weight"'
      : pokemonOriginal.weight < weight
      ? 'class="baixo errado weight"'
      : 'class="certo weight"'
  }>
    <p>
      ${weight} <br />
      KG
    </p>
  </li>
  <li  ${
    pokemonOriginal.height > height
      ? 'class="cima errado height"'
      : pokemonOriginal.height < height
      ? 'class="baixo errado height"'
      : 'class="certo height"'
  }>
    <p>
      ${height} <br />
      M
    </p>
  </li>
</div>`;
  if (pokemonOriginal.name == data.name) {
    input.disabled = true;
  }

  const elementoDestino = document.getElementById(data.name);
};

document.addEventListener("DOMContentLoaded", () => {
  let id = Math.floor(Math.random() * 1025) + 1;

  fetchPokemon(id);
});

document.addEventListener("keydown", (key) => {
  if (key.code == "Enter") {
    adivinhar(input.value);
    input.value = "";
  }
});

function removerDiv() {
  var divsParaExcluir = document.querySelectorAll(".div");
  divsParaExcluir.forEach(function (div) {
    div.remove();
  });
}
const trocar = document.getElementById("Trocar");
trocar.onclick = function () {
  let id = Math.floor(Math.random() * 1025) + 1;
  fetchPokemon(id);
  removerDiv();
  input.disabled = false;
};
// async function teste() {
//   let req = await fetch(`https://pokeapi.co/api/v2/pokemon/mew`);

//   let data = await req.json();
//   console.log(data.types["1"]);
//   if (data.types["1"] == null) {
//     console.log("seila");
//   }
// }
function seila(tipo1, tipo2) {
  // console.log(pokemonOriginal.type1);
  // console.log(pokemonOriginal.type2);
  // console.log(tipo1);
  // console.log(tipo2);
  if (pokemonOriginal.type1 == pokemonOriginal.type2) {
    if (tipo2 == pokemonOriginal.type1) {
      return 'class="certo tipo2 a"';
    } else {
      return 'class="errado tipo2 a"';
    }
  } else if (tipo2 == pokemonOriginal.type2) {
    return 'class="certo tipo2 b"';
  } else if (tipo2 == pokemonOriginal.type1) {
    return 'class="amarelo tipo2"';
  } else {
    return 'class="errado tipo2 b"';
  }
}
