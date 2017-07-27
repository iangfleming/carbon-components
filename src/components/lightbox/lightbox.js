import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch
  from '../../globals/js/mixins/init-component-by-search';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';
// import eventMatches from '../../globals/js/misc/event-matches';

class Lightbox extends mixin(createComponent, initComponentBySearch) {
  constructor(element, options) {
    super(element, options);
    this.activeIndex = this.element.dataset.lightboxIndex;
    this.totalSlides = [...this.element.querySelectorAll(this.options.selectorLightboxItem)].length - 1;

    this.updateSlide();

    this.element.addEventListener('click', (evt) => {
      this.handleClick(evt);
    });

    this.element.parentNode.addEventListener('modal-beingshown', (evt) => {
      if (!evt.detail.launchingElement.dataset.carouselItemIndex) {
         throw new Error('launchingElement must have carouselItemIndex data attribute to indicated what item to display');
      }
      this.activeIndex = evt.detail.launchingElement.dataset.carouselItemIndex;
      this.updateSlide();
    });
  }

  handleClick = (evt) => {
      if (evt.target.matches(this.options.selectorScrollRight)) {
        if (this.activeIndex < this.totalSlides) {
          this.activeIndex++;
          this.updateSlide();
        }
      }
      if (evt.target.matches(this.options.selectorScrollLeft)) {
        if (this.activeIndex > 0) {
          this.activeIndex--;
          this.updateSlide();
        }
      }
  }

  updateSlide = () => {
    const items = [...this.element.ownerDocument.querySelectorAll(this.options.selectorLightboxItem)];
    items.forEach((item) => {
      item.classList.remove(this.options.classActiveItem);
    });
    items[this.activeIndex].classList.add(this.options.classActiveItem);
  }

  static options = {
    selectorInit: '[data-lightbox]',
    selectorScrollRight: '[data-scroll-right]',
    selectorScrollLeft: '[data-scroll-left]',
    selectorLightboxItem: '.bx--lightbox__item',
    classActiveItem: 'bx--lightbox__item--shown',
  };

  /**
   * The map associating DOM element and accordion UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();
}

export default Lightbox;
