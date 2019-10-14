npm run build
rm -rf ./api
rm -rf ./articles
rm -rf ./assets
rm -rf ./egg
rm -rf ./koa

mv src/.vuepress/dist/* ./
