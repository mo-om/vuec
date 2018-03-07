import dev from './dev';
import fat from './fat';
import uat from './uat';
import pro from './pro';

const getApi = (env) => {
  return {
    'master'        : dev,
    'integration'   : fat,
    'pre-production': uat,
    'production'    : pro,
  }[env]
}

const { prefix, iamPrefix } = getApi(process.env.NODE_ENV);

export {
  prefix,
  iamPrefix
};
