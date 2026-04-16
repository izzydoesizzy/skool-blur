/* shared/blur-core.js — Canonical blur logic shared between Skool Backpack and Skool Blur */
window.SkoolBlurCore = {
  SELECTORS: [
    '.styled__AvatarWrapper-sc-140v536-0',
    '.styled__AvatarWrapper-sc-1o1lx2q-0',
    '.styled__AvatarWrapper-sc-1ruw40r-0',
    '.styled__UserNameText-sc-24o0l3-1',
    '.styled__AvatarWrapper-sc-140v536-0 img',
    '.styled__AvatarWrapper-sc-1o1lx2q-0 img',
    '.styled__AvatarWrapper-sc-1ruw40r-0 img',
    'a[href^="/@"]'
  ],

  getTargets(root) {
    root = root || document;
    return Array.from(root.querySelectorAll(this.SELECTORS.join(',')));
  },

  applyBlur(el, amount) {
    el.style.transition = 'filter .25s ease';
    el.style.filter = 'blur(' + amount + 'px)';
    el.style.borderRadius = '4px';
    el.style.overflow = 'hidden';
  },

  clearBlur(el) {
    el.style.filter = 'none';
    el.style.borderRadius = '';
    el.style.overflow = '';
  },

  updateAll(amount, enabled, root) {
    var targets = this.getTargets(root);
    for (var i = 0; i < targets.length; i++) {
      if (enabled) this.applyBlur(targets[i], amount);
      else this.clearBlur(targets[i]);
    }
  }
};
