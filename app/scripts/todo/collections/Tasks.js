/**
 * Created by samn on 22/06/14.
 */
define([
    'backbone',
    '../models/Task'
], function (Backbone, Task) {
    return Backbone.Collection.extend({
        model: Task,
        rootUrl: 'http://127.0.0.1:5000',
        url: function(){return this.rootUrl + '/todo/api/v1.0/tasks'},
        initialize: function () {
            this.fetch();
        }
    });
});