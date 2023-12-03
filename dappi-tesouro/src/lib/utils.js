export function formataPreco(numero) {
  if (!numero) return "-";
  const formatoBrasileiro = numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatoBrasileiro;
}

export function formataData(data) {
  if (!data) return "-";

  var dataEntrada = new Date(data);
  var mes = dataEntrada.getMonth() + 1;
  var ano = dataEntrada.getFullYear();
  var dataFormatada = (mes < 10 ? "0" : "") + mes + "-" + ano;
  return dataFormatada;
}

export function formataNumero(numero) {
  if (numero) return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  else return "-";
}

export function dataPorExtenso(data) {  
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  
  const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

  
  const dataObj = data ? new Date(data) : new Date();
  const indiceDiaSemana = dataObj.getDay();
  const diaDoMes = dataObj.getDate();
  const indiceMes = dataObj.getMonth();
  const ano = dataObj.getFullYear();
  return `${diasDaSemana[indiceDiaSemana]}, ${diaDoMes} de ${meses[indiceMes]} de ${ano}`;
}

export function mercadoAberto() {
  const agora = new Date();
  const diaDaSemana = agora.getDay(); // 0 para domingo, 1 para segunda, ..., 6 para sábado
  const horaAtual = agora.getHours();

  const horaInicial = 8; // 8 am
  const horaFinal = 18; // 6 pm

  const estaNoHorario = horaAtual >= horaInicial && horaAtual < horaFinal;
  const eDiaUtil = diaDaSemana >= 1 && diaDaSemana <= 5; // Segunda a sexta-feira

  return estaNoHorario && eDiaUtil;
}





