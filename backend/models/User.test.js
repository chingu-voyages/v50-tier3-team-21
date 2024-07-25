const { Sequelize, DataTypes } = require('sequelize');
const { sequelize, User } = require('../models');
const bcrypt = require('bcrypt');

beforeAll(async () => {
    await sequelize.sync({ force: false });
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

        const isMatch = await bcrypt.compare('testpassword123', testUser.password);
        expect(isMatch).toBe(true);
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

    test('should update a user with a new password', async () => {
        testUser.password = 'testnewpassword';
        await testUser.save();

        const updatedUser = await User.findByPk(testUser.id);
        const isMatch = await bcrypt.compare('testnewpassword', updatedUser.password);
        expect(isMatch).toBe(true);
    });

    test('should update a user with a firstName, lastName and contact', async () => {
        testUser.firstName = 'Test';
        testUser.lastName = 'User';
        testUser.contact = '123456789';
        await testUser.save();

        const updatedUser = await User.findByPk(testUser.id);
        expect(updatedUser.firstName).toBe('Test');
        expect(updatedUser.lastName).toBe('User');
        expect(updatedUser.contact).toBe('123456789');
    });

    test('should delete a user', async () => {
        await User.destroy({
            where: { id: testUser.id }
        });

        const deletedUser = await User.findByPk(testUser.id);
        expect(deletedUser).toBeNull();
    });
});

