# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## To remove all latest commit

git reset --hard lastcommittokeep

## To rebranch to a new repository

rm -rf .git
git remote -v
git remote remove origin

## To ignore local changes

git update-index --assume-unchanged config/config.js
git update-index --no-assume-unchanged config/config.js

# To initialize git

git init
git remote add origin https://github.com/khairulghalil/heyitzme-api.git
git branch -M main
git add .
git commit -m "first commit"
git push -u origin main
