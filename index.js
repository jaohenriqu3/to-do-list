const localStorageId = 'to-do-list'

function validarTask(){
    let values = JSON.parse(localStorage.getItem(localStorageId) || '[]')
    let inputValue = document.getElementById('input-add').value
    let exists = values.find(x => x.name == inputValue) 
    return !exists ? false : true 
}

function newTask(){ 
    let input = document.getElementById('input-add')
    input.style.border = ''
    
    //Validação 
    if(!input.value) {
        input.style.border = '1px solid red'
        alert("Digite algo para inserir na sua lista")
    }

    else if(validarTask()){
        alert("Task já existente")
    }
    else {

        // Incrementando os dados(tasks) no localStorage (Armazenamento das informações no navegador)
        let values = JSON.parse(localStorage.getItem(localStorageId) || '[]')
        values.push({
            name: input.value
        })
        console.log(values) 
        localStorage.setItem(localStorageId,JSON.stringify(values))
        showValues()
        input.value = ''
    }
}

function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageId) || '[]')
    let list = document.getElementById('to-do-list')
    list.innerHTML = '' 

    for(let i = 0; i < values.length; i++){

        list.innerHTML += `<li> ${values[i]['name']} <button id="btn-delete" onclick="removeItem('${values[i]['name']}')"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
      </svg> </button> </li>`; 
    }
}

function removeItem(data){ 
    let values = JSON.parse(localStorage.getItem(localStorageId) || '[]')
    let index = values.findIndex(x => x.name == data) 
    values.splice(index,1) 
    localStorage.setItem(localStorageId,JSON.stringify(values)) 
    showValues()
}

showValues() 
