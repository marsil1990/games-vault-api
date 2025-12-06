const mongoose = require('mongoose');
const Game = require('../models/Game');
const Genre = require('../models/Genre');
const Platform = require('../models/Platform');
const Studio = require('../models/Studio');
const User = require('../models/User');

describe('Model Tests', () => {

    // We close the connection to mongoose at the end so that Jest doesn't get stuck.
    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('Game Model', () => {
        it('should fail if title is missing', async () => {
            const game = new Game({ description: 'A game without a title' });
            let err;
            try {
                await game.validate();
            } catch (error) {
                err = error;
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(err.errors.title).toBeDefined();
        });

        it('should have multiplayer as false by default', () => {
            const game = new Game({ title: 'Single Player Game' });
            expect(game.multiplayer).toBe(false);
        });
    });

    describe('Genre Model', () => {
        it('should correctly validate a valid genre', async () => {
            const genre = new Genre({ name: 'Action', description: 'Exciting games' });
            let err;
            try {
                await genre.validate();
            } catch (error) {
                err = error;
            }
            expect(err).toBeUndefined();
        });

        it('should fail if name is missing', async () => {
            const genre = new Genre({ description: 'A genre without a name' });
            let err;
            try {
                await genre.validate();
            } catch (error) {
                err = error;
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(err.errors.name).toBeDefined();
        });
    });

    describe('Platform Model', () => {
        it('should fail if required fields are missing', async () => {
            const platform = new Platform({ name: 'New Console' }); // Missing manufacturer, country, foundedYear
            let err;
            try {
                await platform.validate();
            } catch (error) {
                err = error;
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(err.errors.manufacturer).toBeDefined();
            expect(err.errors.country).toBeDefined();
            expect(err.errors.foundedYear).toBeDefined();
        });
    });

    describe('Studio Model', () => {
        it('should fail if name is missing', async () => {
            const studio = new Studio({ country: 'USA' });
            let err;
            try {
                await studio.validate();
            } catch (error) {
                err = error;
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(err.errors.name).toBeDefined();
        });
    });

    describe('User Model', () => {
        it('should fail if googleId or email are missing', async () => {
            const user = new User({ name: 'Test User' });
            let err;
            try {
                await user.validate();
            } catch (error) {
                err = error;
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(err.errors.googleId).toBeDefined();
            expect(err.errors.email).toBeDefined();
        });
    });
});