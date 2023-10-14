let currentId = randomId();
let url = `https://rickandmortyapi.com/api/character/${currentId}`;

document.addEventListener("DOMContentLoaded", function() {
  fetchCharInfo();
});

function fetchCharInfo(){
  fetch(url)
  .then(response => {
    if(!response.ok){
      throw new Error("Erro na solicitação da API.");
    }
    return response.json();
  })
  .then(charData => {
    document.getElementById("character-image").src = charData.image;
    document.getElementById("character-name").textContent = charData.name;
    document.getElementById("character-status").textContent = charData.status;
    checkStatus();
    document.getElementById("character-specie").textContent = charData.species;
    document.getElementById("character-location").textContent = charData.location.name;
    fetch(charData.episode[0])
    .then(response => {
      if(!response.ok){
        throw new Error("Erro no fetch do episódio.")
      }
      return response.json();
    })
    .then(epData => {
      document.getElementById("character-episode").textContent = epData.name;
    })
  })
}

function changeChar(){
  newId = randomId();
  currentId = newId
  url = `https://rickandmortyapi.com/api/character/${currentId}`;
  fetchCharInfo();
}

function randomId(){
  return Math.floor(Math.random() * 826);
}

function checkStatus(){
  const status = document.getElementById("character-status").textContent;
  const icon = document.getElementById("status-icon");
  if(status === "Alive"){
    icon.src = "/assets/icons/alive.png"    
  } else if (status === "Dead"){
    icon.src = "/assets/icons/dead.png"
  } else {
    icon.src = "/assets/icons/unknown.png"
  }
}