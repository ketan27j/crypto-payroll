cd /projects/crypto-function

git pull

container_id='docker ps -a --filter "name=crypto-function" --format "{{.ID}}"'

docker stop container_id

docker container prune -y

image_id='docker images --format="{{.Repository}} {{.ID}}" | grep "crypto-function" | cut -d " " -f2'

docker rmi image_id

docker image prune -y

docker build -t crypto-function .

docker run --name crypto-function crypto-function
