// ============================
// Skool Blur Extension - content.js
// Uses shared SkoolBlurCore from blur-core.js
// ============================

/* If Skool Backpack is handling blur, let it take over */
if (document.documentElement.dataset.skoolBlurActive === 'backpack') {
  /* Backpack is active, skip to avoid double-blurring */
} else {
  /* Mark that Skool Blur is active */
  document.documentElement.dataset.skoolBlurActive = 'blur';

  /* Apply based on saved settings */
  chrome.storage.sync.get({ blurAmount: 10, blurEnabled: true }, function(data) {
    SkoolBlurCore.updateAll(data.blurAmount, data.blurEnabled);
  });

  /* Listen for settings changes (slider/toggle) */
  chrome.storage.onChanged.addListener(function() {
    chrome.storage.sync.get({ blurAmount: 10, blurEnabled: true }, function(data) {
      SkoolBlurCore.updateAll(data.blurAmount, data.blurEnabled);
    });
  });

  /* MutationObserver for dynamic content */
  var observer = new MutationObserver(function(mutations) {
    chrome.storage.sync.get({ blurAmount: 10, blurEnabled: true }, function(data) {
      mutations.forEach(function(m) {
        m.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) {
            SkoolBlurCore.updateAll(data.blurAmount, data.blurEnabled, node);
          }
        });
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}
