/**
 * The Block constructor
 */
function Block(opts) {
  this._tplEmail = Handlebars.templates[opts.name + '-block'];
  this._tplForm = Handlebars.templates[opts.name + '-block-form'];

  this.$email = $(doc.createElement('div')).addClass('block');
  this.$form = $('<div class="block"></div>').html(this._tplForm());
  this.$title = this.$form.find('.block-title');

  this._init();
}

Block.prototype = {
  _init: function() {
    this._verticalTabs();
    this._onBgSelect();
    this._onMove();
  },

  _verticalTabs: function() {
    var $vtabs = this.$form.find('.vertical-tabs');
    var $vcontrols = this.$form.find('.vertical-controls');

    $vtabs.find($vcontrols.find('a.active').attr('href')).show();

    $vcontrols.on('click', 'a', function(e) {
      e.preventDefault();
      var $tab = $(this);

      $vtabs.find('.vertical-content').hide();
      $vcontrols.find('a').removeClass('active');

      $vtabs.find($tab.attr('href')).show();
      $tab.addClass('active');
    });
  },

  _onBgSelect: function() {
    var self = this;
    var $styleRadios = this.$form.find('[name="style"]');
    var $pseudoRadios = this.$form.find('.pseudo-radio');

    // Select Background
    $styleRadios.on('click', function(e) {
      var $this = $(this);

      $pseudoRadios.removeClass('active');
      $this.parents('.pseudo-radio').addClass('active');
      self.$title.text($this.parent().text() + ' Block');
    });
  },

  _onMove: function() {
    var self = this;

    this.$form.on('click', '.move', function(e) {
      var $moveBtn, $prevForm, $nextForm;
      var $prevEmail, $nextEmail;
      e.preventDefault();

      // Nothing to move if there is only one block
      if (!self.$form.siblings('.block').length) { return; }

      $moveBtn = $(this);
      $prevForm = self.$form.prev('.block');
      $nextForm = self.$form.next('.block');
      $prevEmail = self.$email.prev('.block');
      $nextEmail = self.$email.next('.block');

      // Move up
      if ($moveBtn.hasClass('move-up') && $prevForm.length) {
        $prevForm.before(self.$form);
        $prevEmail.length && $prevEmail.before(self.$email);
      }

      // Move down
      if ($moveBtn.hasClass('move-down') && $nextForm.length) {
        $nextForm.after(self.$form);
        $nextEmail.length && $nextEmail.after(self.$email);
      }
    });
  },

  render: function(data) {
    if (!data) {
      data = {};

      $.map(this.getFormData(), function(field) {
        if (field.name === 'style') {
          data[field.name] = $.parseJSON(field.value);
        } else {
          data[field.name] = field.value;
        }
      });
    }

    // Render the form data
    this.$email.html(this._tplEmail(data));

    return this;
  },

  getFormData: function() {
    return this.$form.find('form').serializeArray();
  },

  remove: function() {
    this.$form.remove();
    this.$email.remove();
    this._tplEmail = this._tplForm = null;
  }
};
