document.getElementById('score-btn').addEventListener('click', async () => {
  const input = document.getElementById('image-input');
  const apiKeyInput = document.getElementById('api-key');
  const result = document.getElementById('result');

  if (!input.files.length) {
    result.textContent = 'Please select an image first.';
    return;
  }

  if (!apiKeyInput.value) {
    result.textContent = 'Please enter your OpenAI API key.';
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64 = reader.result.split(',')[1];
    result.textContent = 'Scoring...';
    try {
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKeyInput.value.trim()}`
        },
        body: JSON.stringify({
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: 'Check the green and sustainibilty score of the image uploaded, return all the text description and reason on why the given score.' },
                { type: 'image_url', image_url: { url: `data:${file.type};base64,${base64}` } }
              ]
            }
          ],
          max_tokens: 500
        })
      });
      const data = await resp.json();
      if (!resp.ok) {
        result.textContent = data.error?.message || 'Error contacting OpenAI API.';
      } else {
        result.textContent = data.choices?.[0]?.message?.content || 'No result';
      }
    } catch (err) {
      console.error(err);
      result.textContent = 'Error contacting OpenAI API.';
    }
  };
  reader.readAsDataURL(file);
});
