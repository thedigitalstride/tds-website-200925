#!/bin/bash

# Development Stable Start Script
# This script ensures a clean start for the development server to prevent draftMode context errors

echo "🚀 Starting stable development server..."
echo ""

# Function to clean build artifacts
clean_build() {
    echo "🧹 Cleaning build artifacts..."
    rm -rf .next 2>/dev/null
    rm -rf node_modules/.cache 2>/dev/null
    echo "✅ Build artifacts cleaned"
    echo ""
}

# Function to wait for server readiness
wait_for_server() {
    local max_attempts=30
    local attempt=1

    echo "⏳ Waiting for server to be ready..."

    while [ $attempt -le $max_attempts ]; do
        if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|404"; then
            echo "✅ Server is ready!"
            return 0
        fi

        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done

    echo ""
    echo "⚠️  Server took longer than expected to start"
    return 1
}

# Main execution
main() {
    # Clean build artifacts
    clean_build

    # Set environment variables for better stability
    export NODE_OPTIONS="--max-old-space-size=8192"
    export NEXT_TELEMETRY_DISABLED=1

    echo "🔧 Environment configured:"
    echo "   - Increased Node.js memory limit to 8GB"
    echo "   - Disabled Next.js telemetry"
    echo ""

    echo "📦 Starting development server with pnpm dev..."
    echo ""

    # Start the dev server
    pnpm dev &
    DEV_PID=$!

    # Wait for server to be ready
    wait_for_server

    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Development server is running!"
        echo "   - URL: http://localhost:3000"
        echo "   - Admin: http://localhost:3000/admin"
        echo ""
        echo "Press Ctrl+C to stop the server"
        echo ""

        # Keep the script running and forward signals to the dev server
        trap "kill $DEV_PID; exit" SIGINT SIGTERM
        wait $DEV_PID
    else
        echo "❌ Failed to start development server"
        kill $DEV_PID 2>/dev/null
        exit 1
    fi
}

# Run the main function
main