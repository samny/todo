/**
 * Created by samn on 22/06/14.
 */
define([
    'underscore',
    'backbone',
    '../collections/Tasks',
    '../views/TodoItem'
], function (_, Backbone, Tasks, TodoItem) {

    return Backbone.View.extend({
        el: '#TodoApp',
        collection: null,
        events: {
            'keyup .m-todo-app__input': 'handleKeyboardSubmit',
            'click .m-todo-app__submit': 'handleSubmit',
            'click .m-todo-app__clear': 'handleClear',
            'click .m-todo-app__completeall': 'handleCompleteAll'
        },

        initialize: function () {
            _.bindAll(this,
                'render',
                'handleKeyboardSubmit',
                'handleSubmit',
                'addItem',
                'handleClear',
                'resetItems',
                'handleCollectionEvents',
                'handleCompleteAll'
            );

            this.$list = this.$el.find('.m-todo-app__list');
            this.$input = this.$el.find('.m-todo-app__input');
            this.$info = this.$el.find('.m-todo-app__info');

            this.collection = new Tasks();
            this.collection.on('all', this.handleCollectionEvents);
        },

        render: function () {
            this.$info.text(this.collection.getNumUncompleted() + ' items left');
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
            if (title) {
                this.$input.val('');
                this.collection.add({title: title});
            }
        },

        handleCollectionEvents: function (type, data) {
            switch (type) {
                case 'add':
                    this.addItem(data);
                    this.render();
                    break;
                case 'change:completed':
                    this.render();
                    break;
                case 'remove':
                    this.render();
                    break;
                case 'reset':
                    this.resetItems(data);
                    this.render();
                    break;
            }
        },

        handleKeyboardSubmit: function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.createNewItem();
            }
        },

        handleSubmit: function (e) {
            e.preventDefault();
            this.createNewItem();
        },

        handleClear: function (e) {
            e.preventDefault();
            this.collection.removeCompleted();
        },

        handleCompleteAll: function (e) {
            e.preventDefault();
            this.collection.completeAll();
        }
    });
});