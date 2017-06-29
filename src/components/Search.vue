<template>
  <div class="hello">
    <h1>Search for a github user</h1>
    <h2>Please search for a github user below</h2>
    <h4>Custom templates for results</h4>
    <h4>Asynchronous results</h4>
    <!--<typeahead
            placeholder="Address, async via maps.googleapis.com"
            async-key="results"
            src="https://maps.googleapis.com/maps/api/geocode/json?address="
            :template="asyncTemplate"
            :on-hit="googleCallback"
    ></typeahead>-->
    <!--<span v-on:keyup="githubCallback">-->
    <typeahead
            placeholder="Github users, async via api.github.com"
            async-key="items"
            src="https://api.github.com/search/users?q="
            :template="githubTemplate"
            :on-hit="githubCallback"
            async="https://api.github.com/search/users?q="
    ></typeahead>
     <!-- </span>-->
   <!-- <typeahead :data="USstate" placeholder="USA states"></typeahead>-->

  </div>
</template>

<script>
import typeahead from 'vue-strap/src/Typeahead';
import 'bootstrap-css-only/css/bootstrap.css';
/* import '../assets/css/Typeahead.css'; */

export default {
  name: 'hello',
  components: {
    typeahead,
  },
  data() {
    return {
      githubTemplate: '<img width="18px" height="18px" :src="item.avatar_url"/><span>{{item.login}}</span>',
    };
  },
  methods: {
    githubCallback() {


    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
