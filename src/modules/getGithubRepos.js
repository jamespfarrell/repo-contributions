import axios from 'axios';

export default function getGithubRepos(reposUrl, renderRepos) {
  axios
    .get(reposUrl)
    .then(renderRepos)
    .catch(() => {
      alert(`There was an error calling ${reposUrl}`);
    });
}
