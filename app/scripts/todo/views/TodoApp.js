/**
 * Created by samn on 22/06/14.
 */
define([
    'underscore',
    'backbone',
    '../collections/Tasks',
    '../views/TodoItem'
], function (_, Backbone, Tasks, TodoItem) {
    var tasks = new Tasks();

    return Backbone.View.extend({
        el: '#TodoApp',
        collection: null,
        events: {
            'keyup .m-todo-add--input': 'handleKeyboard',
            'click .m-todo-add--submit': 'handleSubmit'
        },
        initialize: function () {
            _.bindAll(this,
                'render',
                'handleKeyboard',
                'handleSubmit',
                'addItem',
                'resetItems');

            this.collection = new Tasks();
            this.$list = this.$el.append('<ul></ul>');
            this.$input = this.$el.find('.m-todo-add--input');

            this.collection.on('add', this.addItem);
            this.collection.on('reset', this.resetItems);
        },

        render: function (e) {
            console.log(e, this);
        },

        handleKeyboard: function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.createNewItem();
            }
        },
        handleSubmit: function (e) {
            e.preventDefault();
            this.createNewItem();
        },


        addItem: function (task) {
            this.$list.append(new TodoItem({ model: task }).render().el);
        },

        resetItems: function (collection) {
            var self = this;
            this.$list.empty();
            collection.each(function (i, task) {
                self.addItem(task);
            });
        },
        createNewItem: function () {
            var title = this.$input.val();
            if(title){
                this.collection.add({title: title});
                this.$input.val('');
            }
        }
    });
});