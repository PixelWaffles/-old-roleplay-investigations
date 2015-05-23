// Namespace
var rp = rp || {};
rp.html = rp.html || {};

// Class
rp.html.DynamicDiv = function(_elementId, _para) {
  this.html = {};
  this.html.div = $('#'+_elementId)[0];
  this.para = _para;

  return;
};

rp.html.DynamicDiv.prototype.initHtml = function() {
  // Empty function to be overridden.
};
