// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);

  let user = document.getElementById('username').value;
  req.open('GET', `https://api.github.com/users/${user}/repos`);
  req.send();
}


function displayRepositories() {
  // debugger;
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  debugger;
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li><a href="' + r.html_url + '">' +
        r.name +
        '</a> - <a href="#" data-repo="' +
        r.full_name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + repoName + '/commits');
  req.send();
}


function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      response =>
        '<li><h3>' +
        (response.commit.author.name || "Missing commit author name") +
        ' (' +
        (response.author.login || "Missing author login") +
        ')</h3>' +
        (response.commit.message || "Missing commit message") +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}


function getBranches() {

}



function displayBranches() {
  // const commits = JSON.parse(this.responseText);
  // const commitsList = `<ul>${commits
  //   .map(
  //     commit =>
  //       '<li><strong>' +
  //       commit.author.login +
  //       '</strong> - ' +
  //       commit.commit.message +
  //       '</li>'
  //   )
  //   .join('')}</ul>`;
  // document.getElementById('commits').innerHTML = commitsList;
}
