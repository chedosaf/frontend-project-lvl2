install:
	npm install
	chmod +x ./bin/gendiff.js
	npm link

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

