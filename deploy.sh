#!/bin/bash

SSH_USER="jonathanyoungblo"
SSH_SERVER="162.211.87.100"
SSH_PORT="2200"
SITE_PATH="dist/"
DEPLOYMENT_PATH="/home/jonathanyoungblo/public_html"


GIT_BRANCH="astro"
COMMIT_MESSAGE="Updates - $(date +"%Y-%m-%d %T")"



## Add new files to repo
git add --all


## Prompt for commit message (and provide a default)
echo "Enter Git commit message (default: $COMMIT_MESSAGE)"
read NEW_MESSAGE
[ -n "$NEW_MESSAGE" ] && COMMIT_MESSAGE=$NEW_MESSAGE
git commit -am "$COMMIT_MESSAGE"


## Push to origin branch
git push origin $GIT_BRANCH






npm run build
# npx @11ty/eleventy

# add '-n' for dry run

rsync -avhHP --delete-after --chmod=Du=rwx,Dg=rx,D=x,Fu=rwx,Fg=r,Fo=r --exclude '.htaccess' --exclude '.well-known' --exclude 'cgi-bin' $SITE_PATH -e "ssh -p $SSH_PORT" $SSH_USER@$SSH_SERVER:$DEPLOYMENT_PATH

exit
