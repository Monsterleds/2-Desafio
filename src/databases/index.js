import Sequelize from 'sequelize';

import banco from '../config/database';

import User from '../app/models/User';
import Students from '../app/models/Students';

const models = [User, Students];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(banco);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
