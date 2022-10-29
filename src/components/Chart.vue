<script>
import { Chart, registerables } from 'chart.js';
import { socket as getSocket } from '../socketio';

let requestsCount = 0;

const socket = await getSocket;
if(socket) {
  socket.on('call', () => {
    requestsCount += 1;
  });
}

const labels = [];

const data = {
  labels: labels,
  datasets: [{
    label: 'Throughput',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {
    scales: {
      y: {
        min: 0,
        max: 20,
      }
    },
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
        dataset.data.push(requestsCount);
      });

      // reset requests count
      requestsCount = 0;

      chart.update();
    }, 2000);
  }
}
</script>

<template>
  <div class="rate"> 
    <h5 class="title">RPC Throughput per 2 seconds</h5>
    <canvas id="chart"></canvas>
  </div>
</template>

<style scoped>
.rate {
  height: 600px;
  width: 80%;

  margin-top: 50px;
}

.title {
  margin: auto;
  text-align: center;
}
</style>
