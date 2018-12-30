import { shallowMount } from '@vue/test-utils';
import App from '../../src/App.vue';

describe('App.vue', () => {
  it('is visible', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.isVisible()).toBe(true);
  });
});
