npm run build
rm -rf ./api
rm -rf ./articles
rm -rf ./assets
rm -rf ./guide

mv src/.vuepress/dist/* ./
