const now = new Date();
const dateTimeString = now.toISOString();
const formattedDateTimeString = now.toLocaleString();
const timeElement = document.getElementById("current-time");
const diaSemana = now.getDay();
timeElement.textContent = formattedDateTimeString;
timeElement.setAttribute("datetime", dateTimeString);




//Gráfico 01

var options = {
  chart: {
    type: 'bar'
  },
  series: [{
    name: 'valor',
    data: [1530, 1580.88, 1135, 1450, 1449, 1260]
  }],
  plotOptions: {
    bar: {
      borderRadius: 4,
      dataLabels: {
        position: 'center', // top, center, bottom
      },
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return "R$" + val;
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ["#fcfcfc"]
    }
  },
  fill: {
    colors: ['#096CFF', '#33FF99']
  },
  grid: {
    borderColor: '#303953'
  },
  subtitle: {
    style: {
      fontSize: '12px',
      color: '#99A9C2'
    }
  },
  xaxis: {
    categories: [2032, 2036, 2038, 2040, 2042, 2044]
  }
}

const chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();
