APP_NAME := meta-photo-ui
IMAGE_NAME := meta-photo-ui-ssr
CONTAINER_NAME := meta-photo-ui
PORT := 4000

.PHONY: build run stop remove

build:
	docker build -t $(IMAGE_NAME) .

stop:
	@docker stop $(CONTAINER_NAME) || true

remove: stop
	@docker rm $(CONTAINER_NAME) || true

run: build remove
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):$(PORT) $(IMAGE_NAME)
