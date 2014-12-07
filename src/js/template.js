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
