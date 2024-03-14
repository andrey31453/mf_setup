<!--  -->

## backlog

1. npm

   - bin for update
     -- add alias for manifest
     -- private
     --
   - aliases for name
   - add @d
   - add utils
   - add

2. chmod

3. docker

   - :ro
   - change package dont change image
   - change webpack dont change image

4. check work setup in single module

5. add docker paths for vs code

<!--  -->

## setup

packages groups
arora

<!--  -->

## updates

for i in `docker ps -q -a`; do docker exec -it $i npm i arora-npm-ts@0.3.9; done
docker-compose -f ./dev.docker-compose.yml down
docker-compose -f ./dev.docker-compose.yml up -d
