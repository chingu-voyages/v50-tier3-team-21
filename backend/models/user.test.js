const { Sequelize, DataTypes } = require('sequelize');
const { sequelize, User } = require('../models')

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('User Model', () => {
    let testUser;

    test('should create a user', async () => {
        testUser = await User.create({
            username: 'testuser',
            password: 'testpassword123',
            email: 'testuser@example.com'
        });

        expect(testUser).toHaveProperty('id');
        expect(testUser.username).toBe('testuser');
        expect(testUser.email).toBe('testuser@example.com');
        expect(testUser.password).toBe('testpassword123');

    });

    test('should read a user', async () => {
        const foundUser = await User.findByPk(testUser.id);

        expect(foundUser).not.toBeNull();
        expect(foundUser.username).toBe('testuser');
    });

    test('should update a user', async () => {
        await User.update({ firstName: 'Test' }, {
            where: { id: testUser.id }
        });

        const updatedUser = await User.findByPk(testUser.id);
        expect(updatedUser.firstName).toBe('Test');
    });

    test('should delete a user', async () => {
        await User.destroy({
            where: { id: testUser.id }
        });

        const deletedUser = await User.findByPk(testUser.id);
        expect(deletedUser).toBeNull();
    });
});
