// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  var username = document.getElementById("username");
  req.open('GET', 'https://api.github.com/users/' + username.value + '/repos');
  req.send();
}

function displayRepositories(){
  var repos = JSON.parse(this.responseText);
  const repoList = `${repos.map(
    repo =>
      '<a href=' + repo.html_url +'>'+ repo.name +'</a>'
      + ' / <a href="#" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getCommits(this)">Commits</a> / ' +
      '<a href="#" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '"onclick="getBranches(this)">Branches</a>'
      + '</br>'
  ).join('')}`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(repo) {
    const repository = repo.dataset.repository;
    const username = repo.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/' + username +'/' + repository + '/commits');
    req.send();
}


function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `${commits.map(
    commit =>
    '/' + commit.author.login + '/'+ commit.commit.author['name'] +'/'+ commit.commit.message + '/<br>'
  ).join('')}`;
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(repo) {
  const repository = repo.dataset.repository;
  const username = repo.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository + "/branches");
  req.send();
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchesList = `${branches.map(
    branch =>
    branch.name + '<br>'
  ).join('')}`;
  document.getElementById("details").innerHTML = branchesList;
}
