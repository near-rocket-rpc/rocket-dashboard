<script>
import { Chart, registerables } from 'chart.js';

const labels = [
  1, 2, 3
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {
    plugins: {
      legend: {
        display: false, 
      }
    }
  }
};

export default {
  data() {
    return {}
  },
  mounted() {
    Chart.register(...registerables);
    const chart = new Chart(
        document.getElementById('chart').getContext('2d'),
        config
    );

    setInterval(() => {
      const data = chart.data;
      labels.push(labels.length + 1);
      data.labels = labels;

      data.datasets.forEach(dataset => {
        dataset.data.push(Math.floor(Math.random() * 10));
      });

      chart.update();
    }, 2000);
  }
}
</script>

<template>
  <div class="rate"> 
    <canvas id="chart"></canvas>
  </div>
</template>

<style scoped>
.rate {
  height: 600px;
  width: 80%;

  margin-top: 50px;
}
</style>
