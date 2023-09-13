import {repository} from '@loopback/repository';
import {get} from '@loopback/rest';
import Sequelize from 'sequelize';
import {DoctorRepository} from '../repositories';

export class TryItOutController {
  constructor(
    @repository(DoctorRepository) public doctorRepo: DoctorRepository,
  ) {}
  @get('/try-it-out', {
    responses: {[200]: {}},
  })
  tryItOut() {
    // console.log(Sequelize.literal('Patient.name'));
    // return this.doctorRepo.find({
    //   include: [
    //     {
    //       relation: 'patients',
    //     },
    //   ],
    //   order: [`id DESC`],
    // });

    return this.doctorRepo.sequelizeModel.findAll({
      include: 'patients',
      order: [[Sequelize.literal('Patients.id'), 'DESC']],
    });
  }
}
