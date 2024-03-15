# cvs-tsk-transform-tech-records

AWS Lambda function that splits and flattens technical records from the technical-records DynamoDB and inserts them into the flat-tech-records DynamoDB. This is selectively performed on records that have either been inserted or modified in the technical-records DynamoDB. The full solution design can be found on [Confluence](https://dvsa.atlassian.net/wiki/spaces/HVT/pages/18318439/Update+to+Tech+Record+Data+Structure).

---
## Description
A technical record from the technical-records DynamoDB can contain multiple versions of the original technical record (i.e. archival and current versions) within the `techRecord` array of the record object, this Lambda creates individual records for each version of the technical record and makes `createdTimestamp` the range key instead of `vin` in order to retrieve the latest technical record for a given vehicle.

#### Before:
```json
{
 "systemNumber": "1111",
 "vin": "xxxx",
 "primaryVrm": "vvvv",
 "partialVin": "989898",
 "techRecord": [
  {
   "bodyType": {
    "description": "refuse",
    "code": "r"
    },
    ...
    "grossKerbWeight": 2500,
  },
  ]
}
```

#### After:
```json
{
 "systemNumber": "1111",
 "vin": "xxxx",
 "primaryVrm": "vvvv",
 "partialVin": "989898",
 "createdTimestamp": "2019-06-24T10:26:54.903Z",
 "techRecord_bodyType_description": "refuse",
 "techRecord_bodyType_code": "r",
 ...
 "techRecord_grossKerbWeight": 2500
}
``` 
---
## Running the project
### Dependencies
The project runs on node 18.x with typescript. For further details about project dependencies, please refer to the `package.json` file.

Once the dependencies are installed (`npm install`), you will be required to rename the `.env.example` file to `.env.local` as we use dotenv files for configuration for local local development for example. Further information about [variables](https://www.serverless.com/framework/docs/providers/aws/guide/variables/) and [environment variables](https://www.serverless.com/framework/docs/environment-variables/) with serverless.
Please note that multiple `.env` files can be created per environments. Our current development environment is 'local'.

The application runs on port `:3002` by default when no stage is provided.

The service has local environmental variables (please see `env` placeholder file) set locally however should we wish to further extend the service, the environmental variables will need to be ported over to the CI/CD pipeline which currently uses `BRANCH`.

### Environments

We use `NODE_ENV` environment variable to set multi-stage builds (region, stages) with the help of dotenv through npm scripts to load the relevant `.env.<NODE_ENV>` file from `./config` folder into the `serverless.yml` file as we don't rely on serverless for deployment.
If no `NODE_ENV` value is provided when running the scripts, it will default its `NODE_ENV` value to 'development' with the `.env.development` config file.

The defaulted values for 'stage' and 'region' are `'local'`. Please refer to the values provided in the `serverless.yml` file.

The following values can be provided when running the scripts with `NODE_ENV`:

```ts
// ./config/.env.<NODE_ENV> files
'local'; // used for local development
'development'; // used development staging should we wish to require external services
'test'; // used during test scripts where local services, mocks can be used in conjonction
```

```ts
/** Running serverless offline as an example for a specific stage - 'local'.
* Stage 'local' will be injected in the serverless.yml
**/
NODE_ENV=local serverless offline
```

Further details about environment setup can be found in the provided documentation and `env.example` file.

All secrets the secrets are will stored in `AWS Secrets Manager`.

### Scripts

The following scripts are available, for further information please refer to the project `package.json` file:

- <b>start</b>: `npm start` - _launch serverless offline service_
- <b>dev</b>: `npm run dev` - _run in parallel the service and unit tests in_ `--watch` _mode with live reload_.
- <b>test</b>: `npm run test` - _execute the unit test suite_
- <b>build</b>: `npm run build` - _bundle the project for production_

### Tests
- The [Jest](https://jestjs.io/) framework is used to run tests and collect code coverage
- To run the tests, run the following command within the root directory of the project: `npm test`
- Coverage results will be displayed on terminal and stored in the `coverage` directory
    - The coverage requirements can be set in `jest.config.js`


### Logging
Logging is achieved using the npm package Winston which allows for INFO, DEBUG, WARN, ERROR, etc. levels to be utilised. The logger can be accessed by importing it into the respective file from `src/util/logger.ts`
- `logger.info("")`
- `logger.error("", error)`
- `logger.debug("")`

---
## Contributing

To facilitate the standardisation of the code, a few helpers and tools have been adopted for this repository.

### External dependencies

The projects has multiple hooks configured using [husky](https://github.com/typicode/husky#readme) which will execute the following scripts: `audit`, `lint`, `build`, `test` and format your code with [eslint](https://github.com/typescript-eslint/typescript-eslint#readme) and [prettier](https://github.com/prettier/prettier).

You will be required to install [git-secrets](https://github.com/awslabs/git-secrets) (_brew approach is recommended_).

We follow the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/) when we commit code to the repository and follow the [angular convention](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum).

The type is mandatory and must be all lowercase.
The scope of your commit remain is also mandatory, it must include your ticket number and be all lowercase. The format for the ticket number can be set in the `commitlint.config.js` file.

```js
// Please see /commitlint.config.js for customised format

type(scope?): subject

// examples
'chore(cb2-1234): my commit msg' // pass
'CHORE(cb2-1234): my commit msg' // will fail
```


### Toolings

The code uses [eslint](https://eslint.org/docs/user-guide/getting-started), [typescript clean code standards](https://github.com/labs42io/clean-code-typescript) as well as [SonarQube for static analysis](https://docs.sonarqube.org/latest/).
SonarQube is available locally, please follow the instructions below if you wish to run the service locally (docker is the preferred approach):

- _Docker_:
  - Run `docker run -d -p 9000:9000 --name sonarqube sonarqube:latest`
  - The SonarQube container won't start automatically with your PC. To start it run `docker start sonarqube`
  - Login with admin/admin - http://localhost:9000 and create a Project with name and key found in `./sonar-project.properties`. There you'll also find instructions for creating and configuring an authentication token.
  - Run the analysis with `npm run sonar-scanner`

- _Brew_:
  - Install SonarQube using brew
  - Change `sonar.host.url` to point to localhost, by default, sonar runs on `http://localhost:9000`
  - run the sonar server `sonar start`, then perform your analysis `npm run sonar-scanner`

- _Manual_:
  - Add sonar-scanner in environment variables in your \_profile file add the line: `export PATH=<PATH_TO_SONAR_SCANNER>/sonar-scanner-3.3.0.1492-macosx/bin:$PATH`
  - Start the SonarQube server: `cd <PATH_TO_SONARQUBE_SERVER>/bin/macosx-universal-64 ./sonar.sh start`
  - In the microservice folder run the command: `npm run sonar-scanner`