# Step 1: Use the official Golang image for building
FROM golang:1.21 AS builder
# Set working directory
WORKDIR /app
# Copy Go modules and dependencies
COPY go.mod go.sum ./
RUN go mod download
# Copy source code
COPY . .
# Generate templ code
RUN go tool templ generate
# Build the application
RUN go build -o main .

# Step 2: Use a minimal base image for final deployment
FROM alpine:latest
# Set working directory in the container
WORKDIR /root/
# Copy the built binary from the builder stage
COPY --from=builder /app/main .
# Expose the application port
EXPOSE 3000
# Set environment variables
ENV MONGODB_URI=mongodb://127.0.0.1:27017/
ENV PORT=3000
# This part here is extremely bad, need an actual fix
ENV GODEBUG=multipartmaxparts=50000
# Run the application
CMD ["./main"]