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
          // using gpt mini
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: `
                  Please analyze the sustainability of this product based on the image provided. Evaluate the following factors and make assumptions if no additional information is available:

Materials: Identify the type of materials used (e.g., wood, metal, plastic, fabric). Are these materials renewable, recycled, or certified (e.g., FSC, eco-labels)?
Assumption: If material details are not provided in the image, assume common materials such as untreated or minimally treated wood, or standard plastics and metals.
Manufacturing Process: Based on the design and construction visible in the image, does the product appear to be crafted with minimal waste, energy-efficient methods, or environmentally-friendly technologies?
Assumption: If manufacturing details are not visible, assume that the product was made using standard production techniques unless otherwise indicated.
Design and Durability: Does the product appear to be designed for longevity, easy repair, or recyclability? Does the design seem timeless and durable to minimize the need for replacement?
Assumption: If design details are not available, assume a basic design with moderate durability unless indicated otherwise.
Finishing and Coatings: Based on the appearance, does the product have environmentally friendly finishes (e.g., water-based paints, non-toxic sealants)?
Assumption: If no finishing details are visible, assume the product uses typical finishes unless specified in the image.
End of Life: Does the product seem recyclable or biodegradable at the end of its life based on its material and design?
Assumption: If end-of-life information is not available, assume that the product’s disposal follows typical industry standards for the materials visible.
GreenScore: Provide an estimated GreenScore (0-10) based on these factors, derived from the image analysis. Include a brief rationale for the score, making any necessary assumptions if information is missing.
                  ` },
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
