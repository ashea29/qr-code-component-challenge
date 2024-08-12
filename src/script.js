import dtIconUrl from './images/dark-theme-icon.svg';
import ltIconUrl from './images/light-theme-icon.svg';

// Get DOM elements
const themeToggle = document.getElementById('theme-toggle');
const toggleImg = document.querySelector('.theme-toggle__icon');

// Attach event listeners
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeToggle.querySelector('span').textContent = document.body.classList.contains('dark-theme') ? 'Dark Theme' : 'Light Theme';

  toggleImg.src = document.body.classList.contains('dark-theme') ? dtIconUrl : ltIconUrl;
});
