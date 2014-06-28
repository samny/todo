/**
 * Entry point for runtime loading of scripts.
 * Loads config for additional require.config then starts the app by loading the 'init' module
 */

require.config({
    baseUrl: 'scripts/',
    urlArgs: 'bust=' + (new Date()).getTime()
});

require([
    'config'
], function () {
    'use strict';
    require(['init']);
});
