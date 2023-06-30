wait-for "mysql:3306" -- "$@"

go run main.go