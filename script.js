// # Views - 4: nav + splashPage, itemList, itemDetails
// # Routes for navigating between three Views
// # List items and details

/**
 * Navigation bar, mostly static
 */
var NavView = Backbone.View.extend({
    el: $('nav'),

    initialize: function() {
        var $el = $(this.el);
        var navData = {
            menuItems: [
                {
                    name: "Splashpage",
                    link: "#splash"
                },
                {
                    name: "Listpage",
                    link: "#list"
                }
            ]
        };
        dust.render("nav", navData, function(err, out) {
            $el.html(out);
        });
    }
});

/**
 * Splash page
 */
var SplashView = Backbone.View.extend({
    el: $('#splashPage'),

    initialize: function() {
        var thisView = this;
        var viewData = {
            viewName: "Splash View!!!",
            views: [
                {
                    viewName: "SplashView"
                },
                {
                    viewName: "Item List"
                },
                {
                    viewName: "Item Details"
                }
            ]
        };
        dust.render("splashPage", viewData, function(err, out) {
            thisView.el.innerHTML = out;
        });
    },
    show: function() {
        $(this.el).show();
    },
    hide: function() {
        $(this.el).hide();
    }
});

/**
 * List view
 */
var ListView = Backbone.View.extend({
    el: $('#itemList'),

    initialize: function() {
        var thisView = this;
        var listData = {
            'items': [
                {
                    'itemName': 'Orange',
                    'itemDescription': 'Orange is a fruit'
                },
                {
                    'itemName': 'Potato',
                    'itemDescription': 'Potato is a vegetable'
                },
                {
                    'itemName': 'Stroganoff',
                    'itemDescription': 'Real Stroganoff contains meat!'
                }
            ]
        };
        dust.render("itemList", listData, function(err, out) {
            console.log(err);
            thisView.el.innerHTML = out;
        });
    },
    show: function() {
        this.$el.show();
    },
    hide: function() {
        this.$el.hide();
    }
});

/**
 * Router for controlling display of pages
 */
var Router = Backbone.Router.extend({
    routes: {
        '': 'splash',
        'splash': 'splash',
        'list': 'list'
    },
    initialize: function() {
        this.views = {};
        this.showView(this.views.nav, NavView);
    },
    'splash': function() {
        console.log('splash triggered');
        this.views.splash = this.showView(this.views.splash, SplashView);
    },
    'list': function() {
        console.log('list triggered');
        this.views.list = this.showView(this.views.list, ListView);
    },
    'showView': function(view, initializer) {
        _.each(this.views, function(view) {
            view.hide();
        });
        if (view) {
            view.show();
            return view;
        } else {
            return new initializer();
        }
    }
});

// Create a router and start the page
var mainRouter = new Router();

// Add support for browser history
Backbone.history.start();
