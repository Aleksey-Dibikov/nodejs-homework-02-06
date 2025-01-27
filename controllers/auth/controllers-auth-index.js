import { HttpCode } from '../../libs/constants';
import authService from '../../service/auth/service-auth-index';

const registration = async (req, res, next) => {
    try {
        const { email } = req.body;
        const isUserExist = await authService.isUserExist(email);
        if (isUserExist) {    
            return res
                .status(HttpCode.CONFLICT)
                .json({
                    status: 'error',
                    code: HttpCode.CONFLICT,
                    message: 'Email in use'
                })
        }
        const data = await authService.create(req.body);
        res
            .status(HttpCode.CREATED)
            .json({
                status: 'success',
                code: HttpCode.CREATED,
                data,
            })        
    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);
  if (!user) {    
    return res
        .status(HttpCode.UNAUTHORIZED)
        .json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Email or password is wrong'
        })
  }
  const token = authService.getToken(user)
  await authService.setToken(user.id, token)
  res
      .status(HttpCode.OK)
      .json({
          status: 'success',
          code: HttpCode.OK,
          data: { token },
      })
};

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null)
  res
      .status(HttpCode.NO_CONTENT)
      .json({})
};

export {
    registration,
    login,
    logout
};
