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
            'keyup .m-todo-app__input': 'handleKeyboard',
            'click .m-todo-app__submit': 'handleSubmit',
            'click .m-todo-app__clear': 'handleClear',
            'click .m-todo-app__completeall': 'handleCompleteAll'
        },
        initialize: function () {
            _.bindAll(this,
                'render',
                'handleKeyboard',
                'handleSubmit',
                'addItem',
                'handleClear',
                'resetItems',
                'handleCollection',
                'handleCompleteAll'
            );

            this.$list = this.$el.find('.m-todo-app__list');
            this.$input = this.$el.find('.m-todo-app__input');
            this.$info = this.$el.find('.m-todo-app__info');

            this.collection = new Tasks();
            this.collection.on('all', this.handleCollection);
        },


        handleCollection: function (type, data) {
            console.log(type);
            switch (type) {
                case 'add':
                    this.updateTasksLeft();
                    this.addItem(data);
                    break;
                case 'change':
                    this.updateTasksLeft();
                    break;
                case 'reset':
                    this.updateTasksLeft();
                    this.resetItems(data);
                    break;
            }

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

        handleClear: function (e) {
            e.preventDefault();
            this.collection.removeCompleted();
        },
        handleCompleteAll: function (e) {
            e.preventDefault();
            this.collection.completeAll();
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
            console.log('new', this.$input);

            var title = this.$input.val();
            if (title) {
                this.collection.create({title: title});
                this.$input.val('');
            }
        },
        updateTasksLeft: function(){
            this.$info.text( this.collection.getNumUncompleted() + ' items left');
        }

    });
});