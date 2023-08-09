echo "Waiting for backend to be ready..."
wait-for "backend:8080" -- "$@"
echo "Backend is ready!"

nginx -g "daemon off;"
