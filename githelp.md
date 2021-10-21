git branch %1

# $ git checkout -b iss53
# Switched to a new branch "iss53"
# This is shorthand for:

# $ git branch iss53
# $ git checkout iss53


Create and checkout to a new branch from your current commit: 

git checkout -b %1
git push -u origin %1
git push -u origin main

