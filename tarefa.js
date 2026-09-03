// Projeto criado no intuito de aprender JS e JSON

// Carrega as tarefas salvas no navegador (localStorage)
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];  


// Função para salvar as tarefas no navegador
function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas)); //transforma em texto
}


// Função para detectar texto aleatório
function pareceAleatorio(str) {

  // Muitas consoantes seguidas
  if (/[bcdfghjklmnpqrstvwxyz]{5,}/i.test(str)) {
    return true;
  }

  // Poucas vogais
  let vogais = str.match(/[aeiou]/gi) || [];
  if (vogais.length < str.length * 0.3) {
    return true;
  }

  return false;
}


// Função para mostrar (renderizar) as tarefas
function renderizar() {
  let lista = document.getElementById("lista");  //pega o elemento pelo id
  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span style="text-decoration: ${tarefa.concluida ? "line-through" : "none"}">
        ${tarefa.titulo}
      </span>

      <button onclick="toggle(${index})">✔</button>
      <button onclick="editar(${index})">✏️</button>
      <button onclick="remover(${index})">❌</button>
    `;

    lista.appendChild(li);
  });
}


// Função para adicionar tarefa
function adicionarTarefa() {
  let input = document.getElementById("inputTarefa");
  let texto = input.value.trim();

  // Campo vazio
  if (texto === "") {
    alert("Digite uma tarefa!");
    return;
  }

  // Muito curto 
  if (texto.length < 3) {
    alert("Digite pelo menos 3 letras!");
    return;
  }

  // Letras repetidas
  if (/^(.)\1+$/.test(texto)) {
    alert("Digite algo mais significativo!");
    return;
  }

  // Texto aleatório
  if (pareceAleatorio(texto)) {
    alert("Digite uma tarefa válida!");
    return;
  }

  // Adiciona tarefa
  tarefas.push({
    titulo: texto,
    concluida: false
  });

  input.value = "";
  salvar();
  renderizar();
}


// Remover tarefa
function remover(index) {
  tarefas.splice(index, 1);
  salvar();
  renderizar();
}


// Editar tarefa 
function editar(index) {
  let novoTitulo = prompt("Editar tarefa:", tarefas[index].titulo);

  if (novoTitulo !== null) {
    novoTitulo = novoTitulo.trim();

    if (novoTitulo === "" || novoTitulo.length < 3) {
      alert("Texto inválido!");
      return;
    }

    if (/^(.)\1+$/.test(novoTitulo) || pareceAleatorio(novoTitulo)) {
      alert("Digite uma tarefa válida!");
      return;
    }

    tarefas[index].titulo = novoTitulo;
    salvar();
    renderizar();
  }
}


// Concluir tarefa
function toggle(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  salvar();
  renderizar();
}


// Executa ao abrir
renderizar();