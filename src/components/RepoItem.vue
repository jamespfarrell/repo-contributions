<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <li v-on:click="clicked">
        <h3>{{ item.name }}</h3>
        <template v-if="isSelected()">
            <repo-details v-bind:contributors="contributors" :key="item.id" ></repo-details>
        </template>
    </li>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import { getUrl } from '../modules/http';
  import RepoDetails from './RepoDetails';

  export default Vue.component('repo-item', {
    props: ['item', 'selectedId'],
    components: {
      'repo-details': RepoDetails,
    },
    data() {
      return {
        contributors: [],
      };
    },
    methods: {
      clicked() {
        this.$emit('itemSelected', this.item.id);
        this.loadRepoDetails(this.item.contributors_url);
      },
      isSelected() {
        return this.selectedId === this.item.id;
      },
      loadRepoDetails(contributorsUrl) {
        getUrl(contributorsUrl, this.assignContributors, () => {
          alert(`There was an error calling ${contributorsUrl}`);
        });
      },
      assignContributors(contributors) {
        if (contributors.data.length) {
          this.$set(this, 'contributors', contributors.data);
        } else {
          this.contributors = [];
        }
      },
    },
  });
</script>
