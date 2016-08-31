var registerComponent = require('../../core/component').registerComponent;
var utils = require('../../utils/');

var bind = utils.bind;

module.exports.Component = registerComponent('screenshot', {
  dependencies: ['canvas'],

  schema: {
    enabled: {default: false}
  },

  init: function () {
    var sceneEl = this.el;
    var screenshotEl;

    if (utils.getUrlParameter('ui') === 'false') { return; }

    // Inject into the DOM the camera icon
    screenshotEl = this.screenshotEl = document.createElement('button');
    screenshotEl.classList.add('screenshot');
    screenshotEl.innerHTML = 'Take Photo';
    sceneEl.appendChild(screenshotEl);

    this.clickBound = bind(this.onClick, this);
    screenshotEl.addEventListener('click', this.clickBound);
  },

  onClick: function () {
    var sceneEl = this.el;
    var screenshotContainerEl = this.screenshotContainerEl;
    var imageEl = null;

    // Ready the container
    if (!screenshotContainerEl) {
      screenshotContainerEl = this.screenshotContainerEl = document.createElement('div');
      screenshotContainerEl.classList.add('screenshot-container');
      sceneEl.appendChild(screenshotContainerEl);
    } else {
      this.screenshotContainerEl.innerHTML = '';
    }

    // Add the image
    imageEl = convertCanvasToImage(sceneEl.canvas);
    imageEl.setAttribute('title', 'Right-click to save');
    this.screenshotContainerEl.appendChild(imageEl);
  },

  remove: function () {
    var screenshotContainerEl = this.screenshotContainerEl;
    var screenshotEl = this.screenshotEl;

    this.screenshotEl.removeEventListener('click', this.clickBound);
    screenshotContainerEl.parentNode.removeChild(screenshotContainerEl);
    screenshotEl.parentNode.removeChild(screenshotEl);
  }
});

// Set the new image there
function convertCanvasToImage (canvas) {
  var image = document.createElement('img');
  image.src = canvas.toDataURL('image/jpeg', 1.0);
  return image;
}
