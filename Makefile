test:
	./node_modules/.bin/mocha tests/* -t 70000 -R spec --bail

.PHONY: test
