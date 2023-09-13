
The `scope` works for everything else other than `order` and `limit` in has many through relation.
Due to this issue https://github.com/sequelize/sequelize/issues/4376 (separate is used for these two options to work in relations)

I don’t see any direct alternative that can be done in this extension but sorting can be achieved if we directly call the findAll on sequelize something like this
```ts
this.doctorRepo.sequelizeModel.findAll({
      include: 'patients',
      order: [[Sequelize.literal('Patients.id'), 'DESC']],
});
```

Though it also include the through table result

Example response:

```json
[
  {
    "id": 2,
    "name": "Dr. Two",
    "patients": [
      {
        "id": 4,
        "name": "A Patient 4",
        "Appointment": {
          "id": 4,
          "doctorId": 2,
          "patientId": 4
        }
      }
    ]
  },
  {
    "id": 1,
    "name": "Dr. Joe",
    "patients": [
      {
        "id": 3,
        "name": "A Patient 3",
        "Appointment": {
          "id": 3,
          "doctorId": 1,
          "patientId": 3
        }
      },
      {
        "id": 2,
        "name": "Patient 2",
        "Appointment": {
          "id": 2,
          "doctorId": 1,
          "patientId": 2
        }
      },
      {
        "id": 1,
        "name": "Patient 1",
        "Appointment": {
          "id": 1,
          "doctorId": 1,
          "patientId": 1
        }
      }
    ]
  }
]
```

# sequelize-has-many-through

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

## Tests

```sh
npm test
```

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
