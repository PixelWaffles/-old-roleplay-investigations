// Namespace
var rp = rp || {};
rp.html = rp.html || {};

// Class
rp.html.ListDiv = function(_elementId, _para) {
  this.parent.call(_elementId, _para);

  return;
};

rp.html.ListDiv.prototype = Object.create(rp.html.DynamicDiv.prototype);
rp.html.ListDiv.prototype.parent = rp.html.DynamicDiv.prototype;

rp.html.ListDiv.prototype.initHtml = function() {
  //TODO Write html initialization.
};
