#!/bin/bash

# Exit on any error
set -e

# Get current datestamp
current_date=$(date '+%Y-%m-%d %H:%M:%S')

# Execute git operations
echo "Pulling latest changes..."
git pull origin main

echo "Adding all changes..."
git add .

echo "Committing changes..."
git commit -m "vault backup $current_date"

echo "Pushing all branches..."
git push origin --all

echo "Vault backup completed successfully!"
