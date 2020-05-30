**Express Boilerplate**  

*Features:*  
  * A generator to generate models and controllers. Use ```npm run generate model YOUR_MODEL_NAME``` to generate a model and its corresponding controller. ```npm run generate model Test``` will generate a ```Test.js``` model and a ```tests-controller.js``` controller. ```npm run g``` is an alias for ```npm run generate```
  * A console where all models are available. Use this to verify data on the database and run model methods. Use ```npm run console``` to start the console. ```npm run c``` is an alias for ```npm run console```
  * A login controller. Login is done using http only cookie. It is extremely secure. Login is done by encoding and decoding jwt tokens.
  * User and Product models and their respective controllers and tests are written by default for reference.

*To do:*
  * Clone the repository in a local folder.
  * Change the git origin to your repository.
  * Make a new file on config according to the example provided. The file is a jwt secret key. Use a secure string. Don't share the content with anybody.
  * Verify your node version. Required version: ```12.16.3``` or higher.
  * ```npm install```
  * Push to your repository.
  * Done: :)
