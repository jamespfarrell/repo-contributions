<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <li v-on:click="clicked">
        {{ item.name }}
        <div v-if="isSelected()">
            <div>
                <repo-details v-bind:repoDetails="item" :key="item.id" ></repo-details>
            </div>
        </div>
    </li>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import RepoDetails from './RepoDetails';

  export default Vue.component('repo-item', {
    props: ['item', 'selectedId'],
    components: {
      'repo-details': RepoDetails,
    },
    methods: {
      clicked() {
        console.log('emit item selected');
        this.$emit('itemSelected', this.item.id);
        this.loadRepoDetails(this.item.contributors_url);
      },
      isSelected() {
        return this.selectedId === this.item.id;
      },
      loadRepoDetails(contributorsUrl) {
        console.log(contributorsUrl);
      },
    },
  });
</script>
