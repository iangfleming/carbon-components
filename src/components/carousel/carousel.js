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
    this.carouselItem = this.element.querySelector(this.options.selectorCarouselItem);

    this.element.addEventListener('click', (evt) => {
      if (evt.target.matches(this.options.selectorScrollRight)) {
        this.sideScroll('right')
      }
      if (evt.target.matches(this.options.selectorScrollLeft)) {
        this.sideScroll('left')
      }
    });
  }

  sideScroll = (direction) => {
    const filmstripWidth = this.filmstrip.getBoundingClientRect().width;
    const itemWidth = this.carouselItem.getBoundingClientRect().width + this.carouselItem.style.marginRight;
    const re = /\.*translateX\((.*)px\)/i;
    const translateXValue = this.filmstrip.style.transform ? Number(this.filmstrip.style.transform.split(re)[1]) : 0;
    direction = direction === 'right' ? -1 : 1;
    let newTranslateValue = (itemWidth * direction) + translateXValue;
    console.log(newTranslateValue)
    if (newTranslateValue > 0) {
      console.log('hi')
      newTranslateValue = 0;
    }
    if (newTranslateValue < filmstripWidth * -1) {
      newTranslateValue = filmstripWidth * -1;
    }
    this.filmstrip.style.transform = `translateX(${newTranslateValue}px)`;
  }

  static options = {
    selectorInit: '[data-carousel]',
    selectorFilmstrip: '.bx--carousel-filmstrip',
    selectorScrollRight: '[data-scroll-right]',
    selectorScrollLeft: '[data-scroll-left]',
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
