#!/bin/bash

# MongoDB Migration Script
# Downloads data from MongoDB Atlas to local Docker MongoDB

set -e  # Exit on error

# Configuration
ONLINE_URI="mongodb+srv://Vercel-Admin-tds-website-2025:hTy40QawOZQeK5qY@tds-website-2025.hpgu6sl.mongodb.net/?retryWrites=true&w=majority"
LOCAL_URI="mongodb://localhost:27017"
DB_NAME="atlas-tds-website-2025"
BACKUP_DIR="./mongodb-backup"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="${BACKUP_DIR}/${TIMESTAMP}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
print_step() {
    echo -e "${GREEN}▶${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Check if MongoDB tools are installed
check_mongodb_tools() {
    if ! command -v mongodump &> /dev/null; then
        print_error "mongodump not found. Installing MongoDB Database Tools..."
        echo ""
        echo "On macOS, run:"
        echo "  brew tap mongodb/brew"
        echo "  brew install mongodb-database-tools"
        echo ""
        exit 1
    fi
    
    if ! command -v mongorestore &> /dev/null; then
        print_error "mongorestore not found. Installing MongoDB Database Tools..."
        echo ""
        echo "On macOS, run:"
        echo "  brew tap mongodb/brew"
        echo "  brew install mongodb-database-tools"
        echo ""
        exit 1
    fi
}

# Check if Docker is running
check_docker() {
    if ! docker ps &> /dev/null; then
        print_error "Docker is not running. Please start Docker Desktop."
        exit 1
    fi
}

# Ensure local MongoDB is running
ensure_local_mongodb() {
    print_step "Checking local MongoDB container..."
    
    if ! docker ps | grep -q tds-mongodb; then
        print_warning "Local MongoDB container not running. Starting it..."
        docker-compose up -d
        
        # Wait for MongoDB to be ready
        print_step "Waiting for MongoDB to be ready..."
        sleep 5
        
        # Check if it's actually ready
        max_attempts=30
        attempt=0
        while [ $attempt -lt $max_attempts ]; do
            if docker exec tds-mongodb mongosh --eval "db.adminCommand('ping')" &> /dev/null; then
                print_success "MongoDB is ready"
                break
            fi
            attempt=$((attempt + 1))
            sleep 1
        done
        
        if [ $attempt -eq $max_attempts ]; then
            print_error "MongoDB failed to start. Check logs with: docker-compose logs mongodb"
            exit 1
        fi
    else
        print_success "Local MongoDB container is running"
    fi
}

# Backup existing local data (if any)
backup_local_data() {
    print_step "Checking for existing local data..."
    
    # Check if database exists and has collections
    COLLECTION_COUNT=$(docker exec tds-mongodb mongosh tds-website --quiet --eval "db.getCollectionNames().length" 2>/dev/null || echo "0")
    
    if [ "$COLLECTION_COUNT" -gt 0 ]; then
        print_warning "Existing data found in local database. Creating backup..."
        LOCAL_BACKUP="${BACKUP_DIR}/local_backup_${TIMESTAMP}"
        
        docker exec tds-mongodb mongodump --db="$DB_NAME" --out="/tmp/local_backup"
        docker cp tds-mongodb:/tmp/local_backup "$LOCAL_BACKUP"
        docker exec tds-mongodb rm -rf /tmp/local_backup
        
        print_success "Local backup created at: $LOCAL_BACKUP"
    else
        print_success "No existing data to backup"
    fi
}

# Export from online MongoDB
export_from_online() {
    print_step "Exporting data from MongoDB Atlas..."
    print_warning "This may take a while depending on data size..."
    
    # Create backup directory
    mkdir -p "$BACKUP_PATH"
    
    # Export with database name specified
    if mongodump --uri="$ONLINE_URI" --db="$DB_NAME" --out="$BACKUP_PATH" 2>&1; then
        print_success "Export completed"
    else
        # If database name fails, try without (dumps all databases)
        print_warning "Export with database name failed, trying without database name..."
        if mongodump --uri="$ONLINE_URI" --out="$BACKUP_PATH" 2>&1; then
            print_success "Export completed (all databases)"
        else
            print_error "Export failed. Check your connection string and network connection."
            exit 1
        fi
    fi
    
    # Check if backup was created
    if [ ! -d "$BACKUP_PATH/$DB_NAME" ] && [ ! -d "$BACKUP_PATH" ]; then
        print_error "Backup directory is empty. Export may have failed."
        exit 1
    fi
}

# Import to local MongoDB
import_to_local() {
    print_step "Importing data to local MongoDB..."
    
    # Determine backup path
    if [ -d "$BACKUP_PATH/$DB_NAME" ]; then
        RESTORE_PATH="$BACKUP_PATH/$DB_NAME"
    else
        # If database folder doesn't exist, try the backup path directly
        RESTORE_PATH="$BACKUP_PATH"
    fi
    
    # Drop existing database to ensure clean import
    print_warning "Dropping existing local database for clean import..."
    docker exec tds-mongodb mongosh "$DB_NAME" --eval "db.dropDatabase()" --quiet
    
    # Restore data
    if mongorestore --uri="$LOCAL_URI" --db="$DB_NAME" "$RESTORE_PATH" 2>&1; then
        print_success "Import completed"
    else
        print_error "Import failed. Check the error messages above."
        exit 1
    fi
}

# Verify import
verify_import() {
    print_step "Verifying imported data..."
    
    # Get collection count
    COLLECTIONS=$(docker exec tds-mongodb mongosh "$DB_NAME" --quiet --eval "db.getCollectionNames().join(',')" 2>/dev/null || echo "")
    
    if [ -z "$COLLECTIONS" ]; then
        print_error "No collections found after import!"
        exit 1
    fi
    
    print_success "Collections imported: $COLLECTIONS"
    
    # Get document counts for main collections
    print_step "Document counts:"
    for collection in pages posts media users categories; do
        COUNT=$(docker exec tds-mongodb mongosh "$DB_NAME" --quiet --eval "db.$collection.countDocuments()" 2>/dev/null || echo "0")
        if [ "$COUNT" != "0" ]; then
            echo "  - $collection: $COUNT documents"
        fi
    done
    
    # Get total document count
    TOTAL=$(docker exec tds-mongodb mongosh "$DB_NAME" --quiet --eval "
        var total = 0;
        db.getCollectionNames().forEach(function(c) {
            total += db[c].countDocuments();
        });
        print(total);
    " 2>/dev/null || echo "0")
    
    print_success "Total documents: $TOTAL"
}

# Main execution
main() {
    echo ""
    echo "=========================================="
    echo "MongoDB Migration: Atlas → Local Docker"
    echo "=========================================="
    echo ""
    
    # Pre-flight checks
    check_mongodb_tools
    check_docker
    ensure_local_mongodb
    
    # Migration steps
    backup_local_data
    export_from_online
    import_to_local
    verify_import
    
    echo ""
    echo "=========================================="
    print_success "Migration completed successfully!"
    echo "=========================================="
    echo ""
    echo "Backup location: $BACKUP_PATH"
    echo ""
    echo "To connect to your local MongoDB:"
    echo "  docker exec -it tds-mongodb mongosh $DB_NAME"
    echo ""
    echo "To update your .env file for local development:"
    echo "  MONGODB_URI=mongodb://localhost:27017/$DB_NAME"
    echo ""
}

# Run main function
main

