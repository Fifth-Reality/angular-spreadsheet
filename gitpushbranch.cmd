#Create and checkout to a new branch from your current commit: 

git add --all
git commit -m %2

git checkout -b %1
git push -u origin %1
git push -u origin main

#list all branches

git branch -a
git checkout -b main
