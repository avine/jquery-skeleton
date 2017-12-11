/////////////////////////////
// jQuery avnSkeleton plugin

(function ($) {
  var name = 'avnSkeleton', // Plugin name

    settings = {
      cssPrefix: 'avn-skeleton',
      header: {
        selector: '> header',
        lines: 2,
        icon: true,
        loader: true
      },
      main: {
        selector: '> main',
        paragraphs: 3,
        lines: 4
      }
    },

    prototype = {
      init: function () {
        if (this.options.header.selector) {
          this.$header = this.$element.find(this.options.header.selector).addClass(this.getCss());
          this.headerPosition = this.$header.css('position');
        }
        if (this.options.main.selector) {
          this.$main = this.$element.find(this.options.main.selector).addClass(this.getCss());
        }
        this.display();
      },

      //wakeup: function () {
      //
      //},

      display: function () {
        if (this.isDisplayed) {
          return;
        }
        if (this.$header) {
          this.$header.html('').addClass(this.getCss('header'));
          this.$header.append('<span>' + this.getText(this.options.header.lines) + '</span>');
          if (this.options.header.icon) {
            var $icon = $('<i>').addClass(this.getCss('icon'));
            if (this.options.header.lines >= 2) {
              $icon.addClass(this.getCss('icon-lines'));
            }
            this.$header.prepend($icon);
          }
          if (this.options.header.loader) {
            if (this.headerPosition === 'static') {
              this.$header.css('position', 'relative');
            }
            this.$header.append('<i class="' + this.getCss('loader') + '"></i>');
          }
        }
        if (this.$main) {
          this.$main.html('').append(this.getContent(this.options.main.paragraphs, this.options.main.lines));
        }
        this.isDisplayed = true;
      },

      remove: function () {
        if (!this.isDisplayed) {
          return;
        }
        if (this.$header) {
          this.$header.html('').removeClass(this.getCss('header'));
          if (this.headerPosition === 'static') {
            this.$header.css('position', 'static');
          }
        }
        if (this.$main) {
          this.$main.html('');
        }
        this.isDisplayed = false;
      },

      getContent: function (paragraphs, lines) {
        var html = '';
        for (var i = 0; i < paragraphs; i++) {
          html += '<p>' + this.getText(lines) + '</p>';
        }
        return html;
      },

      getText: function (lines) {
        var html = '';
        for (var i = 0; i < lines; i++) {
          html += '<i class="' + this.getCss('text') + '"></i>';
        }
        return html;
      },

      getCss: function (suffix, selector) {
        return (selector ? '.' : '') + this.options.cssPrefix + (suffix ? '-' + suffix : '');
      }
    },

    methods = ['display', 'remove'];

  // Generate the new jQuery method $.fn[name]
  $.avnPlugin(name, settings, prototype, methods);
})(jQuery);
