/**
 * Main AMD Config.
 * Used both for runtime loading, testing and r.js builds
 *
 * For r.js bulds the 'bootstrapper' module needs to be included and required in grunt config for the app to start
 */

define(function () {
    'use strict';

    return require.config({

        paths: {
            jquery: 'lib/jquery',
            underscore: 'lib/underscore',
            backbone: 'lib/backbone'
        },
        packages: [
            { name: 'todo', location: 'todo' }
        ],
        shim: {
            'modernizr': {
                exports: 'Modernizr'
            }
        }
    });
});