function adicionarLog(texto) {
  let log = document.createElement("li")
  log.className = "collection-item"
  log.innerText = texto
  document.getElementById("log-lista").appendChild(log)
}

function buscarCEP() {
  let cep = document.getElementById("cep").value.replace(/\D/g, "")

  if (cep.length < 8) {
    alert("Digite um CEP válido!")
    return
  }

  document.getElementById("cidade").value = "Buscando..."
  document.getElementById("bairro").value = ""
  document.getElementById("estado").value = ""
  document.getElementById("ddd").value = ""

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(dados => {

      if (dados.erro) {
        alert("CEP não encontrado!")
        limpar()
        return
      }

      document.getElementById("cidade").value = dados.localidade
      document.getElementById("bairro").value = dados.bairro
      document.getElementById("estado").value = dados.uf
      document.getElementById("ddd").value = dados.ddd

      M.updateTextFields()

      adicionarLog(`CEP: ${cep} → ${dados.localidade}/${dados.uf}`)
    })
}

function limpar() {
  document.getElementById("cep").value = ""
  document.getElementById("cidade").value = ""
  document.getElementById("bairro").value = ""
  document.getElementById("estado").value = ""
  document.getElementById("ddd").value = ""
}

function buscarRua() {
  let uf = document.getElementById("lista-ufs").value
  let cidade = document.getElementById("lista-cidades").value
  let rua = document.getElementById("rua").value

  let lista = document.getElementById("lista-ruas")

  if (!uf || !cidade || !rua) {
    alert("Preencha todos os campos!")
    return
  }

  lista.innerHTML = "<li class='collection-item'>Buscando...</li>"

  fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`)
    .then(res => res.json())
    .then(dados => {

      lista.innerHTML = ""

      if (dados.length === 0) {
        lista.innerHTML = "<li class='collection-item'>Nenhum resultado</li>"
        return
      }

      dados.forEach(item => {
        let li = document.createElement("li")
        li.className = "collection-item"

        li.innerHTML = `
          <strong>${item.logradouro}</strong><br>
          Bairro: ${item.bairro}<br>
          ${item.localidade} - ${item.uf}
        `

        lista.appendChild(li)
      })

      adicionarLog(`Rua: ${rua} → ${cidade}/${uf}`)
    })
}

function limparRua() {
  document.getElementById("rua").value = ""
  document.getElementById("lista-ruas").innerHTML = ""
}

function carregarUFs() {
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(estados => {

      estados.sort((a, b) => a.nome.localeCompare(b.nome))

      let lista = '<option disabled selected>Escolha um Estado</option>'

      estados.forEach(uf => {
        lista += `<option value="${uf.sigla}">${uf.nome}</option>`
      })

      document.getElementById("lista-ufs").innerHTML = lista
      $('select').formSelect()
    })
}

function buscarCidades(uf) {
  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
    .then(res => res.json())
    .then(cidades => {

      let lista = '<option disabled selected>Escolha uma Cidade</option>'

      cidades.forEach(c => {
        lista += `<option value="${c.nome}">${c.nome}</option>`
      })

      document.getElementById("lista-cidades").innerHTML = lista
      $('select').formSelect()
    })
}

window.onload = function () {
  carregarUFs()
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(reg => console.log("[PWA] SW registrado:", reg.scope))
      .catch(err => console.error("[PWA] Erro:", err))
  })
}
