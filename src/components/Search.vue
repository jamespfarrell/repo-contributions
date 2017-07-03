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
            placeholder="Search for a github username"
            async-key="items"
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
/* import 'bootstrap-css-only/css/bootstrap.css';*/
/* import '../assets/sass/styles.scss'; */
import { getUrl } from '../modules/http';
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
      getUrl(item.repos_url, this.renderRepos, () => {
        alert(`There was an error calling ${item.repos_url}`);
      });
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
<style scoped lang="scss">
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
<style scoped lang="scss">
.dropdown-menu {
  border: 1px solid red;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
}

li {
  display: list-item;
  text-align: -webkit-match-parent;
  background: red;
}

.dropdown-menu > li > a {
  cursor: pointer;
}

.dropdown-menu > li > a {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.42857143;
  color: #333;
  white-space: nowrap;
}
</style>
