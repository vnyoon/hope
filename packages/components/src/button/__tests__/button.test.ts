import { describe, expect, it } from "vitest";

// @ts-ignore
import { mount } from "@vue/test-utils";
import button from "../button.vue";

// describe('hellohope', () => {
//   it('should be hellohope', () => {
//     expect('hello' + 'hope').toBe('hellohope');
//   })
// })

describe("test button", () => {
  it("should render slot", () => {
    const wrapper = mount(button, {
      slots: {
        default: "hope"
      }
    });

    expect(wrapper.text()).toContain('hope')
  });

  it("should have class", () => {
    const wrapper = mount(button, {
      props: {
        type: "primary"
      }
    });

    expect(wrapper.classes()).toContain('h-button--primary')
  })
})