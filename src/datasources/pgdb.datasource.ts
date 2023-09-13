import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {JugglerDataSource} from '@loopback/repository';

const config = {
  name: 'pgdb',
  connector: 'postgresql',
  host: 'localhost',
  port: 6003,
  user: 'postgres',
  password: 'super-secret',
  database: 'postgres',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PgdbDataSource
  extends JugglerDataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'pgdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.pgdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
