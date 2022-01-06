#!/usr/bin/env python3
#
# ======- github-automation - LLVM GitHub Automation Routines--*- python -*--==#
#
# Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
# See https://llvm.org/LICENSE.txt for license information.
# SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
#
# ==-------------------------------------------------------------------------==#

import argparse
import github
import os



class IssueSubscriber:

    def __init__(self, args):
        self.repo = github.Github(args.token).get_repo(args.repo)
        self.org = github.Github(args.token).get_organization(self.repo.organization.login)
        self.issue = self.repo.get_issue(args.issue_number)
        self.team_name = 'issue-subscribers-{}'.format(args.label_name).lower()

    def run(self):
        for team in self.org.get_teams():
            if self.team_name != team.name.lower():
                continue
            comment = '@llvm/{}'.format(team.slug)
            self.issue.create_comment(comment)
            return True
        return False


def get_default_repo():
    default = os.getenv('GITHUB_REPOSITORY')
    if not default:
        default = 'llvm/llvm-project'
    return default


parser = argparse.ArgumentParser()
parser.add_argument('--token', type=str, required=True)
parser.add_argument('--repo', type=str, default=get_default_repo())
subparsers = parser.add_subparsers(dest='command')

issue_subscriber_parser = subparsers.add_parser('issue-subscriber')
issue_subscriber_parser.add_argument('--label-name', required=True)
issue_subscriber_parser.add_argument('--issue-number', type=int, required=True)

args = parser.parse_args()

if args.command == 'issue-subscriber':
    issue_subscriber = IssueSubscriber(args)
    issue_subscriber.run()
