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

    <h2>Components</h2>
    <ul id="repo-list" v-if="repos.length !== 0">
      <repo-item
              v-for="(repo, index) in repos" :key="repo.id"
              v-on:itemSelected="selectRepo"
              v-bind:selectedId="selectedId"
              v-bind:item="repo">
      </repo-item>
    </ul>
    <h2 v-if="userHasNoRepos()">User has no repos</h2>
  </div>
</template>

<script>
import typeahead from 'vue-strap/src/Typeahead';
import 'bootstrap-css-only/css/bootstrap.css';
import getGithubRepos from '../modules/getGithubRepos';
import RepoItem from './RepoItem';
import RepoDetails from './RepoDetails';

/* import '../assets/css/Typeahead.css'; */

/* function getUsersRepos(data,cb) {
  ajax( "http://some.api/person", data, cb );
} */

export default {
  name: 'search',
  components: {
    typeahead,
    'repo-item': RepoItem,
    'repo-details': RepoDetails,
  },
  data() {
    return {
      githubTemplate: '<img width="18px" height="18px" :src="item.avatar_url"/><span>{{item.login}}</span>',
      repos: [],
      selectedId: null,
    };
  },
  methods: {
    selectRepo(selectedId) {
      this.$set(this, 'selectedId', selectedId);
    },
    githubCallback(item) {
      getGithubRepos(item.repos_url, this.renderRepos);
    },
    renderRepos(res) {
      if (res.data.length) {
        this.repos = res.data;
        // this.$set(this, 'repos', res.data);
      } else {
        this.repos = [];
      }
      // tell them nothing came back
    },
    userHasNoRepos() {
      return this.selectedId !== null && this.repos.length === 0;
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

ul#repo-list {

}
ul#repo-list li {
  background: #eee;
  display:flex;
  padding: 20px;
}
ul#repo-list li:hover {
    cursor: pointer;
    background: #FFF;
}
ul#repo-list li div {
  background: blue;
  display:flex;
}
</style>
