// Constante que define o identificador para o localStorage
const localStorageId = 'to-do-list';

// Função para validar se uma tarefa já existe no localStorage
function validarTask() {
    // Obtém os valores do localStorage e converte para array (ou usa um array vazio se não houver dados)
    let values = JSON.parse(localStorage.getItem(localStorageId) || '[]');
    // Obtém o valor do input
    let inputValue = document.getElementById('input-add').value;
    // Verifica se a tarefa já existe no array de valores
    let exists = values.find(x => x.name == inputValue);
    // Retorna true se a tarefa já existe, senão retorna false
    return exists ? true : false;
}

// Função para adicionar uma nova tarefa
function newTask() {
    // Obtém a referência ao elemento de input
    let input = document.getElementById('input-add');
    // Remove a borda vermelha, caso esteja presente
    input.style.border = '';

    // Validação: Se o input estiver vazio, exibe um alerta e destaca o input com borda vermelha
    if (!input.value) {
        input.style.border = '1px solid red';
        alert("Digite algo para inserir na sua lista");
    }
    // Se a tarefa já existir, exibe um alerta
    else if (validarTask()) {
        alert("Task já existente");
    } else {
        // Incrementa os dados (tasks) no localStorage
        let values = JSON.parse(localStorage.getItem(localStorageId) || '[]');
        // Adiciona a nova tarefa ao array de valores
        values.push({
            name: input.value
        });
        // Atualiza o localStorage com os novos valores
        localStorage.setItem(localStorageId, JSON.stringify(values));
        // Exibe as tarefas atualizadas
        showValues();
        // Limpa o conteúdo do input
        input.value = '';
    }
}

// Função para exibir as tarefas na lista
function showValues() {
    // Obtém os valores do localStorage e converte para array (ou usa um array vazio se não houver dados)
    let values = JSON.parse(localStorage.getItem(localStorageId) || '[]');
    // Obtém a referência à lista no HTML
    let list = document.getElementById('to-do-list');
    // Limpa o conteúdo da lista
    list.innerHTML = '';

    // Itera sobre as tarefas e adiciona cada uma à lista no HTML
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li> ${values[i]['name']} <button id="btn-delete" onclick="removeItem('${values[i]['name']}')"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
      </svg> </button> </li>`;
    }
}

// Função para remover uma tarefa
function removeItem(data) {
    // Obtém os valores do localStorage e converte para array (ou usa um array vazio se não houver dados)
    let values = JSON.parse(localStorage.getItem(localStorageId) || '[]');
    // Encontra o índice da tarefa a ser removida no array
    let index = values.findIndex(x => x.name == data);
    // Remove a tarefa do array
    values.splice(index, 1);
    // Atualiza o localStorage com os valores atualizados
    localStorage.setItem(localStorageId, JSON.stringify(values));
    // Exibe as tarefas atualizadas
    showValues();
}

// Exibe as tarefas quando a página é carregada
showValues();
