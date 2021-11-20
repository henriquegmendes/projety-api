import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import { verifyLoginToken } from '../utils/jwt';

const protectedRouteMiddleware = (req, res, next) => {
  try {
    const bearerToken = req.get('Authorization');

    if (!bearerToken) {
      throw new NotAuthorizedException('Missing token');
    }

    try {
      const token = bearerToken.slice(7);
      const tokenInfo = verifyLoginToken(token);

      req.user = {
        id: tokenInfo.id,
        role: tokenInfo.role,
      };

      next();
    } catch (error) {
      throw new NotAuthorizedException('Invalid or expired token');
    }
  } catch (error) {
    next(error);
  }
};

export default protectedRouteMiddleware;
