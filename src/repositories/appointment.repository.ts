import {inject} from '@loopback/core';
import {PgdbDataSource} from '../datasources';
import {Appointment, AppointmentRelations} from '../models';
import {SequelizeCrudRepository} from '@loopback/sequelize';

export class AppointmentRepository extends SequelizeCrudRepository<
  Appointment,
  typeof Appointment.prototype.id,
  AppointmentRelations
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(Appointment, dataSource);
  }
}
