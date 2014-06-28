/**
 * Created by samn on 22/06/14.
 */
define([
    'underscore',
    'backbone',
    '../models/Task'
], function (_, Backbone, Task) {

    return Backbone.Collection.extend({
        model: Task,
        url: 'http://127.0.0.1:5000/todo/api/v1.0/tasks',

        initialize: function () {
            this.fetch();
        },

        removeCompleted: function () {
            this.remove(this.where({completed: true}));
        },

        completeAll: function () {
            this.each(function (item) {
                item.set({completed: true});
            });
        },

        getNumUncompleted: function () {
            return this.where({completed: false}).length;
        }
    });
});