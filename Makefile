install:
	npm ci
test:
	npx jest
lint:
	npx eslint
publish:
	npm publish --dry-run
coverage:
	npx jest --coverage
