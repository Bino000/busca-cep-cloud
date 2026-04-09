function mostrar(){
	cep = document.getElementById("cep").value // pegando valor do cep
	// url = "https://viacep.com.br/ws/"+cep+"/json/" // url do viacep
	url = `https://viacep.com.br/ws/${cep}/json/` // url do viacep

	// BUSCANDO O CEP USANDO FETCH
	fetch(url)
		.then((res)=>{ // variavel "res" irá armazenar a resposta inicial
			return res.json() // convertendo a resposta em JSON
		})
		.then((cep)=>{ // variavel "cep" contendo o json com o CEP do viacep
			console.log("Oi, meu CEP É no fetch", cep) // imprimindo os dados do cep
			document.getElementById("cidade").value = cep.localidade
			document.getElementById("bairro").value = cep.bairro
			document.getElementById("ddd").value = cep.ddd
			document.getElementById("estado").value = cep.uf
			M.updateTextFields()
		})
	// FIM DA IMPLEMENTAÇÃO DO FETCH
	console.log("Oi, meu CEP É fora", cep)
}

function buscarPorEndereco(){
	uf = document.getElementById("uf").value
	cidade = document.getElementById("cidade_search").value
	logradouro = document.getElementById("logradouro").value
	url = `https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`

	fetch(url)
		.then((res)=>{
			return res.json()
		})
		.then((data)=>{
			console.log("Resultados da busca por endereço", data)
			displayResults(data)
			// Switch to log-tab
			$('.tabs').tabs('select', 'log-tab');
		})
}

function displayResults(data){
	const resultadosDiv = document.getElementById("resultados")
	resultadosDiv.innerHTML = "" // Clear previous results
	if (Array.isArray(data) && data.length > 0) {
		const table = document.createElement("table")
		table.className = "striped"
		table.innerHTML = `
			<thead>
				<tr>
					<th>CEP</th>
					<th>Logradouro</th>
					<th>Bairro</th>
					<th>Cidade</th>
					<th>UF</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		`
		const tbody = table.querySelector("tbody")
		data.forEach(item => {
			const row = document.createElement("tr")
			row.innerHTML = `
				<td>${item.cep}</td>
				<td>${item.logradouro}</td>
				<td>${item.bairro}</td>
				<td>${item.localidade}</td>
				<td>${item.uf}</td>
			`
			tbody.appendChild(row)
		})
		resultadosDiv.appendChild(table)
	} else {
		resultadosDiv.innerHTML = "<p>Erro na busca ou nenhum resultado encontrado.</p>"
	}
}
// tag fechamento do script JS