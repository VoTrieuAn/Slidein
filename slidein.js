function Slidein(selector, options = {}) {
  this.container = document.querySelector(selector);
  if (!this.container) {
    console.error(`Slidein: Container ${selector} not found`);
    return;
  }

  this.opt = Object.assign(
    {
      items: 1,
      loop: false,
    },
    options
  );
  this.slides = Array.from(this.container.children);
  this.currentIndex = 0;
  this._init();
}

Slidein.prototype._init = function () {
  this.container.classList.add("slidein-wrapper");
  this._createTrack();
  this._createNavigation();
};

Slidein.prototype._createTrack = function () {
  this.track = document.createElement("div");
  this.track.className = "slidein-track";

  this.slides.forEach((slide) => {
    slide.classList.add("slidein-slide");
    slide.style.flexBasis = `calc(100% / ${this.opt.items})`;
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
  if (this.opt.loop) {
    this.currentIndex =
      (this.currentIndex + step + this.slides.length) % this.slides.length;
  } else {
    this.currentIndex = Math.min(
      Math.max(this.currentIndex + step, 0),
      this.slides.length - this.opt.items
    );
  }

  this.offset = -(this.currentIndex * (100 / this.opt.items));

  this.track.style.transform = `translateX(${this.offset}%)`;
};
