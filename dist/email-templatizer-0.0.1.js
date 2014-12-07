/* 
 * Email Templatizer (v0.0.1)
 * A Web based email merger.
 */
;(function($, win, doc, undefined) {

var PATH_TEMPLATES = 'src/templates/';
var $win = $(win);

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

/**
 * The Template constructor
 */
function Template(opts) {
  var self = this;

  this.options = opts;
  this._blocks = [];

  this.$el = $('#' + this.options.name);
  this.$blocksWrapper = this.$el.find('.blocks-container');
  this.$notice = this.$blocksWrapper.find('.notice');

  this.$preview = this.$el.find('.preview');
  this.$download = this.$el.find('.download');
  this.$actionBtns = this.$el.find('.action-buttons');
  this.$insertBtn = this.$el.find('.insert-block');

  this.$previewModal = $('#17hats-default-modal');
  this.$resultFrame = $('<iframe src="' + (PATH_TEMPLATES + this.options.name) + '.html" width="100%" border="0" frameborder="0"></iframe>');
  this.$previewModal.find('.modal-content').append(this.$resultFrame);

  // Initialize when the iframe is ready.
  this.$resultFrame.load(function() {
    self.$iframeDocument = self.$resultFrame.contents();
    self.$iframeBody = self.$iframeDocument.find('body');
    self.$iframeFooter = self.$iframeBody.find('#footer');
    self._init();
  });
}

Template.prototype = {
  _init: function() {
    this._bindEvents();
    $('[data-toggle="tooltip"]').tooltip();

    // Set iframe height
    this.$resultFrame.css('height', $win.height() - 60);
  },

  _bindEvents: function() {
    var self = this;

    // Insert a new block
    this.$insertBtn.on('click', function(e) {
      e.preventDefault();
      self.addBlock();
      self._toggleActionBtns();
    });

    // Remove a block
    this.$el.on('click', '.delete', function(e) {
      e.preventDefault();
      self.removeBlock($(this).parents('.block'));
    });

    // Render data from all forms before previewing or downloading
    this.$preview.add(this.$download).on('click.render', function(e) {
      var $el = $(this), blob;

      e.preventDefault();
      self.renderBlocks();

      // Preview
      if ($el.hasClass('preview')) {
        self.$iframeBody.scrollTop(0);
        self.$previewModal.modal('show');
      }

      // Download
      if ($el.hasClass('download')) {
        blob = new Blob([(new XMLSerializer()).serializeToString(self.$iframeDocument[0])], {type: "text/html;charset=utf-8"});
        saveAs(blob, self.options.name+'.html');
      }
    });
  },

  _toggleActionBtns: function() {
    var $blocks = this.$el.find('.block');
    this.$actionBtns.toggle($blocks.length > 0);

    if ($blocks.length === 1) {
      $blocks.find('.move').addClass('disabled');
    }

    if ($blocks.length > 1) {
      $blocks.find('.move').removeClass('disabled');
    }

    if (!$blocks.length) {
      this.$notice.show();
    } else {
      this.$notice.hide(); 
    }
  },

  addBlock: function() {
    var block = new Block({
      name: this.options.name
    });

    this._blocks.push(block);
    this.$blocksWrapper.append(block.$form.data('instance', block));
  },

  removeBlock: function($block) {
    if (!$block) { return; }

    var self = this;
    var instance = $block.data('instance');

    $block.removeData();

    $.each(this._blocks, function(i, block) {
      if (instance === block) {
        self._blocks.splice(i, 1);
        block.remove();
        self._toggleActionBtns();
      }
    });
  },

  result: function(el) {
    el && this.$iframeFooter.before(el);
  },

  _sortBlocks: function() {
    this._blocks.sort(function(block1, block2) {
      return block1.$form.index() -  block2.$form.index();
    });
  },

  renderBlocks: function() {
    var self = this;

    // Sort blocks based on how their forms are indexed.
    this._sortBlocks();

    $.each(this._blocks, function(i, block) {
      block.render();
      self.result(block.$email);
    });
  }
};

// Off we go!
var defaultEmail = new Template({
  name: '17hats-default'
});

$('body').tooltip({
  selector: '[data-toggle="tooltip"]'
});


}(jQuery, this, this.document));
