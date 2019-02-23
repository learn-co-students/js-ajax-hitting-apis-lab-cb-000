function getRepositories() {
  let username = document.getElementById('username').value;
  console.log('Getting repositories for', username);

  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos);

  let repoList = repos.map(repo =>
    `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>` +
    ` | <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getCommits(this)">Get Commits</a>` +
    ` | <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getBranches(this)">Get Branches</a>`
  ).join('');

  document.getElementById('repositories').innerHTML = `<ul>${repoList}</ul>`;
}

function getCommits(item) {
  console.log('Getting commits for', item.dataset.repository);

  const repoName = item.dataset.repository;
  const username = item.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repoName}/commits`);
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  console.log(commits);

  let commitList = commits.map(commit =>
    `<li>${commit.author.login} (${commit.commit.author.name}) - ${commit.commit.message}</li>`
  ).join('');

  document.getElementById('details').innerHTML = `<ul>${commitList}</ul>`;
}

function getBranches(item) {
  console.log('Getting branches for', item.dataset.repository);

  const repoName = item.dataset.repository;
  const username = item.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repoName}/branches`);
  req.send();
}

function displayBranches() {
  let branches = JSON.parse(this.responseText);
  console.log(branches);

  let branchList = branches.map(branch =>
    `<li>${branch.name}</li>`
  ).join('');

  document.getElementById('details').innerHTML = `<ul>${branchList}</ul>`;
}
