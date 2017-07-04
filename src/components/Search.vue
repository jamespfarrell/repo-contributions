<template>
  <div id="searchContainer">
    <h1>Githuberoo</h1>
    <h2>Please search for a github user below</h2>
    <typeahead
            placeholder="Search for a github username"
            async-key="items"
            :template="githubTemplate"
            :on-hit="githubCallback"
            async="https://api.github.com/search/users?q="
    ></typeahead>

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
import { getUrl } from '../modules/http';
import RepoItem from './RepoItem';
import RepoDetails from './RepoDetails';

export default {
  name: 'search',
  components: {
    typeahead,
    'repo-item': RepoItem,
    'repo-details': RepoDetails,
  },
  data() {
    return {
      githubTemplate: '<img width="50px" height="50px" :src="item.avatar_url"/><span>{{item.login}}</span>',
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
        this.$set(this, 'repos', res.data);
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

<style lang="scss">
@import "../assets/sass/styles.scss";

* {
  font-family: 'Open Sans',  Arial, sans-serif;
  color: $textColour;
}
h1 {
  font-size: 44px;
}
h1, h2 {
  font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  font-weight: normal;
  color: $primaryColour;
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
  color: $secondaryColour;
}

ul#repo-list
{
  li {
    background: #eee;
    display: block;
    padding: 10px;
    margin: 0;
    div {
      background: #eee;
      padding: 10px 30px 30px 30px;
    }
  }

  li:hover {
    cursor: pointer;
    background: $secondaryColour;
    color: white;

    div {
      background: #eee;
    }
  }
}

#searchContainer {
  width: 80%;
  @include breakpoint(md) {
    width: 60%;
  }
  @include breakpoint(lg) {
    width: 50%;
  }
  margin:0 auto;
}
</style>

