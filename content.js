const floatingContainer = document.createElement('div');
floatingContainer.id = 'todo-extension-container';
floatingContainer.innerHTML = `
  <div id="todo-extension-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  </div>
  <iframe
    id="todo-extension-iframe"
    src="${chrome.runtime.getURL('index.html')}"
    style="display: none;"
  ></iframe>
`;

document.body.appendChild(floatingContainer);

const button = document.getElementById('todo-extension-button');
const iframe = document.getElementById('todo-extension-iframe');

// Update iframe attributes for security and proper styling
iframe.setAttribute(
  'sandbox',
  'allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-downloads'
);
iframe.setAttribute(
  'allow',
  'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
);
iframe.setAttribute('security', 'restricted');
iframe.setAttribute('referrerpolicy', 'no-referrer');

// Match iframe dimensions with popup styling
iframe.style.width = '450px'; // Match the width from index.html
iframe.style.height = '600px'; // Match the max-height from index.html
iframe.style.backgroundColor = '#ffffff';
iframe.style.overflow = 'hidden';

let isOpen = false;
button.addEventListener('click', () => {
  isOpen = !isOpen;
  iframe.style.display = isOpen ? 'block' : 'none';
});
