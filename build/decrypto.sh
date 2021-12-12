#!/bin/sh

# Decrypt the file
gpg --quiet --batch --yes --decrypt --passphrase="$GPG_PASS" --output /home/runner/work/blog/blog/blogs/.vuepress/private/valine-id.js /home/runner/work/blog/blog/blogs/.vuepress/private/valine-id.js.gpg

echo "Decrypt valine-id done"

gpg --quiet --batch --yes --decrypt --passphrase="$GPG_PASS" --output /home/runner/work/blog/blog/blogs/.vuepress/private/valine-key.js /home/runner/work/blog/blog/blogs/.vuepress/private/valine-key.js.gpg

echo "Decrypt valine-key done"
