# 1. How to run application for development

```
go run main.go
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
