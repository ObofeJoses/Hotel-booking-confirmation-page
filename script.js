// Mobile menu open / close
const sidebar = document.getElementById('mobile-menu');
const menuToggleBtn = document.getElementById('menu-toggle-btn');
const menuCloseBtn = document.getElementById('menu-close-btn');

function openMenu(){
  sidebar.classList.add('is-open');
  document.body.style.overflow = 'hidden'; // stop the page scrolling behind the overlay
  menuCloseBtn.focus();
}

function closeMenu(){
  sidebar.classList.remove('is-open');
  document.body.style.overflow = '';
  menuToggleBtn.focus();
}

menuToggleBtn.addEventListener('click', openMenu);
menuCloseBtn.addEventListener('click', closeMenu);

// tapping any nav link should close the overlay on mobile
document.querySelectorAll('.sidebar-nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (sidebar.classList.contains('is-open')) closeMenu();
  });
});

// Copy wifi password to clipboard
// ---------------------------------------------------------
const copyBtn = document.getElementById('copy-wifi-password-btn');
const wifiPassword = document.querySelector('.wifi-password');

copyBtn.addEventListener('click', async () => {
  const text = wifiPassword.textContent.trim();

  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // fallback for older browsers or non-HTTPS contexts where
    // navigator.clipboard isn't available
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  const original = copyBtn.textContent;
  copyBtn.textContent = 'Copied';
  copyBtn.classList.add('copied');
  setTimeout(() => {
    copyBtn.textContent = original;
    copyBtn.classList.remove('copied');
  }, 1600);
});
