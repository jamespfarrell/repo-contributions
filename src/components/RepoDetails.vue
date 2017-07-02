<template>
    <div>
        <h2>Details for repo</h2>
        <div v-for="contributor in contributors">
            {{ contributor.login }}
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default Vue.component('repo-details', {
    props: ['contributors'],
  });
</script>
