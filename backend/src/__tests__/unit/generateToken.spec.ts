import 'dotenv/config';
import AuthenticationService from 'services/AuthenticationService';

const Authentication = new AuthenticationService();
const user = {
  id: '1',
  email: 'oofleaoo@gmail.com',
};

describe('Generate a user Token', () => {
  it('should be generate an user Token', async () => {
    const generatedToken: string = await Authentication.generateToken(user);
    return expect(generatedToken).toHaveLength(179);
  });

  it('should test error on generate token', async () => {
    await expect(
      Authentication.generateToken({ ...user, options: { expiresIn: null } })
    ).rejects.toThrow();
  });
});
