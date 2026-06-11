#!/bin/bash

# chmod +x git.sh
# ./git.sh

echo "Choose an option:"
echo "1) Config git user"
echo "2) Push code"
echo "3) Create repo"

read -p "Enter your choice (1-3): " choice

case "$choice" in
    1)
        git config user.name "<username>"
        git config user.email "<email>"
        ;;
    2)
        git add .
        git commit -m "commit"
        git push -u origin master
        ;;
    3)
        git add .
        git commit -m "commit"
        git remote add origin <link of repo>
        git push -u origin master
        ;;
    *)
        echo "Invalid choice."
        exit 1
        ;;
esac
