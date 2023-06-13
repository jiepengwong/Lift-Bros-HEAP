wait-for "mysql:3306" -- "$@"

# Watch your .go files and invoke go build if the files changed.
CompileDaemon -build="go build main.go"  -command="./main"
# CompileDaemon -build="go build -o /build/app"  -command="/build/app"
# CompileDaemon -command="./app"
# go run main.go