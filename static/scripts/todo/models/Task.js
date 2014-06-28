/**
 * Created by samn on 21/06/14.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    return Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false
        },

        initialize: function () {
            this.on('all', this.handleEvents);
        },

        handleEvents: function (type) {
            switch (type) {
                case 'add':
                    this.save();
                    break;
                case 'remove':
                    this.destroy();
                    break;
                case 'change:completed':
                    this.save();
                    break;
            }
        }
    });
});