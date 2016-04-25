NODE_VERSION = 4.2.3
NODE_IMAGE = node:$(NODE_VERSION)
DEV_IMAGE = imaginedev
PWD = $(shell pwd)

all: clean
.PHONY: all

image:
	docker build -t $(DEV_IMAGE) .
.PHONY: image

bash:
	docker run -it -v $(PWD):/opt/app -w /opt/app $(DEV_IMAGE) bash
.PHONY: bash
