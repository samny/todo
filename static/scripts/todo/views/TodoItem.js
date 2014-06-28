/**
 * Created by samn on 22/06/14.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    return Backbone.View.extend({
        tagName: 'li',
        className: 'm-todo-item',
        template: _.template('<label><input type="checkbox" <% if (typeof(completed) != "undefined" && completed === true ) { %>checked<% } %>/><span><%= title %></span></label>'),
        events: {
            'change [type=checkbox]': 'handleChange'
        },

        initialize: function () {
            _.bindAll(this, 'handleModelEvents');
            this.model.on('all', this.handleModelEvents);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.find('input').prop('checked');
            return this;
        },

        handleModelEvents: function (type) {
            switch (type) {
                case 'change:completed':
                    this.render();
                    break;
                case 'remove':
                    this.remove();
                    break;
            }
        },

        handleChange: function (e) {
            var completed = $(e.target).is(':checked');
            this.model.set({completed: completed});
        }
    });
});