/**
 * Initiates the site scripts
 */
define([
    'underscore',
    'todo'
], function (_, todo) {
    'use strict';
    return todo.init();
});