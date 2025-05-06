install-deps:
	@ echo "Installing ToDo App Deps ... "
	@ cd app && npm install
	@ echo "Installing Cypress Tests Deps ... "
	@ cd test/cypress && npm install

start-app:
	@ echo "Starting ToDo App ... "
	@ cd app && npm run start

test-app:
	@ echo "Testing ToDo App ... "
	@ cd test/cypress && npm run cy:tests
