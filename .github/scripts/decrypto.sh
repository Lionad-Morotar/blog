#!/bin/sh

# Decrypt the file
gpg --quiet --batch --yes --decrypt --passphrase="$GPG_PASS" \
--output $GITHUB_WORKSPACE/blogs/.vuepress/private/valine-id.js $GITHUB_WORKSPACE/blogs/.vuepress/private/valine-id.js.gpg

echo "Decrypt valine-id done"

gpg --quiet --batch --yes --decrypt --passphrase="$GPG_PASS" \
--output $GITHUB_WORKSPACE/blogs/.vuepress/private/valine-key.js $GITHUB_WORKSPACE/blogs/.vuepress/private/valine-key.js.gpg

echo "Decrypt valine-key done"