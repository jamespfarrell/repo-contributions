<template>
  <div id="searchContainer">
    <h1>Githubergoo</h1>
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
// import typeahead from './TypeAhead';
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

$blue: #35495E;
$green: #41B883;
$black: #35495E;

* {
  font-family: 'Open Sans',  Arial, sans-serif;
  color: $black;
}
h1 {
  font-size: 44px;
}
h1, h2 {
  font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  font-weight: normal;
  color: $blue;
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
  color: $green;
}

ul#repo-list li {
  background: #eee;
  display:block;
  padding: 10px;
  margin:0;
}
ul#repo-list li:hover {
  cursor: pointer;
  background: $green;
  color: white;
  div {
    background: #eee;
    border:3px solid red;
  }
}
ul#repo-list li div {
  background: blue;
}
#searchContainer {
  width: 40%;
  margin:0 auto;
}
</style>
<style lang="scss">
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 2%;
  margin: 2px 0 0;
  font-size: 28px;
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
  width:96%;

  li
  {
    width:100%;
    margin: 10px 0;

  }
  li.active {
    background: #41B883;
    color: white ;
  }

}

.dropdown-menu > li > a > img {
  margin-right: 20px;
}
.dropdown-menu > li > a {
  cursor: pointer;
  padding: 3px 0;
  clear: both;
  font-weight: normal;
  line-height: 1.42857143;
  color: #333;
  white-space: nowrap;
  font-size: 28px;

  img {
    margin-right: 20px;
  }

  span {
    display: flex;
    align-items: center;
  }
}

.open > .dropdown-menu {
  display: block;
}
.form-control {
  display: block;
  width: 96%;
  padding: 6px 2%;
  font-size: 28px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
</style>
