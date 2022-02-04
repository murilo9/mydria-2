## Test environment

The local test environment works with a local mongo database running on port ```27017```, on database ```mydria_db_test```, user ```mydria``` with password ```123```. It's JWT secret is ```mydria```.
All this configuration must be set at the .env-cmdrc.json file so all the tests may run propperly.
### Setting up the test database

To create the test database, create a Docker container with ```docker run --name mydria_test -p 27017:27017 -v ~/data:/data/db -d mongo```.
If a user does not exist, create one with:
```
use mydria_db_test
db.createUser({ user: "mydria", pwd: "123", roles: [ { role: "readWrite", db: "mydria_db_test" }}) 
```
This way it may persist the database data within the */data* folder.
If the container is already created, start/stop it with ```docker start/stop mydria_test```.