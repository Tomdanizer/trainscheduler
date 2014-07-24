### README
# TrainScheduler Setup Guide
1. Install mysql server
   * username: root
   * password: rootme
   * Or if you already have mysql server installed, change the mysql login credentials in mysql.js to match.]
2. Using mysqlworkbench import one of the .sql files to create the schema.
    * or using mysql command line use the command `mysql -u username -p trainschedule < file.sql`
2. Install NodeJS [http://nodejs.org/](http://nodejs.org/) (Follow the README included with the download to install if not on windows)
3. Run `git clone git@github.Tomdanizer/trainscheduler.git` or download the zip [https://github.com/Tomdanizer/trainscheduler/archive/master.zip](https://github.com/Tomdanizer/trainscheduler/archive/master.zip)
4. Open up the nodejs/git command line/terminal & navigate to the **trainscheduler** directory.
5. In the directory **trainscheduler** run the command
   * `npm install`
   * This will install any required packages defined in packages.json
6. If you want to run the unit tests located in test.js, you will need to install mocha globally
   * `npm install mocha -g`
   * To execute the tests, run `mocha test.js` inside the **trainscheduler** directory.
7. Start the webserver with the command
   * `node web.js`
   * Open your browser to [http://localhost:3000](http://localhost:3000) or whatever port is listed in the command line.
   
   
### Heroku Installation
   If for whichever reason the above setup isn't able to work, I've also setup a heroku install, although file uploading/reading currently does not work due to heroku file permission & mysql permissions.
   However, all of the other functionality (Add/Edit/Delete etc) work.
   http://immense-tundra-3673.herokuapp.com/
