const axios = require('axios');
// APIs a serem atualizadas
const endpoints = ['http://arneltem-rest.vistahost.com.br/ranking?key=f83ce208ed84db547bedf4824205d042', 'http://gralhaim-rest.vistahost.com.br/ranking?key=0869be516bbd5ee49d545af01cd6e22d'];

const axiosInstance = axios.create({
    headers: {
        'User-Agent': 'PostmanRuntime/7.29.2', // Simule o User-Agent do Postman
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Accept': 'application/json'
    },
    timeout: 120000
});

//Mapeando os links
async function carregarUrls(){
    
    const promises = endpoints.map((url) => requisicao(url));
    const results = await Promise.all(promises);

    results.forEach((result) => {
        if (result.error) {
            console.error(`Erro no endpoint ${result.url}: ${result.error}\n`);
        } else {
            console.log(`Resposta do endpoint ${result.url}:`, result.data, '\n');
        }
    });
}

// Rodando os gets
async function requisicao(url) {
    try{
        const response = await axiosInstance.get(url);
        return { url, data: response.data};
    } catch (error){
        return{
            url, error: error.response ? `Erro ${error.response.status}: ${error.response.statusText}`: `Erro na requisição: ${error.message}`
        }
    }
    
}

carregarUrls();

