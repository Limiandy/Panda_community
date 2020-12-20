import { escapeHtml } from "@/utils/escapeHtml";

export default {
  richtext: {
    update: function(el, binding) {
      el.innerHTML = escapeHtml(binding.value);
    }
  }
};
