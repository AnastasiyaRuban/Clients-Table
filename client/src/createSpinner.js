export function createLoader() {
  const loader = document.createElement('div');
  loader.innerHTML = `
      <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  `;
  loader.classList.add(
    'loader',
    'justify-content-center',
    'align-items-center'
  );

  return loader;
}
