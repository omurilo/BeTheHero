import PasswordService from 'services/PasswordService';

const Password = new PasswordService();

const password = 'MinhaSenhaSecreta';

describe('Encrypt Password', () => {
  it('should be encrypt password', async () => {
    const encrypted = await Password.encryptPassword({ password });

    expect(encrypted).toBeDefined();
  });

  it('should be get and error on encrypt password', async () => {
    await expect(
      Password.encryptPassword({ password: null, salt: NaN })
    ).rejects.toThrow();
  });
});
