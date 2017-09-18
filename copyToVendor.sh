#!/bin/bash 
set -ex

mkdir -p public/vendor/codemirror/
cp node_modules/codemirror/lib/codemirror.css public/vendor/codemirror/codemirror.css

mkdir -p public/vendor/font-awesome
cp -r node_modules/font-awesome/css public/vendor/font-awesome
cp -r node_modules/font-awesome/fonts public/vendor/font-awesome

mkdir -p public/vendor/purecss
cp node_modules/purecss/build/pure* public/vendor/purecss