import PasswordService from 'services/PasswordService';

const Password = new PasswordService();

const password = 'MinhaSenhaSecreta';

describe('Encrypt Password', () => {
  it('should be check password', async () => {
    const encrypted = await Password.encryptPassword({ password });

    const checked = await Password.checkPassword({
      password,
      passwordHash: encrypted,
    });

    expect(checked).toBeDefined();
  });

  it('should be get and error on check password', async () => {
    const encrypted = await Password.encryptPassword({ password });

    await expect(
      Password.checkPassword({
        password: null,
        passwordHash: encrypted,
      })
    ).rejects.toThrowError(new Error('Not its possible decrypt a password!'));
  });
});
