# App

This app is a web-based voting and connection system for decentralised cultural decision making and investment.

Using quadratic voting on the blockchain, App’s playful front-end interface allows everyone to vote on the types of cultural activity they would like to see in their locality.

App democratises arts commissioning by providing communities and artists with a way to make cultural decisions together. It does this by giving communities a bigger say in the activities provided in their area, and by connecting artists and cultural organisations to better information about what is meaningful in different localities.

## Requirements

- Node 14 environment
- PostgreSQL database

## Usage

Support for local docker development is available in:
[`bitspossessed/culturestake-provisioning`](https://github.com/Vudung0519/React-dapp)

```
// Install dependencies
npm install

// Copy .env file for local development and testing
cp .env.example .env

// Seed and migrate database.
npm run db:migrate
npm run db:seed

// Run tests
npm run test
npm run test:watch

// Check code formatting
npm run lint

// Before running the local server or running the tests, build the client assets at least once.
// Build the client assets and watch for changes (recommended during development).
npm run client:watch
// Or, build the client assets once.
npm run client:build

// Start local server and watch changes
npm run server:watch

// Build for production
npm run build

// Run production server
npm start
```

When seeding the database with `npm run db:seed` an initial admin user account is created. To login to admin panel during development go to `http://localhost:3000/login` and use the following credentials:

- user: admin@domain.com
- password: adminadmin

## Credits

this is a [Furtherfield](https://www.furtherfield.org/) / [DECAL](http://www.decal.is/) initiative.

## License

