document.getElementById('animate-btn').addEventListener('click', () => {
  const figure = document.getElementById('stick-figure');
  const text = document.getElementById('walk-text');
  figure.classList.remove('walk');
  void figure.offsetWidth; // restart animation
  figure.classList.add('walk');
  text.textContent = 'Green Agent is pro at finding everything about a product to help you choose wisely.';
});
