function populateUfs(){
    const ufSelect = document.querySelector("[name=uf]")    
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res=> res.json())
    .then(states=> {

        for (let state  of states){
            
            ufSelect.innerHTML +=`<option value="${state.id}">${state.nome}</option>`
        }

    })

}

populateUfs()


function getCities(evevt){

    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value 

    //obtendo o index da uf selecionada 
    const indexOfSelectedState = event.target.selectedIndex 
    //obtendo o nome do estado selecionado atraves no indice e guardando em um iput hidden
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
     
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res=> res.json())
    .then(cities =>{
        for (city of cities){
            citySelect.innerHTML +=`<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities)

    console.log("OK");

// Itens de coleta
// pegar tos os  li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    // funçao passada como referencia
    item.addEventListener("click",handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    console.log(itemLi)
    // adicionar ou remover uma classe com java script
    itemLi.classList.toggle("selected")
     
    const itemId = itemLi.dataset.id

    // Verificar se existem itens selecionados, se sim 
    // Pegar os  itens  selecionados  

    const alreadySelected = selectedItems.findIndex(item => {
        //isso será true ou false
        return  item == itemId
    })

    // se já estiver selecionado 
     if (alreadySelected >= 0){
        //tirar da seleçao
        const filteredItems = selectedItems.filter(item=>{
            return item != itemId     
        })
        selectedItems = filteredItems
        
     } else {
          //se não estiver selecionado adicionar à seleçao
          selectedItems.push(itemId)
     }
     
    // atualizar o campo escondido com os itens  selecionados  
    collectedItems.value = selectedItems
    
}