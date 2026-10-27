const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const shareButton = document.querySelector('#share-button');
const shareStatus = document.querySelector('#share-status');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open', !isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
    });
  });
}

if (shareButton && shareStatus) {
  shareButton.addEventListener('click', async () => {
    const shareData = {
      title: document.title,
      text: 'Please take a look at this page about finding a living kidney donor.',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        shareStatus.textContent = 'Thanks for helping spread the word.';
      } catch (error) {
        if (error.name !== 'AbortError') {
          shareStatus.textContent = 'Sharing was not available. You can copy the website address from your browser.';
        }
      }
    } else if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        shareStatus.textContent = 'Website link copied. Thanks for helping spread the word!';
      } catch (error) {
        shareStatus.textContent = 'You can copy the website address from your browser to share it.';
      }
    } else {
      shareStatus.textContent = 'Copy the website address from your browser to share this page.';
    }
  });
}
