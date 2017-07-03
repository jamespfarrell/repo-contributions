import axios from 'axios';

export function getData(reposUrl, renderRepos, onError) {
  axios
    .get(reposUrl)
    .then(renderRepos)
    .catch(onError);
}

export function getUrl(reposUrl, renderRepos) {
  getData(reposUrl, renderRepos);
}
