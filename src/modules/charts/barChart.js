// commitChart.js
import { Bar } from 'vue-chartjs';

export default Bar.extend({
  props: ['data', 'options', 'someData'],
  watch: {
    data(data) {
      console.log(data);
      console.log('-----------watched data-------------------------');
      this.renderChart(data, this.options);
    },
  },
});
