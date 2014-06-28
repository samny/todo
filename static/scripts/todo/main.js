define([
    'underscore',
    'backbone',
    './views/TodoApp',
], function (_, Backbone, TodoApp) {
    'use strict';

    return {
        init: function () {
            new TodoApp();
        }
    };
});