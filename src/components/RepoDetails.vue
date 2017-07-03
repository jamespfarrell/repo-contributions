<template>
    <div>
        <h2>Details for repo</h2>
        <bar-chart v-bind:data="commitData" v-bind:options="graphOptions"></bar-chart>
    </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BarChart from '../modules/charts/barChart';

  export default Vue.component('repo-details', {
    props: ['contributors'],
    components: {
      'bar-chart': BarChart,
    },
    computed: {
      commitData() {
        const commitData = {};
        if (this.contributors.length > 0) {
          commitData.labels = [];
          commitData.datasets = [
            {
              label: 'GitHub Commits',
              backgroundColor: '#f87979',
              data: [],
            },
          ];

          this.contributors.forEach((contributer) => {
            commitData.labels.push(contributer.login);
            commitData.datasets[0].data.push(contributer.contributions);
          });
        }
        console.log('computed commitData updated');
        console.log(commitData);
        return commitData;
      },
    },
    data() {
      return {
        graphOptions: {
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                userCallback: function userCallBack(label) {
                  // when the floored value is the same as the value we have a whole number
                  if (Math.floor(label) === label) {
                    return label;
                  }
                  return '';
                },
              },
            }],
          },
        },
      };
    },
    methods: {
      getCommitData(contributors) {
        const commitData = {};
        if (contributors.length > 0) {
          commitData.labels = [];
          commitData.datasets = [
            {
              label: 'GitHub Commits',
              backgroundColor: '#f87979',
              data: [],
            },
          ];

          contributors.forEach((contributer) => {
            commitData.labels.push(contributer.login);
            commitData.datasets[0].data.push(contributer.contributions);
          });
        }
        console.log(commitData);
        return commitData;
      },
    },
  });
</script>
