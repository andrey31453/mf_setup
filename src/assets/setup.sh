cd ./setup

rm -rf ./node_modules
npm i
npm run preset
rm -rf ./node_modules
npm i
npm run init

cd ..
rm -rf ./node_modules
npm i