/* jshint ignore:start */

/* jshint ignore:end */

define('benchmark-poker/adapters/comment', ['exports', 'ember', 'ic-ajax'], function (exports, Ember, ajax) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    findAll: function findAll(name) {
      /* jshint unused: false */
      return ajax['default']("https://api.parse.com/1/classes/Comment?include=createdBy").then(function (response) {
        return response.results.map(function (comment) {
          comment.id = comment.objectId;
          delete comment.objectId;
          return comment;
        });
      });
    },

    save: function save(type, record) {
      if (record.id) {
        return ajax['default']({
          url: "https://api.parse.com/1/classes/Comment/" + record.id + "?include=createdBy",
          type: "PUT",
          data: JSON.stringify(record.toJSON())
        }).then(function (response) {
          record.updatedAt = response.updatedAt;
          return record;
        });
      } else {
        return ajax['default']({
          url: "https://api.parse.com/1/classes/Comment",
          type: "POST",
          data: JSON.stringify(record.toJSON())
        }).then(function (response) {
          record.id = response.objectId;
          record.createdAt = response.createdAt;
          return record;
        });
      }
    },

    destroy: function destroy(name, record) {
      /* jshint unused: false */
      return ajax['default']({
        url: "https://api.parse.com/1/classes/Comment/" + record.id,
        type: "DELETE"
      });
    } });

});
define('benchmark-poker/adapters/user', ['exports', 'ic-ajax', 'ember'], function (exports, ajax, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({

    save: function save(type, record) {
      if (record.id) {
        return ajax['default']({
          url: "https://api.parse.com/1/users" + record.id,
          type: "PUT",
          data: JSON.stringify(record)
        }).then(function (response) {
          record.updatedAt = response.updatedAt;
          return record;
        });
      } else {
        return ajax['default']({
          url: "https://api.parse.com/1/users",
          type: "POST",
          data: JSON.stringify(record)
        }).then(function (response) {
          record.id = response.objectId;
          record.createdAt = response.createdAt;
          record.sessionToken = response.sessionToken;
          return record;
        });
      }
    }
  });

});
define('benchmark-poker/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'benchmark-poker/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('benchmark-poker/authenticators/parse-email', ['exports', 'ic-ajax', 'simple-auth/authenticators/base', 'ember'], function (exports, ajax, Base, Ember) {

  'use strict';

  exports['default'] = Base['default'].extend({
    sessionToken: null,

    restore: function restore(data) {
      this.set("sessionToken", data.sessionToken);
      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        if (!Ember['default'].isEmpty(data.sessionToken)) {
          resolve(data);
        } else {
          reject();
        }
      });
    },

    authenticate: function authenticate(credentials) {
      var token = credentials.sessionToken;
      if (token) {
        this.set("sessionToken", token);
      }
      var endpoint = token ? "users/me" : "login";
      var options = token ? {} : {
        data: {
          username: credentials.identification,
          password: credentials.password
        }
      };

      return ajax['default']("https://api.parse.com/1/" + endpoint, options).then((function (response) {
        this.set("sessionToken", response.sessionToken);
        return { sessionToken: response.sessionToken };
      }).bind(this));
    },

    invalidate: function invalidate() {
      this.set("sessionToken", null);
      return Ember['default'].RSVP.resolve();
    }
  });

});
define('benchmark-poker/authorizers/parse', ['exports', 'ember', 'simple-auth/authorizers/base', 'benchmark-poker/config/environment'], function (exports, Ember, Base, ENV) {

  'use strict';

  exports['default'] = Base['default'].extend({
    authorize: function authorize(jqXHR) {
      jqXHR.setRequestHeader("X-Parse-Application-Id", ENV['default'].parseKeys.applicationId);
      jqXHR.setRequestHeader("X-Parse-REST-API-Key", ENV['default'].parseKeys.restApi);

      var sessionToken = this.get("session.sessionToken");
      if (!Ember['default'].isEmpty(sessionToken)) {
        jqXHR.setRequestHeader("X-Parse-Session-Token", sessionToken);
      }
    }
  });

});
define('benchmark-poker/components/chartist-chart', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var UNDEF,

  // This is the structure that chartist is expecting
  defaultDataStructure = { labels: [], series: [] };

  exports['default'] = Ember['default'].Component.extend({
    chart: UNDEF,

    classNameBindings: ["ratio"],
    classNames: ["ct-chart"],

    // The ratio of the chart as it scales up/down in size.
    //
    // Available ratios:
    //
    // name              ratio
    // ct-square         1
    // ct-minor-second   15:16
    // ct-major-second   8:9
    // ct-minor-third    5:6
    // ct-major-third    4:5
    // ct-perfect-fourth 3:4
    // ct-perfect-fifth  2:3
    // ct-minor-sixth    5:8
    // ct-golden-section 1:1.618
    // ct-major-sixth    3:5
    // ct-minor-seventh  9:16
    // ct-major-seventh  8:15
    // ct-octave         1:2
    // ct-major-tenth    2:5
    // ct-major-eleventh 3:8
    // ct-major-twelfth  1:3
    // ct-double-octave  1:4
    ratio: "ct-square",

    type: "line",
    chartType: (function () {
      return this.get("type").capitalize();
    }).property("type"),

    data: defaultDataStructure,
    options: UNDEF,
    responsiveOptions: UNDEF,
    updateOnData: true,

    // This is where the business happens. This will only run if checkForReqs
    // doesn't find any problems.
    renderChart: (function () {
      var chart = new (Chartist[this.get("chartType")])(this.get("element"), this.get("data"), this.get("options"), this.get("responsiveOptions"));

      this.set("chart", chart);
    }).on("didInsertElement"),

    onData: (function () {
      if (this.get("updateOnData")) {
        this.get("chart").update(this.get("data"));
      }
    }).observes("data"),

    // Before trying to do anything else, let's check to see if any necessary
    // attributes are missing or if anything else is fishy about attributes
    // provided to the component in the template.
    //
    // We're doing this to help ease people into this project. Instead of just
    // getting some "uncaught exception" we're hoping these error messages will
    // point them in the right direction.
    checkForReqs: (function () {
      var data = this.get("data"),
          type = this.get("type");

      if (typeof data === "string") {
        console.info("Chartist-chart: The value of the \"data\" attribute on should be an object, it's a string.");
        this.set("data", defaultDataStructure);
      }

      if (!type || !Chartist[this.get("chartType")]) {
        console.info("Chartist-chart: Invalid or missing \"type\" attribute, defaulting to \"line\".");
        this.set("type", "line");
      }
    }).on("init")
  });

});
define('benchmark-poker/controllers/chips-in-play', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    // TODO: make this look like the format below
    stackSizes: (function () {
      return this.get("model.chips").mapBy("seatsInfo").map(function (handSeats) {
        //pluck(mapBy)
        return handSeats.mapBy("stackSize").reduce(function (sum, stackSize) {
          // Number(stackSize) transforms stackSize from a string to a number
          return sum + Number(stackSize);
        }, 0);
      });
    }).property("model.chips.@each"),

    handCount: Ember['default'].computed.alias("model.chips.length") });

  // chipsInPlay: {
  //   // A labels array that can contain any sort of values
  //   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  //   // Our series array that contains series objects or in this case series data arrays
  //   series: [
  //     [this.stackSizes]
  //   ]
  // },
  //
  // chartOptions: {
  //   width: '300px',
  //   height: '200px'
  // }

});
define('benchmark-poker/controllers/comment', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    isEditing: false,

    actions: {
      edit: function edit() {
        this.set("isEditing", true);
      },

      save: function save() {
        this.set("isEditing", false);
        this.get("model").save();
      }
    }
  });

});
define('benchmark-poker/controllers/dashboard', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    stackSizes: (function () {
      var data = this.get("model.chips").mapBy("seatsInfo").map(function (handSeats) {

        //pluck(mapBy)
        return handSeats.mapBy("stackSize").reduce(function (sum, stackSize) {
          // Number(stackSize) transforms stackSize from a string to a number
          return sum + Number(stackSize);
        }, 0);
      });

      return {
        labels: this.get("handRange"),
        series: [data]
      };
    }).property("model.chips.@each"),

    handRange: (function () {
      var n = this.get("handCount");
      // range starts at 0, so add 1 to n and remove the first element
      var range = Array.apply(null, { length: n + 1 }).map(Number.call, Number);
      range.shift();
      return range;
    }).property("handCount"),

    handCount: Ember['default'].computed.alias("model.chips.length"),

    raisers: (function () {
      // 1. get an array of arrays of preflopActions
      // 2. extract array of arrays of player names who have raised
      // 3. flatten (2) into a single array of names
      // 4. group names by count e.g. {person1: 5, person2: 6}
      var data = this.get("model.raises").mapBy("preflopActions").map(function (flopActions) {

        flopActions = flopActions || [];
        return flopActions.filterBy("action", "raises").mapBy("player");
      }).reduce(function (acc, raisers) {
        return acc.concat(raisers);
      }, []).reduce(function (acc, raiser) {
        acc[raiser] = acc[raiser] || 0;
        acc[raiser] += 1;
        return acc;
      }, {});

      return {
        labels: Object.keys(data),
        series: [Ember['default'].$.map(data, function (count) {
          return count;
        })]
      };
    }).property("model.raises.@each"),

    actions: {
      /*
      saveFirstName: function(){
        var newFirstName = this.store.createRecord('firstName', {
          body: this.get('newFirstName')
        });
        this.set('newFirstName', '');
        return newFirstName.save();
      }, */

      saveComment: function saveComment() {
        var newComment = this.store.createRecord("comment", {
          body: this.get("newComment"),
          createdBy: this.get("session.currentUser")
        });
        this.set("newComment", "");
        return newComment.save();
      },

      destroyComment: function destroyComment(comment) {
        comment.destroy();
      } },

    chartOptions: {
      width: "980px",
      height: "500px",

      showArea: true,
      lineSmooth: false,

      axisX: {
        showGrid: false
      }
    }

  });

});
define('benchmark-poker/controllers/discuss', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({});

});
define('benchmark-poker/controllers/login', ['exports', 'ember', 'simple-auth/mixins/login-controller-mixin'], function (exports, Ember, LoginControllerMixin) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend(LoginControllerMixin['default'], {
    authenticator: "authenticator:parse-email"
  });

});
define('benchmark-poker/controllers/pre-flop-raise', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({

    playerAggression: (function () {
      // 1. get an array of arrays of preflopActions
      // 2. extract array of arrays of player names who have raised
      // 3. flatten (2) into a single array of names
      // 4. group names by count e.g. {person1: 5, person2: 6}
      return this.get("model").mapBy("preflopActions").map(function (flopActions) {

        flopActions = flopActions || [];
        return flopActions.filterBy("action", "raises").mapBy("player");
      }).reduce(function (acc, raisers) {
        return acc.concat(raisers);
      }, []).reduce(function (acc, raiser) {
        acc[raiser] = acc[raiser] || 0;
        acc[raiser] += 1;
        return acc;
      }, {});
    }).property("model.@each") });
  // .map(function(playersSeats){
  //   return playersSeats.mapBy('player').map(function()};

  //get player and his actions
  //filter the actions have raise and allin
  //the sum the actions in new array

});
define('benchmark-poker/controllers/register', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({

    actions: {
      save: function save() {
        var self = this;
        var user = this.get("model");
        user.username = user.email;
        user.save().then(function () {
          self.get("session").authenticate("authenticator:parse-email", user);
        });
      }
    }
  });

});
define('benchmark-poker/initializers/app-version', ['exports', 'benchmark-poker/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;

  exports['default'] = {
    name: "App Version",
    initialize: function initialize(container, application) {
      var appName = classify(application.toString());
      Ember['default'].libraries.register(appName, config['default'].APP.version);
    }
  };

});
define('benchmark-poker/initializers/current-user', ['exports', 'ember', 'simple-auth/session', 'ic-ajax'], function (exports, Ember, Session, ajax) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container) {
    Session['default'].reopen({
      setCurrentUser: (function () {
        var token = this.get("sessionToken");

        if (this.get("isAuthenticated") && !Ember['default'].isEmpty(token)) {
          var store = container.lookup("store:main");
          ajax['default']("https://api.parse.com/1/users/me").then((function (response) {
            response.id = response.objectId;
            delete response.objectId;
            delete response.sessionToken;
            var user = store.push("user", response);
            this.set("currentUser", user);
          }).bind(this));
        }
      }).observes("sessionToken")
    });
  }

  exports['default'] = {
    name: "current-user",
    initialize: initialize
  };

});
define('benchmark-poker/initializers/ember-magic-man', ['exports', 'ember-magic-man/store'], function (exports, Store) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    application.register("store:main", Store['default']);

    application.inject("route", "store", "store:main");
    application.inject("controller", "store", "store:main");
    application.inject("model", "store", "store:main");
  }

  exports['default'] = {
    name: "ember-magic-man",
    initialize: initialize
  };

});
define('benchmark-poker/initializers/export-application-global', ['exports', 'ember', 'benchmark-poker/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('benchmark-poker/initializers/simple-auth', ['exports', 'simple-auth/configuration', 'simple-auth/setup', 'benchmark-poker/config/environment'], function (exports, Configuration, setup, ENV) {

  'use strict';

  exports['default'] = {
    name: "simple-auth",
    initialize: function initialize(container, application) {
      Configuration['default'].load(container, ENV['default']["simple-auth"] || {});
      setup['default'](container, application);
    }
  };

});
define('benchmark-poker/models/comment', ['exports', 'ember-magic-man/model'], function (exports, Model) {

  'use strict';

  exports['default'] = Model['default'].extend({
    toJSON: function toJSON() {
      var data = this._super();

      var userId = this.get("createdBy.id");
      if (userId) {
        data.set("createdBy", {
          __type: "Pointer",
          className: "_User",
          objectId: userId
        });
      }

      return data;
    }
  });

});
define('benchmark-poker/models/user', ['exports', 'ember-magic-man/model'], function (exports, Model) {

	'use strict';

	exports['default'] = Model['default'].extend({});

});
define('benchmark-poker/router', ['exports', 'ember', 'benchmark-poker/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route("dashboard");
    this.route("opponents");
    this.route("location");
    this.route("bankroll");
    this.route("equity");
    this.route("chipsInPlay");
    this.route("preFlopRaise");
    this.route("login");
    this.route("register");
    this.route("discuss");
  });

  exports['default'] = Router;

});
define('benchmark-poker/routes/application', ['exports', 'ember', 'simple-auth/mixins/application-route-mixin'], function (exports, Ember, ApplicationRouteMixin) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(ApplicationRouteMixin['default'], {});

});
define('benchmark-poker/routes/chips-in-play', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('benchmark-poker/routes/dashboard', ['exports', 'ember', 'ic-ajax'], function (exports, Ember, ajax) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return Ember['default'].RSVP.hash({
        chips: this.findChipsInPlay(),
        raises: this.findRaises(),
        comments: this.store.findAll("comment")

      });
    },

    findChipsInPlay: function findChipsInPlay() {
      return ajax['default']("https://random-hands.herokuapp.com/hands/1").then(function (data) {
        // data is an array of snapshots of the hand history after each hand is played

        // gameData is the last game snapshot at the end of the game
        //   and contains all the hands with all actions
        var gameData = data.slice(-1).pop();

        // some of the hands are messed up. We'll filter those out by return only the hands that have seatsInfo
        var cleanData = gameData.filterBy("seatsInfo");
        return cleanData;
      });
    },

    findRaises: function findRaises() {
      return ajax['default']("https://random-hands.herokuapp.com/hands/1").then(function (data) {
        // data is an array of snapshots of the hand history after each hand is played

        // gameData is the last game snapshot at the end of the game
        //   and contains all the hands with all actions
        var gameData = data.slice(-1).pop();

        // some of the hands are messed up. We'll filter those out by return only the hands that have seatsInfo
        var cleanData = gameData.filterBy("seatsInfo");
        return cleanData;
      });
    }
  });

});
define('benchmark-poker/routes/discuss', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll("comment");
    }
  });

});
define('benchmark-poker/routes/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('benchmark-poker/routes/login', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('benchmark-poker/routes/pre-flop-raise', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return Ember['default'].$.ajax("https://random-hands.herokuapp.com/hands/1").then(function (data) {
        // data is an array of snapshots of the hand history after each hand is played

        // gameData is the last game snapshot at the end of the game
        //   and contains all the hands with all actions
        var gameData = data.slice(-1).pop();

        // some of the hands are messed up. We'll filter those out by return only the hands that have seatsInfo
        var cleanData = gameData.filterBy("seatsInfo");
        return cleanData;
      });
    }
  });

});
define('benchmark-poker/routes/register', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.createRecord("user");
    } });

});
define('benchmark-poker/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[0]); }
        var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('benchmark-poker/templates/chips-in-play', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),-1,-1);
          content(env, morph0, context, "size");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("# of hands: ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),0,-1);
        var morph1 = dom.createMorphAt(dom.childAt(fragment, [2]),0,-1);
        content(env, morph0, context, "handCount");
        block(env, morph1, context, "each", [get(env, context, "stackSizes")], {"keyword": "size"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('benchmark-poker/templates/components/chartist-chart', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[0]); }
        var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
        content(env, morph0, context, "yield");
        return fragment;
      }
    };
  }()));

});
define('benchmark-poker/templates/dashboard', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          var el2 = dom.createTextNode("Logout ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element4 = dom.childAt(fragment, [1]);
          element(env, element4, context, "action", ["invalidateSession"], {});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          var el2 = dom.createTextNode("Login ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element3 = dom.childAt(fragment, [1]);
          element(env, element3, context, "action", ["authenticateSession"], {});
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1,"class","comment-delete");
            dom.setAttribute(el1,"type","submit");
            var el2 = dom.createTextNode("Save");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline, element = hooks.element;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var element2 = dom.childAt(fragment, [3]);
            var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),-1,-1);
            inline(env, morph0, context, "input", [], {"value": get(env, context, "comment.model.body")});
            element(env, element2, context, "action", ["save", get(env, context, "comment")], {});
            return fragment;
          }
        };
      }());
      var child1 = (function() {
        return {
          isHTMLBars: true,
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1,"class","comment-edit");
            dom.setAttribute(el1,"type","submit");
            var el2 = dom.createTextNode("Edit");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1,"class","comment-delete");
            dom.setAttribute(el1,"type","submit");
            var el2 = dom.createTextNode("Delete");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, content = hooks.content, get = hooks.get, element = hooks.element;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var element0 = dom.childAt(fragment, [5]);
            var element1 = dom.childAt(fragment, [7]);
            var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),-1,-1);
            var morph1 = dom.createMorphAt(dom.childAt(fragment, [3]),-1,-1);
            content(env, morph0, context, "comment.model.createdBy.firstName");
            content(env, morph1, context, "comment.model.body");
            element(env, element0, context, "action", ["edit", get(env, context, "comment")], {});
            element(env, element1, context, "action", ["destroyComment", get(env, context, "comment")], {});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("     ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","comments");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,1);
          block(env, morph0, context, "if", [get(env, context, "comment.isEditing")], {}, child0, child1);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","header");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","header-logo");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","ribbon");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","login");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Chips in Play Over ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Hands");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","chipsInPlay");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Aggressive Players Over ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Hands");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","preFlopRaise");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","comment-module");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","commentBox");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3,"class","form-container");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","comment-box");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","comment-button");
        dom.setAttribute(el4,"type","submit");
        var el5 = dom.createTextNode("Submit");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","comment-ul");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("footer");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2,"src","assets/images/cards.png");
        dom.setAttribute(el2,"alt","");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","footer-container");
        var el3 = dom.createTextNode("\n    Benchmark Poker Inc.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, content = hooks.content, inline = hooks.inline, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element5 = dom.childAt(fragment, [11]);
        var element6 = dom.childAt(element5, [1, 1]);
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0, 3, 1]),0,1);
        var morph1 = dom.createMorphAt(fragment,1,2,contextualElement);
        var morph2 = dom.createMorphAt(dom.childAt(fragment, [3]),0,1);
        var morph3 = dom.createMorphAt(dom.childAt(fragment, [5]),0,1);
        var morph4 = dom.createMorphAt(dom.childAt(fragment, [7]),0,1);
        var morph5 = dom.createMorphAt(dom.childAt(fragment, [9]),0,1);
        var morph6 = dom.createMorphAt(dom.childAt(element6, [1]),0,1);
        var morph7 = dom.createMorphAt(dom.childAt(element5, [3]),0,1);
        block(env, morph0, context, "if", [get(env, context, "session.isAuthenticated")], {}, child0, child1);
        content(env, morph1, context, "x-login");
        content(env, morph2, context, "handCount");
        inline(env, morph3, context, "chartist-chart", [], {"options": get(env, context, "chartOptions"), "ratio": "ct-octave", "type": "line", "data": get(env, context, "stackSizes")});
        content(env, morph4, context, "handCount");
        inline(env, morph5, context, "chartist-chart", [], {"options": get(env, context, "chartOptions"), "ratio": "ct-octave", "type": "bar", "data": get(env, context, "raisers")});
        element(env, element6, context, "action", ["saveComment"], {"on": "submit"});
        inline(env, morph6, context, "textarea", [], {"id": "new-comment", "value": get(env, context, "newComment"), "autoresize": true, "maxHeight": 200, "required": true, "placeholder": "Insert a comment here..."});
        block(env, morph7, context, "each", [get(env, context, "model.comments")], {"itemController": "comment", "keyword": "comment"}, child2, null);
        return fragment;
      }
    };
  }()));

});
define('benchmark-poker/templates/discuss', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1,"class","comment-delete");
            dom.setAttribute(el1,"type","submit");
            var el2 = dom.createTextNode("Save");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline, element = hooks.element;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var element2 = dom.childAt(fragment, [3]);
            var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),-1,-1);
            inline(env, morph0, context, "input", [], {"value": get(env, context, "comment.model.body")});
            element(env, element2, context, "action", ["save", get(env, context, "comment")], {});
            return fragment;
          }
        };
      }());
      var child1 = (function() {
        return {
          isHTMLBars: true,
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1,"class","comment-edit");
            dom.setAttribute(el1,"type","submit");
            var el2 = dom.createTextNode("Edit");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1,"class","comment-delete");
            dom.setAttribute(el1,"type","submit");
            var el2 = dom.createTextNode("Delete");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, content = hooks.content, get = hooks.get, element = hooks.element;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var element0 = dom.childAt(fragment, [3]);
            var element1 = dom.childAt(fragment, [5]);
            var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),-1,-1);
            content(env, morph0, context, "comment.model.body");
            element(env, element0, context, "action", ["edit", get(env, context, "comment")], {});
            element(env, element1, context, "action", ["destroyComment", get(env, context, "comment")], {});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          if (this.cachedFragment) { dom.repairClonedNode(fragment,[0,1]); }
          var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
          block(env, morph0, context, "if", [get(env, context, "comment.isEditing")], {}, child0, child1);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        dom.setAttribute(el1,"class","form-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2,"class","comment-button");
        dom.setAttribute(el2,"type","submit");
        var el3 = dom.createTextNode("Submit");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, element = hooks.element, get = hooks.get, inline = hooks.inline, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element3 = dom.childAt(fragment, [0]);
        var morph0 = dom.createMorphAt(element3,0,1);
        var morph1 = dom.createMorphAt(dom.childAt(fragment, [2]),0,-1);
        element(env, element3, context, "action", ["saveComment"], {"on": "submit"});
        inline(env, morph0, context, "textarea", [], {"value": get(env, context, "newComment")});
        block(env, morph1, context, "each", [get(env, context, "model")], {"itemController": "comment", "keyword": "comment"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('benchmark-poker/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          var el2 = dom.createTextNode("Logout ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element1 = dom.childAt(fragment, [1]);
          element(env, element1, context, "action", ["invalidateSession"], {});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          var el2 = dom.createTextNode("Login ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          element(env, element0, context, "action", ["authenticateSession"], {});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","header");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","header-logo");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","ribbon");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","login");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","index-div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","index-pic");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  Benchmark Poker is a stats app that helps you communicate with your friends about your favorite poker games!\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("footer");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2,"src","assets/images/cards.png");
        dom.setAttribute(el2,"alt","");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","footer-container");
        var el3 = dom.createTextNode("\n    Benchmark Poker Inc.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0, 3, 1]),0,1);
        block(env, morph0, context, "if", [get(env, context, "session.isAuthenticated")], {}, child0, child1);
        return fragment;
      }
    };
  }()));

});
define('benchmark-poker/templates/login', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"type","submit");
          var el2 = dom.createTextNode("Register");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","login-container");
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","login-logo");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","login-img");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","login-form");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"type","submit");
        var el6 = dom.createTextNode("Login");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, element = hooks.element, get = hooks.get, inline = hooks.inline, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[0]); }
        var element0 = dom.childAt(fragment, [2, 3, 1, 1]);
        var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
        var morph1 = dom.createMorphAt(element0,0,1);
        var morph2 = dom.createMorphAt(element0,1,2);
        var morph3 = dom.createMorphAt(element0,4,5);
        content(env, morph0, context, "outlet");
        element(env, element0, context, "action", ["authenticate"], {"on": "submit"});
        inline(env, morph1, context, "input", [], {"value": get(env, context, "identification"), "placeholder": "Enter Email", "type": "email"});
        inline(env, morph2, context, "input", [], {"value": get(env, context, "password"), "placeholder": "Enter Password", "type": "password"});
        block(env, morph3, context, "link-to", ["register"], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('benchmark-poker/templates/pre-flop-raise', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,1);
          content(env, morph0, context, "size");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("# of hands: ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),0,-1);
        var morph1 = dom.createMorphAt(dom.childAt(fragment, [2]),0,-1);
        var morph2 = dom.createMorphAt(fragment,3,4,contextualElement);
        content(env, morph0, context, "handCount");
        block(env, morph1, context, "each", [get(env, context, "playerAggression")], {"keyword": "size"}, child0, null);
        content(env, morph2, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('benchmark-poker/templates/register', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("fieldset");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","reg-form");
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","user-type");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","Customer");
        var el7 = dom.createTextNode("Customer");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","Contractor");
        var el7 = dom.createTextNode("Contractor");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","reg-button");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","reg-button");
        var el5 = dom.createTextNode("Submit");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, element = hooks.element, get = hooks.get, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[0]); }
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [3, 1]);
        var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
        var morph1 = dom.createMorphAt(element2,2,3);
        var morph2 = dom.createMorphAt(element2,3,4);
        var morph3 = dom.createMorphAt(element2,4,5);
        var morph4 = dom.createMorphAt(element2,5,6);
        content(env, morph0, context, "outlet");
        element(env, element0, context, "action", ["save"], {"on": "submit"});
        inline(env, morph1, context, "input", [], {"type": "text", "name": "email", "placeholder": "Email Address", "value": get(env, context, "model.email"), "required": true});
        inline(env, morph2, context, "input", [], {"type": "password", "name": "password", "placeholder": "Choose Password", "value": get(env, context, "model.password"), "required": true});
        inline(env, morph3, context, "input", [], {"type": "text", "name": "firstName", "placeholder": "First Name", "value": get(env, context, "model.firstName"), "required": true});
        inline(env, morph4, context, "input", [], {"type": "text", "name": "lastName", "placeholder": "Last Name", "value": get(env, context, "model.lastName"), "required": true});
        element(env, element3, context, "action", ["save"], {});
        return fragment;
      }
    };
  }()));

});
define('benchmark-poker/tests/adapters/comment.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/comment.js should pass jshint', function() { 
    ok(true, 'adapters/comment.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/adapters/user.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/user.js should pass jshint', function() { 
    ok(true, 'adapters/user.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/authenticators/parse-email.jshint', function () {

  'use strict';

  module('JSHint - authenticators');
  test('authenticators/parse-email.js should pass jshint', function() { 
    ok(true, 'authenticators/parse-email.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/authorizers/parse.jshint', function () {

  'use strict';

  module('JSHint - authorizers');
  test('authorizers/parse.js should pass jshint', function() { 
    ok(true, 'authorizers/parse.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/controllers/chips-in-play.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/chips-in-play.js should pass jshint', function() { 
    ok(true, 'controllers/chips-in-play.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/controllers/comment.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/comment.js should pass jshint', function() { 
    ok(true, 'controllers/comment.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/controllers/dashboard.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/dashboard.js should pass jshint', function() { 
    ok(true, 'controllers/dashboard.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/controllers/discuss.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/discuss.js should pass jshint', function() { 
    ok(true, 'controllers/discuss.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/controllers/login.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/login.js should pass jshint', function() { 
    ok(true, 'controllers/login.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/controllers/pre-flop-raise.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/pre-flop-raise.js should pass jshint', function() { 
    ok(true, 'controllers/pre-flop-raise.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/controllers/register.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/register.js should pass jshint', function() { 
    ok(true, 'controllers/register.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/helpers/resolver', ['exports', 'ember/resolver', 'benchmark-poker/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('benchmark-poker/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/helpers/start-app', ['exports', 'ember', 'benchmark-poker/app', 'benchmark-poker/router', 'benchmark-poker/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('benchmark-poker/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/initializers/current-user.jshint', function () {

  'use strict';

  module('JSHint - initializers');
  test('initializers/current-user.js should pass jshint', function() { 
    ok(true, 'initializers/current-user.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/models/comment.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/comment.js should pass jshint', function() { 
    ok(true, 'models/comment.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/models/user.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/user.js should pass jshint', function() { 
    ok(true, 'models/user.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/routes/chips-in-play.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/chips-in-play.js should pass jshint', function() { 
    ok(true, 'routes/chips-in-play.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/routes/dashboard.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/dashboard.js should pass jshint', function() { 
    ok(true, 'routes/dashboard.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/routes/discuss.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/discuss.js should pass jshint', function() { 
    ok(true, 'routes/discuss.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/routes/index.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/index.js should pass jshint', function() { 
    ok(true, 'routes/index.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/routes/login.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/login.js should pass jshint', function() { 
    ok(true, 'routes/login.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/routes/pre-flop-raise.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/pre-flop-raise.js should pass jshint', function() { 
    ok(true, 'routes/pre-flop-raise.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/routes/register.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/register.js should pass jshint', function() { 
    ok(true, 'routes/register.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/test-helper', ['benchmark-poker/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('benchmark-poker/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/adapters/chips-in-play-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("adapter:chips-in-play", "ChipsInPlayAdapter", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('benchmark-poker/tests/unit/adapters/chips-in-play-test.jshint', function () {

  'use strict';

  module('JSHint - unit/adapters');
  test('unit/adapters/chips-in-play-test.js should pass jshint', function() { 
    ok(true, 'unit/adapters/chips-in-play-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/adapters/register-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("adapter:register", "RegisterAdapter", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('benchmark-poker/tests/unit/adapters/register-test.jshint', function () {

  'use strict';

  module('JSHint - unit/adapters');
  test('unit/adapters/register-test.js should pass jshint', function() { 
    ok(true, 'unit/adapters/register-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/controllers/bankroll-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:bankroll", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/controllers/bankroll-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/bankroll-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/bankroll-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/controllers/chipsinplay-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:chipsinplay", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/controllers/chipsinplay-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/chipsinplay-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/chipsinplay-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/controllers/comment-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:comment", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/controllers/comment-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/comment-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/comment-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/controllers/dashboard-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:dashboard", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/controllers/dashboard-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/dashboard-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/dashboard-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/controllers/discuss-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:discuss", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/controllers/discuss-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/discuss-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/discuss-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/controllers/equity-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:equity", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/controllers/equity-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/equity-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/equity-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/controllers/hands-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:hands", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/controllers/hands-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/hands-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/hands-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/controllers/location-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:location", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/controllers/location-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/location-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/location-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/controllers/login-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:login", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/controllers/login-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/login-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/login-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/controllers/opponents-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:opponents", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/controllers/opponents-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/opponents-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/opponents-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/controllers/pre-flop-raise-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:pre-flop-raise", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/controllers/pre-flop-raise-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/pre-flop-raise-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/pre-flop-raise-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/controllers/register-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:register", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/controllers/register-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/register-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/register-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/initializers/current-user-test', ['ember', 'benchmark-poker/initializers/current-user', 'qunit'], function (Ember, current_user, qunit) {

  'use strict';

  var container, application;

  qunit.module("CurrentUserInitializer", {
    beforeEach: function beforeEach() {
      Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        container = application.__container__;
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  qunit.test("it works", function (assert) {
    current_user.initialize(container, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });

});
define('benchmark-poker/tests/unit/initializers/current-user-test.jshint', function () {

  'use strict';

  module('JSHint - unit/initializers');
  test('unit/initializers/current-user-test.js should pass jshint', function() { 
    ok(true, 'unit/initializers/current-user-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/models/register-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("register", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('benchmark-poker/tests/unit/models/register-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/register-test.js should pass jshint', function() { 
    ok(true, 'unit/models/register-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/routes/adapter-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:adapter", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/routes/adapter-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/adapter-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/adapter-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/routes/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:application", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/routes/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/application-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/application-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/routes/bankroll-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:bankroll", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/routes/bankroll-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/bankroll-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/bankroll-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/routes/dashboard-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:dashboard", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/routes/dashboard-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/dashboard-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/dashboard-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/routes/discuss-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:discuss", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/routes/discuss-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/discuss-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/discuss-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/routes/equity-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:equity", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/routes/equity-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/equity-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/equity-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/routes/hands-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:hands", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/routes/hands-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/hands-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/hands-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:index", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/index-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/index-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/routes/location-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:location", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/routes/location-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/location-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/location-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/routes/login-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:login", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/routes/login-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/login-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/login-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/routes/opponents-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:opponents", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/routes/opponents-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/opponents-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/opponents-test.js should pass jshint.'); 
  });

});
define('benchmark-poker/tests/unit/routes/pre-flop-raise-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:pre-flop-raise", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('benchmark-poker/tests/unit/routes/pre-flop-raise-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/pre-flop-raise-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/pre-flop-raise-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('benchmark-poker/config/environment', ['ember'], function(Ember) {
  var prefix = 'benchmark-poker';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("benchmark-poker/tests/test-helper");
} else {
  require("benchmark-poker/app")["default"].create({"name":"benchmark-poker","version":"0.0.0.00d47b89"});
}

/* jshint ignore:end */
//# sourceMappingURL=benchmark-poker.map