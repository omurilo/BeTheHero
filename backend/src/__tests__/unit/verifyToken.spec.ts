import 'dotenv/config';
import AuthenticationService from 'services/AuthenticationService';

const user = {
  id: '1',
  email: 'oofleaoo@gmail.com',
};
const Authentication = new AuthenticationService();

describe('Verify a user Token', () => {
  it('should be verify an user Token', async () => {
    const token: string = await Authentication.generateToken(user);

    const decoded: any = await Authentication.verifyToken(token);
    return expect(decoded).toMatchObject(user);
  });

  it('should test error on verify token', async () => {
    await expect(
      Authentication.verifyToken('TokenInvalidoQueEuVouMandar')
    ).rejects.toThrow();
  });
});
