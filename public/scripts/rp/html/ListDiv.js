// Namespace
var rp = rp || {};
rp.html = rp.html || {};

// Class
rp.html.ListDiv = function(_elementId, _para) {
  this.parent.constructor.call(this, _elementId, _para);

  return;
};

rp.html.ListDiv.prototype = Object.create(rp.html.DynamicDiv.prototype);
rp.html.ListDiv.prototype.parent = rp.html.DynamicDiv.prototype;

rp.html.ListDiv.prototype.initHtml = function() {
  this.parent.initHtml.call(this);

  this.html.list = document.createElement('dl');
  $(this.html.div).append(this.html.list);
  return;
};

rp.html.ListDiv.prototype.addToList = function(_term) {
  var termToAdd = document.createElement('dt');
  termToAdd.innerHTML = _term;

  $(this.html.list).append(termToAdd);
  return;
};

rp.html.ListDiv.prototype.removeFromList = function(_term) {
  var termToRemove;

  $(this.html.list).children('dt').each(function(_index) {
    if(this.innerHTML === _term) {
      $(this).remove();
      return false;
    }

    return true;
  });
  
  return;
};
