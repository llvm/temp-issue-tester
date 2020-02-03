const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  const token = core.getInput('token');
  const octokit = new github.GitHub(token);

  const issueID = github.context.issue.number;

   octokit.issues.createComment({
     owner: 'llvm',
     repo: 'temp-issue-tester',
     issue_number: issueID,
     body: '@llvm/issue-testers'
   })

}

run();
