import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {Patient, PatientRelations} from '../models';
import {SequelizeCrudRepository} from '@loopback/sequelize';

export class PatientRepository extends SequelizeCrudRepository<
  Patient,
  typeof Patient.prototype.id,
  PatientRelations
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(Patient, dataSource);
  }
}
