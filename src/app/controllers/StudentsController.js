import * as Yup from 'yup';
import Student from '../models/Students';

class StudentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number().required(),
      peso: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Invalid schema' });
    }

    const { name, email, idade, peso } = req.body;

    const emailExist = await Student.findOne({ where: { email } });

    if (emailExist) {
      return res.status(401).json({ error: 'Email already exist' });
    }

    await Student.create(req.body);

    return res.json({
      name,
      email,
      idade,
      peso,
    });
  }

  async update(req, res) {
    const { id, name, email, idade, peso } = req.body;

    if (email) {
      const emailExists = await Student.findOne({ where: { email } });

      if (emailExists) {
        return res.status(400).json({ error: 'Email already exist' });
      }
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      idade: Yup.number(),
      peso: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Invalid schema' });
    }

    const student = await Student.findByPk(id);

    await student.update(req.body);

    return res.json({
      name,
      email,
      idade,
      peso,
    });
  }
}

export default new StudentsController();
