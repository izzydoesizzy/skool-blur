const blurRange = document.getElementById('blurRange');
const blurValue = document.getElementById('blurValue');
const toggleButton = document.getElementById('toggleBlur');

// Load settings
chrome.storage.sync.get({ blurAmount: 10, blurEnabled: true }, (data) => {
  blurRange.value = data.blurAmount;
  blurValue.textContent = data.blurAmount + 'px';
  toggleButton.textContent = data.blurEnabled ? 'Disable Blur' : 'Enable Blur';
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
    toggleButton.textContent = newState ? 'Disable Blur' : 'Enable Blur';
  });
});
