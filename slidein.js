function Slidein(selector, options = {}) {
  this.container = document.querySelector(selector);
  if (!this.container) {
    console.error(`Slidein: Container ${selector} not found`);
    return;
  }

  this.opt = Object.assign({}, options);
  this.slides = this.container.children;

  this._init();
}

Slidein.prototype._init = function () {
  this.container.classList.add("slidein-wrapper");
  this._createTrack();
  this._createNavigation();
};

Slidein.prototype._createTrack = function () {
  this.track = document.createElement("div");
  this.track.classList.add("slidein-track");

  Array.from(this.slides).forEach((slide) => {
    slide.classList.add("slidein-slide");
    this.track.appendChild(slide);
  });

  this.container.appendChild(this.track);
};

Slidein.prototype._createNavigation = function () {
  this.prevBtn = document.createElement("button");
  this.nextBtn = document.createElement("button");

  this.prevBtn.textContent = "<";
  this.nextBtn.textContent = ">";

  this.prevBtn.className = "slidein-prev";
  this.nextBtn.className = "slidein-next";

  this.container.append(this.prevBtn, this.nextBtn);

  this.prevBtn.onclick = () => this.moveSlide(-1);
  this.nextBtn.onclick = () => this.moveSlide(1);
};

Slidein.prototype.moveSlide = function (step) {
  console.log(step);
};
