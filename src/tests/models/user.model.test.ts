import '../../loadEnv';
import User from '../../models/user.model';
import sequelize from '../../models';

describe('User Model', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should have the correct attributes', () => {
    const attributes = User.getAttributes();

    expect(attributes).toHaveProperty('id');
    expect(attributes.id).toHaveProperty('type');
    expect(attributes.id).toHaveProperty('primaryKey', true);
    expect(attributes.id).toHaveProperty('defaultValue');

    expect(attributes).toHaveProperty('email');
    expect(attributes.email).toHaveProperty('type');
    expect(attributes.email).toHaveProperty('allowNull', false);
    expect(attributes.email).toHaveProperty('unique', true);

    expect(attributes).toHaveProperty('firstName');
    expect(attributes.firstName).toHaveProperty('type');
    expect(attributes.firstName).toHaveProperty('allowNull', false);

    expect(attributes).toHaveProperty('lastName');
    expect(attributes.lastName).toHaveProperty('type');
    expect(attributes.lastName).toHaveProperty('allowNull', false);

    expect(attributes).toHaveProperty('password');
    expect(attributes.password).toHaveProperty('type');
    expect(attributes.password).toHaveProperty('allowNull', false);

    expect(attributes).toHaveProperty('tokenVersion');
    expect(attributes.tokenVersion).toHaveProperty('type');
    expect(attributes.tokenVersion).toHaveProperty('defaultValue', 0);

    expect(attributes).toHaveProperty('creationDate');
    expect(attributes.creationDate).toHaveProperty('type');
    expect(attributes.creationDate).toHaveProperty('allowNull', false);

    expect(attributes).toHaveProperty('updatedOn');
    expect(attributes.updatedOn).toHaveProperty('type');
    expect(attributes.updatedOn).toHaveProperty('allowNull', false);

    expect(attributes).toHaveProperty('deletionDate');
    expect(attributes.deletionDate).toHaveProperty('type');
    expect(attributes.deletionDate).toHaveProperty('allowNull', true);
  });
});
