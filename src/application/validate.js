import _ from 'lodash';
import * as yup from 'yup';

const shema = yup.string().required('Ссылка должна быть валидным URL').url();

export default (fields) => {
  try {
    shema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return _.keyBy(e.inner, 'path');
  }
};
