
import axios from 'axios';

export async function CarregarTitulos() {

  const URL_TITULOS="https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json";


  try {
    // Fazer uma solicitação GET usando Axios para obter o arquivo JSON
    const resposta = await axios.get(URL_TITULOS);        
    const dadosJSON = resposta.data;

    // Armazenar os dados no localStorage
    localStorage.setItem('titulos', JSON.stringify(dadosJSON));

    console.log('Arquivo JSON carregado e armazenado com sucesso!');

  } catch (erro) {

    console.error('Erro ao carregar ou armazenar o arquivo JSON:', erro);
  }

} 



