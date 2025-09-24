// ============================
// Skool Blur Extension - content.js
// ============================

// --- Blur Helpers ---
function applySmoothBlur(element, blurAmount) {
  element.style.transition = 'filter 0.3s ease';
  element.style.filter = `blur(${blurAmount}px)`;
  element.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
  element.style.borderRadius = '5px';
  element.style.overflow = 'hidden';
}

function clearBlur(element) {
  element.style.filter = 'none';
  element.style.boxShadow = 'none';
  element.style.borderRadius = '';
  element.style.overflow = '';
}

// --- Collect Targets ---
// Avatars, usernames, profile images, and @mention links
function getTargets(root = document) {
  const avatars = root.querySelectorAll(
    '.styled__AvatarWrapper-sc-140v536-0, .styled__AvatarWrapper-sc-1o1lx2q-0, .styled__AvatarWrapper-sc-1ruw40r-0'
  );
  const usernames = root.querySelectorAll('.styled__UserNameText-sc-24o0l3-1');
  const images = root.querySelectorAll(
    '.styled__AvatarWrapper-sc-140v536-0 img, .styled__AvatarWrapper-sc-1o1lx2q-0 img, .styled__AvatarWrapper-sc-1ruw40r-0 img'
  );
  const atLinks = root.querySelectorAll('a[href^="/@"]');

  return [...avatars, ...usernames, ...images, ...atLinks];
}

// --- Apply or Clear Blur ---
function updateBlur(blurAmount, enabled, root = document) {
  const targets = getTargets(root);
  targets.forEach(el => {
    if (enabled) {
      applySmoothBlur(el, blurAmount);
    } else {
      clearBlur(el);
    }
  });
}

// --- Apply based on saved settings ---
// NOTE: default blurEnabled = false, so blur is OFF on first load
chrome.storage.sync.get({ blurAmount: 10, blurEnabled: false }, (data) => {
  updateBlur(data.blurAmount, data.blurEnabled);
});

// --- Listen for settings changes (slider/toggle) ---
chrome.storage.onChanged.addListener(() => {
  chrome.storage.sync.get({ blurAmount: 10, blurEnabled: false }, (data) => {
    updateBlur(data.blurAmount, data.blurEnabled);
  });
});

// --- MutationObserver for dynamic content ---
const observer = new MutationObserver((mutations) => {
  chrome.storage.sync.get({ blurAmount: 10, blurEnabled: false }, (data) => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          updateBlur(data.blurAmount, data.blurEnabled, node);
        }
      });
    });
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});
