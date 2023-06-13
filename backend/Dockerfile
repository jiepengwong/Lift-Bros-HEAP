# Use an official Golang runtime as the base image
FROM golang:1.19-alpine

# Setting up environment for CompileDaemon
ENV PROJECT_DIR=/app \
    GO111MODULE=on \
    CGO_ENABLED=0

# Set the working directory inside the container
WORKDIR /app

# Install Git
RUN apk update && \
    apk add libc-dev && \
    apk add gcc && \
    apk add make

# Copy the Go module dependency files
COPY go.mod go.sum ./

# Download and install the application dependencies
RUN go mod download && go mod verify

# Copy and build the app
COPY . .
COPY ./entrypoint.sh /entrypoint.sh

# wait-for-it requires bash, which alpine doesn't ship with by default. Use wait-for instead
ADD https://raw.githubusercontent.com/eficode/wait-for/v2.1.0/wait-for /usr/local/bin/wait-for
RUN chmod +rx /usr/local/bin/wait-for /entrypoint.sh

ENTRYPOINT [ "sh", "/entrypoint.sh" ]
# referenced from https://github.com/icodestuff-io/golang-docker-tutorial (https://www.youtube.com/watch?v=ioa02xkqRII&ab_channel=Icodestuff)
# https://articles.wesionary.team/dockerize-a-golang-applications-with-mysql-and-phpmyadmin-hot-reloading-included-86eb7a6cf8d5

# # Build the Go application
# RUN go build -o main .

# # Expose the port on which the application will run
# EXPOSE 8080

# # ENTRYPOINT CompileDaemon -command="./app"
# CMD ["./main"]