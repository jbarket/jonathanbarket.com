import Rainbow from 'rainbowvis.js';

class Timeline {
  constructor() {
    this.events = document.querySelectorAll(".timeline");
    this.triggerOffset = 0.9;

    this.eventListeners();
    this.rainbow();
    this.showBlocks();
  }

  offset(el) {
    let rect = el.getBoundingClientRect(), bodyEl = document.body;

    return {
      top: rect.top + bodyEl.scrollTop,
      left: rect.left + bodyEl.scrollLeft
    };
  }

  eventListeners() {

    window.addEventListener("scroll", (e) => {
      if (!window.requestAnimationFrame) {
        setTimeout(() => {
          this.showBlocks();
        }, 100);
      }
      else {
        window.requestAnimationFrame(() => {
          this.showBlocks();
        });
      }
    });

  }

	showBlocks(blocks, offset) {

    Array.from(this.events).forEach((event) => {
      if (this.offset(event).top <= (document.body.scrollTop + window.innerHeight * this.triggerOffset)) {
        let img = event.querySelector(".timeline--img");
        let content = event.querySelector(".timeline--content");

        if (img.classList.contains("is-hidden")) {
          img.classList.remove("is-hidden");
          img.classList.add("bounce-in");
          content.classList.remove("is-hidden");
          content.classList.add("bounce-in");
        }

      }
    });

	}

  rainbow() {
    let rainbow = new Rainbow();
    rainbow.setNumberRange(0, this.events.length - 1);
    rainbow.setSpectrum("#3498DB", "#BDC3C7");

    for (var i = 0; i < this.events.length; i++) {
      this.events[i].querySelector(".timeline--img").style.backgroundColor = "#" + rainbow.colourAt(i);

      let tags = this.events[i].querySelectorAll(".tags li");

      Array.from(tags).forEach((tag) => {
        tag.style.backgroundColor = "#" + rainbow.colourAt(i);
      });

    }
  }
}

export default Timeline;
