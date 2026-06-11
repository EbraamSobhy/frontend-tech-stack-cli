# Variables
APP_NAME=<project-name>
PACKAGE_MANAGER=npm

# Default target
.DEFAULT_GOAL := help

# Install dependencies
install:
	$(PACKAGE_MANAGER) install

# Start development server
dev:
	$(PACKAGE_MANAGER) run dev

# Build production files
build:
	$(PACKAGE_MANAGER) run build

# Preview production build
preview:
	$(PACKAGE_MANAGER) run preview

# Run lint
lint:
	$(PACKAGE_MANAGER) run lint

# Run tests (if configured)
test:
	$(PACKAGE_MANAGER) run test

# Clean node_modules and build output
clean:
	rm -rf node_modules dist

# Reinstall everything
reinstall: clean install

# Create production build and serve preview
start: build preview

# Help menu
help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make dev        - Start Vite dev server"
	@echo "  make build      - Build for production"
	@echo "  make preview    - Preview production build"
	@echo "  make lint       - Run linter"
	@echo "  make test       - Run tests"
	@echo "  make clean      - Remove node_modules and dist"
	@echo "  make reinstall  - Clean and reinstall dependencies"
	@echo "  make start      - Build and preview app"
