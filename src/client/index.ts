// src/client/index.ts
import {handleSubmit} from '../client/ts/formHandler';
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

console.log('DOM fully loaded and parsed');
const form = document.getElementById('urlForm');
if (form) {
  form.addEventListener('submit', handleSubmit);
  console.log('Form handler attached');
} else {
  console.error('Form element not found');
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
