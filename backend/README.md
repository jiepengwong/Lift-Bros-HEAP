# 1. How to run application for development

```
go run main.go
```

## Hot reload for development

### Install nodemon

```
npm install -g nodemon
```

### Run nodemon

```
nodemon --exec go run main.go --signal SIGTERM
```

# 2. Using docker compose

```
docker compose up
```

if there are update in go.mod & go.sum

```
docker compose up --build
```

# 3. Using Docker Image if you are using local mysql

## Create Docker Image

```
docker build -t lift-bro:0.0.1 .
```

## Run docker image

```
docker run -p 8080:8080 lift-bro:0.0.1
```

4. Deployment on AWS ECS

```
docker context create ecs myecscontext
```

```
docker-compose --context myecscontext -f docker-compose-aws.yml up
```
