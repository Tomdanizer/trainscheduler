### ReadME
# TrainScheduler Setup Guide
1. Install mysql server
   * username: root
   * password: rootme
   * Or if you already have mysql server installed, change the mysql login credentials in mysql.js to match.]
2. Install NodeJS [http://nodejs.org/](http://nodejs.org/)
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
