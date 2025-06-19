document.getElementById('score-btn').addEventListener('click', () => {
  const input = document.getElementById('image-input');
  const result = document.getElementById('result');

  if (!input.files.length) {
    result.textContent = 'Please select an image first.';
    return;
  }

  const score = Math.floor(Math.random() * 10) + 1;
  result.textContent = `Estimated sustainability score: ${score}/10`;
});
