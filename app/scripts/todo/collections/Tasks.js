/**
 * Created by samn on 22/06/14.
 */
define([
    'backbone',
    '../models/Task'
], function (Backbone, Task) {
    return Backbone.Collection.extend({
        model: Task,
        rootUrl: '',
        url: function () {
            return this.rootUrl + '/todo/api/v1.0/tasks'
        },
        initialize: function () {
            _.bindAll(this, 'handleEvents');
            this.fetch();
            this.on('all', this.handleEvents);
        },

        handleEvents: function (type, data) {
            switch (type) {
            }
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