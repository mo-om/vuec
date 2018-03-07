import unmatch from './unmatch';
import login from './login';
import home from './home';
import demo from './demo';

const routers = [
  ...unmatch,
  ...login,
  ...home,
  ...demo,
]

export default routers;
