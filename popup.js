const blurRange = document.getElementById('blurRange');
const blurValue = document.getElementById('blurValue');
const toggleButton = document.getElementById('toggleBlur');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');

function updateUI(blurAmount, blurEnabled) {
  blurRange.value = blurAmount;
  blurValue.textContent = blurAmount + 'px';
  toggleButton.textContent = blurEnabled ? 'Disable Blur' : 'Enable Blur';
  toggleButton.className = 'toggle-btn ' + (blurEnabled ? 'enabled' : 'disabled');
  statusDot.className = 'status-dot ' + (blurEnabled ? 'on' : 'off');
  statusText.textContent = blurEnabled ? 'Blur active' : 'Blur paused';
}

// Load settings
chrome.storage.sync.get({ blurAmount: 10, blurEnabled: true }, (data) => {
  updateUI(data.blurAmount, data.blurEnabled);
});

// Update blur amount
blurRange.addEventListener('input', () => {
  const value = blurRange.value;
  blurValue.textContent = value + 'px';
  chrome.storage.sync.set({ blurAmount: Number(value) });
});

// Toggle blur on/off
toggleButton.addEventListener('click', () => {
  chrome.storage.sync.get({ blurEnabled: true }, (data) => {
    const newState = !data.blurEnabled;
    chrome.storage.sync.set({ blurEnabled: newState });
    updateUI(blurRange.value, newState);
  });
});
