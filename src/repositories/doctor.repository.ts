import {Getter, inject} from '@loopback/core';
import {
  HasManyThroughRepositoryFactory,
  repository,
} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {Appointment, Doctor, DoctorRelations, Patient} from '../models';
import {SequelizeCrudRepository} from '@loopback/sequelize';
import {AppointmentRepository} from './appointment.repository';
import {PatientRepository} from './patient.repository';

export class DoctorRepository extends SequelizeCrudRepository<
  Doctor,
  typeof Doctor.prototype.id,
  DoctorRelations
> {
  public readonly patients: HasManyThroughRepositoryFactory<
    Patient,
    typeof Patient.prototype.id,
    Appointment,
    typeof Doctor.prototype.id
  >;

  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @repository.getter('AppointmentRepository')
    protected appointmentRepositoryGetter: Getter<AppointmentRepository>,
    @repository.getter('PatientRepository')
    protected patientRepositoryGetter: Getter<PatientRepository>,
  ) {
    super(Doctor, dataSource);
    this.patients = this.createHasManyThroughRepositoryFactoryFor(
      'patients',
      patientRepositoryGetter,
      appointmentRepositoryGetter,
    );
    this.registerInclusionResolver('patients', this.patients.inclusionResolver);
  }
}
