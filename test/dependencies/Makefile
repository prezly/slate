.PHONY: test

REACT_VERSION ?= 18
SLATE_VERSION := $(shell cat ../../package.json | grep '"slate":' | cut -d'"'  -f4)
SLATE_REACT_VERSION := $(shell cat ../../package.json | grep '"slate-react":' | cut -d'"'  -f4)
SLATE_HISTORY_VERSION := $(shell cat ../../package.json | grep '"slate-history":' | cut -d'"'  -f4)

test: clean app/package.json
	npm add react@$(REACT_VERSION) react-dom@$(REACT_VERSION) --prefix=./app --no-package-lock
	npm add ../../packages/slate-types --strict-peer-deps --prefix=./app --no-package-lock
	npm add ../../packages/slate-commons --strict-peer-deps --prefix=./app --no-package-lock
	npm add ../../packages/slate-lists --strict-peer-deps --prefix=./app --no-package-lock
	npm add ../../packages/slate-tables --strict-peer-deps --prefix=./app --no-package-lock
	npm add ../../packages/slate-editor --strict-peer-deps --prefix=./app --no-package-lock
	npm install --install-links --strict-peer-deps --prefix=./app

app/package.json: app
	cat package.json \
		| sed 's/"$${dependencies}"/{ "slate": "$(SLATE_VERSION)", "slate-react": "$(SLATE_REACT_VERSION)", "slate-history": "$(SLATE_HISTORY_VERSION)" }/' \
		> app/package.json

app:
	mkdir -p app

clean:
	rm -rf app/*
