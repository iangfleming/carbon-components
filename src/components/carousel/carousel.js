import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch
  from '../../globals/js/mixins/init-component-by-search';
// import eventMatches from '../../globals/js/misc/event-matches';

class Carousel extends mixin(createComponent, initComponentBySearch) {
  /**
   * Carousel.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an carousel.
   */
  constructor(element, options) {
    super(element, options);
    this.filmstrip = this.element.querySelector(this.options.selectorFilmstrip);
    this.carouselBtn = this.element.querySelector(this.options.selectorCarouselBtn);
    this.carouselItem = this.element.querySelector(this.options.selectorCarouselItem);

    this.carouselBtn.addEventListener('click', (evt) => {
      const itemWidth = this.carouselItem.getBoundingClientRect().width;
      this.filmstrip.style.transform = `translateX(-${itemWidth}px)`;
    });
  }

  static options = {
    selectorInit: '[data-carousel]',
    selectorFilmstrip: '.bx--carousel-filmstrip',
    selectorCarouselBtn: '.bx--carousel__btn',
    selectorCarouselItem: '.bx--carousel__item',
  };

  /**
   * The map associating DOM element and accordion UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();
}

export default Carousel;
