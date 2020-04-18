import {extend, localize} from 'vee-validate';
import {required, alpha_spaces, email} from 'vee-validate/dist/rules';
import lang from 'vee-validate/dist/locale/es.json';

function validate() {
  extend('required', required);
  extend('alpha_spaces', alpha_spaces);
  extend('email', email);
  extend('nick', value => {
    if (/^[_?A-Za-z][A-Za-z0-9]+$/i.test(value)) {
      return true;
    }

    return 'El nick es invalido';
  });
  localize('es', lang);
}

export default validate;
