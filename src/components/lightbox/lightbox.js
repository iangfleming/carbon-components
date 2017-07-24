import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentByLauncher from '../../globals/js/mixins/init-component-by-launcher';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';
// import eventMatches from '../../globals/js/misc/event-matches';

class Lightbox extends mixin(createComponent, initComponentByLauncher) {
  constructor(element, options) {
    super(element, options);
  }

  static options = {
    selectorInit: '[data-carousel]',
  };

  /**
   * The map associating DOM element and accordion UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();
}

export default Lightbox;
