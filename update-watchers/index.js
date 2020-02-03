const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  const token = core.getInput('token');
  const octokit = new github.GitHub(token);

  console.log(github.context.issue)
  console.log(github.context.payload)
  const issueID = github.context.issue.number;
  const teamname = "@llvm/issue-subscribers-" + github.context.issue.label.replace(" ", "-")

   octokit.issues.createComment({
     owner: 'llvm',
     repo: 'temp-issue-tester',
     issue_number: issueID,
     body: teamname,
   })
}

run();
