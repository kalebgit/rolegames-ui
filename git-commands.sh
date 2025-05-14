#!/bin/bash
# Exit on any error
set -e

# Check if commit message was provided as argument
#
#You have to input the message with "<message>"
if [ $# -eq 0 ]; then
    echo "Error: Please provide a commit message"
    echo "Usage: $0 \"Your commit message\""
    exit 1
fi

# Use the provided commit message
commit_message="$1"

# Execute git operations
echo "Pulling latest changes..."
git pull origin main

echo "Adding all changes..."
git add .

echo "Committing changes..."
git commit -m "$commit_message"

echo "Pushing all branches..."
git push origin --all

echo "Git operations completed successfully!"
