/**
 * Created by samn on 21/06/14.
 */
define([
    'backbone'
], function (Backbone) {
    return Backbone.Model.extend({
        url:'/todo/api/v1.0/tasks',
        defaults: {
            title: '',
            completed: false
        },
        initialize: function(){
            this.on('all', this.handleEvents);
        },
        handleEvents: function(type, data){
            switch(type){
                case 'change:completed':
//                    data.save();
                    break;
            }

        }
    });
});