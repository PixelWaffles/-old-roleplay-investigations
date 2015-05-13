// Namespace
var rp = rp || {};
rp.html = rp.html || {};

// Class
rp.html.DynamicDiv = function(_elementId, _para) {
  this.$div = $('#'+_elementId);
  this.para = _para;

  return;
};

rp.html.DynamicDiv.prototype.drawHtml = function() {
  // Empty function to be overridden.
};
