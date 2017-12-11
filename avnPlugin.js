///////////////////////////
// jQuery plugin generator

(function ($) {

  var hasChanged = function (source, target) {
    for (var prop in source) if (target[prop] != source[prop]) return true;
    return false;
  },

  isEmpty = function (array) {
    for (var i = 0; i < array.length; i++) if (undefined !== array[i]) return false;
    return true;
  },

  plugin = function (name, settings, prototype, methods) {

    settings = settings || {};

    var Plugin = function (element) {
      this.$element = $(element);
      this.pluginName = name; // helper for debugging
      this.pluginMethods = methods; // helper for debugging
    };

    var dataName = 'jquery-avn-plugin-instance-' + name;

    $.extend(Plugin.prototype = {
      _wakeup: function (options) {
        var isOptions = $.isPlainObject(options);
        this.optionsHasChanged = !!(isOptions && this.options && hasChanged(options, this.options));
        if (!this.options || isOptions) this.options = $.extend(true, {}, settings, this.options || {}, isOptions ? options : {});
        if (this.isInit && 'init' in this) this.init.apply(this, arguments);
        if ('wakeup' in this) this.wakeup.apply(this, arguments);
      },
      destroy: function () {
        this.$element.data(dataName, null);
      },
      debug: function () {
        return this; // helper for debugging
      }
    }, prototype || {});

    methods = ['debug'].concat(methods || []); // Public API (list of public methods)

    var fn = function (action) {
      var result = [], args = arguments;
      $.each(this, function () {
        var $this = $(this), p = $this.data(dataName), isInit = !p, r; // p=plugin, r=result
        if (isInit) $this.data(dataName, p = new Plugin(this)); // Store the new instance
        p.isInit = isInit;
        if (!~methods.indexOf(action)) {
          p._wakeup.apply(p, args || []);
        } else {
          p._wakeup();
          r = p[action].apply(p, Array.prototype.slice.call(args, 1));
        }
        result.push(r);
      });
      if (isEmpty(result)) return this;
      return (1 == result.length) ? result[0] : result;
    };

    // Expose configuration
    fn.settings = settings;
    fn.methods = methods;

    // Extend jQuery
    $.fn[name] = fn;
  };

  $.avnPlugin = plugin;

})(jQuery);

/*
///////////////////////
// jQuery avnXXX plugin
(function ($) {
  var name = 'avnXXX', // Plugin name
  settings = {
  },
  prototype = {
    init: function () {
    },
    wakeup: function () {
    }
  },
  methods = [];
  // Generate the new jQuery method $.fn[name]
  $.avnPlugin(name, settings, prototype, methods);
})(jQuery);
*/
