const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  const token = core.getInput('token');
  const octokit = new github.GitHub(token);

  const issueID = github.context.issue.number;
  // Need to put a space at the end for this to be considered a mention.
  const teamname = "@llvm/issue-subscribers-" + github.context.payload.label.name.replace(/ /g, "-") + " "

   octokit.issues.createComment({
     owner: 'llvm',
     repo: 'temp-issue-tester',
     issue_number: issueID,
     body: teamname,
   })
}

run();
