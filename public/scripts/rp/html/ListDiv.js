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
  this.parent.initHtml.call();

  this.html.list = document.createElement('dl');
  return;
};

rp.html.ListDiv.prototype.addToList = function(_term) {
  var termToAdd = document.createElement('dt');
  termToAdd.innerHTML = _term;

  $(this.html.list).append(termToAdd);
  return;
};
