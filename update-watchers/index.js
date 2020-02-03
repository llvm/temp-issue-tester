const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  const token = core.getInput('token');
  const octokit = new github.GitHub(token);

  const issueID = github.context.issue.number;
  const teamname = "issue-subscribers-" + github.context.payload.label.name.replace(/ /g, "-")

  mentionList = ''

  // GitHub actions can't mention teams, because it's not a member of the
  // organization, so it has to mention people directly.
  const userList = octokit.teams.listMembersInOrg.endpoint.merge({
    org: 'llvm',
    team_slug : teamname
  })

  octokit.paginate(userList).then(users => {

  users.forEach(user => mentionList += '@' + user + ' ')
  // issues is an array of all issue objects
});

   octokit.issues.createComment({
     owner: 'llvm',
     repo: 'temp-issue-tester',
     issue_number: issueID,
     body: mentionList,
   })
}

run();
