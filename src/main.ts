import '$styles';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
  intro: true,
});

export default app;
