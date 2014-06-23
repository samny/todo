/**
 * Created by samn on 21/06/14.
 */
define([
    'backbone'
], function (Backbone) {
    return Backbone.Model.extend({
        defaults: {
            title: '',
            description:'',
            completed: false
        }
    });
});