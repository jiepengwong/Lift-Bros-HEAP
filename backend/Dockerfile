# Use an official Golang runtime as the base image
FROM golang:1.19-alpine

# Set the working directory inside the container
WORKDIR /app

# Install Git
RUN apk update && apk add --no-cache git

# Copy the Go module dependency files
COPY go.mod go.sum ./

# Download and install the application dependencies
RUN go mod download

# Copy the source code to the container
COPY . ./

# Build the Go application
RUN go build -o main .

# Expose the port on which the application will run
EXPOSE 8080

# Run the Go application
CMD ["./main"]
