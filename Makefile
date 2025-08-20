# Path pro docker-compose de dev
DOCKER_COMPOSE_DEV=docker/dev/docker-compose.yaml

.PHONY: up down restart logs

# Start containers
up:
	docker-compose -f $(DOCKER_COMPOSE_DEV) --env-file $(PWD)/.env up -d


# Stop containers
down:
	docker-compose -f $(DOCKER_COMPOSE_DEV) down

# Restart containers
restart: down up

# Show logs
logs:
	docker-compose -f $(DOCKER_COMPOSE_DEV) logs -f

# Reset (remove volumes e recria)
reset:
	docker-compose -f $(DOCKER_COMPOSE_DEV) down -v
	docker-compose -f $(DOCKER_COMPOSE_DEV) up -d
