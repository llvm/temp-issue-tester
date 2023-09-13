import github
import os
import sys

def needs_to_wait(repo):

    workflow_name = os.environ.get("GITHUB_WORKFLOW")
    run_number = os.environ.get("GITHUB_RUN_NUMBER")
    print("Workflow Name:", workflow_name, "Run Number:", run_number)
    for status in ["in_progress", "queued"]:
        for workflow in repo.get_workflow_runs(status = status):
            print("Looking at ", workflow.name, "#", workflow.run_number)
            if workflow.name != workflow_name:
                continue
            if workflow.run_number < run_number:
                print("Workflow {} still {} ".format(workflow.run_number, status))
                return True
    return False

repo_name = os.environ.get("GITHUB_REPOSITORY")
token = sys.argv[1]
gh = github.Github(token)
repo = gh.get_repo(repo_name)
while needs_to_wait(repo):
    time.sleep(60)
