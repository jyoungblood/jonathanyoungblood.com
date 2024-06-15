#!/bin/bash

# DEPLOY_ENV_OPTIONS=("staging" "production")
# DEPLOY_ENV_OPTIONS=("production")
# GIT_BRANCH="main"
# COMMIT_MESSAGE="Updates - $(date +"%Y-%m-%d %T")"
SSH_USER="jonathanyoungblo"
SSH_SERVER="162.211.87.100"
SSH_PORT="2200"
SSH_WORK_PATH="/home/jonathanyoungblo/public_html"


# FUCK ME

# ssh $SSH_USER@$SSH_SERVER -p $SSH_PORT -t ". $SSH_WORK_PATH/deploy-remote.sh -e ${DEPLOY_ENV_OPTIONS[$?]}"
# ssh $SSH_USER@$SSH_SERVER -p $SSH_PORT -f " ls -al $SSH_WORK_PATH"

# add '-n' for dry run

npx @11ty/eleventy

# 755 folders & 644 files
rsync -avhHP --delete-after --chmod=Du=rwx,Dg=rx,D=x,Fu=rwx,Fg=r,Fo=r --exclude '.htaccess' --exclude '.well-known' --exclude 'cgi-bin' _site/ -e "ssh -p $SSH_PORT" $SSH_USER@$SSH_SERVER:$SSH_WORK_PATH
# --delete --delete-excluded --delete-before

# rwxr-xr-x

# set the directory permissions to 750 and the file permissions to 640
# --chmod=Du=rwx,Dg=rx,D=,Fu=rw,Fg=r,Fo=

# 770 for directories and 660 for files
# --chmod=Du=rwx,Dg=rwx,Do=,Fu=rw,Fg=rw,Fo=

# ?? --chmod=D0770,F0660



# find public_html -type d -exec chmod 755 {} +
# need to reset perms on folders after rsync?


# rsync -aP -e 'ssh -p 2200' root@162.248.49.134:/home/clickbuild/api.clickbuild.io/node_modules node_modules



exit
