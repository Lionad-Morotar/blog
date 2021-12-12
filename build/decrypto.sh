#!/bin/sh

# Decrypt the file
gpg --quiet --batch --yes --decrypt --passphrase="$GPG_PASS" --output ./blogs/.vuepress/private/valine-id.js ./blogs/.vuepress/private/valine-id.js.gpg

echo "Decrypt valine-id done"

gpg --quiet --batch --yes --decrypt --passphrase="$GPG_PASS" --output ./blogs/.vuepress/private/valine-key.js ./blogs/.vuepress/private/valine-key.js.gpg

echo "Decrypt valine-key done"
