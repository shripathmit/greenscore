// React is loaded globally via a script tag in index.html. Using the global
// object here avoids module syntax which isn't supported by the in-browser
// Babel transform.
const { useState } = React;
const MOCK_RESULT = `### Sustainability Analysis of the Product

#### Materials
- *Assumption*: Example assumption about materials.
- *Evaluation*: Example evaluation.
- *Score*: 7/10

#### Manufacturing Process
- *Assumption*: Example assumption about manufacturing.
- *Evaluation*: Example evaluation.
- *Score*: 6/10

#### Design and Durability
- *Assumption*: Example assumption about design.
- *Evaluation*: Example evaluation.
- *Score*: 7/10

#### Finishing and Coatings
- *Assumption*: Example assumption about finishing.
- *Evaluation*: Example evaluation.
- *Score*: 8/10

#### End of Life
- *Assumption*: Example assumption about end of life.
- *Evaluation*: Example evaluation.
- *Score*: 7/10

### GreenScore: Estimated 7/10
- *Rationale*: Mock rationale for demo purposes.`;

// Prompt sent to OpenAI for sustainability analysis
const ANALYSIS_PROMPT = `
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

Always return response in the example format.

### Sustainability Analysis of the Product
#### Materials
- *Assumption*: The tumbler appears to be made of stainless steel with a plastic lid and straw.
- *Evaluation*: Stainless steel is a durable and recyclable material. If the plastic used is recyclable, it adds to the sustainability.
#### Manufacturing Process
- *Assumption*: Without specific details, it is assumed that the manufacturing process follows standard industry techniques, likely involving some energy consumption but not necessarily energy-efficient methods.
- *Evaluation*: If the product is designed to be durable and recyclable, it might offset some of the environmental impact from manufacturing.
#### Design and Durability
- *Assumption*: The design seems practical with a focus on functionality, indicating potential durability and longevity. However, moderation in design is assumed without specific details.
- *Evaluation*: A durable design supports sustainability by reducing the need for frequent replacements.
#### Finishing and Coatings
- *Assumption*: It’s unclear from the image if the finishes are eco-friendly, so standard finishes are assumed.
- *Evaluation*: Non-toxic finishes would significantly enhance sustainability but cannot be confirmed without more details.
#### End of Life
- *Assumption*: Assuming the materials are typically recyclable, especially stainless steel and possibly the plastic parts.
- *Evaluation*: If designed for recyclability, this can significantly reduce waste at the product's end of life.
### GreenScore: Estimated 7/10
- *Rationale*: The product appears to use durable materials and has the potential for positive end-of-life outcomes through recyclability. However, due to assumptions about manufacturing processes and finishings, a score of 7 reflects a moderately sustainable product, with room for improvement in material sourcing and processes.
`;

function LandingPage() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSnap = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setImagePreview(dataUrl);
        sessionStorage.setItem('imagePreview', dataUrl);
      };
      reader.readAsDataURL(file);
      const name = file.name ? file.name.replace(/\.[^/.]+$/, '') : 'Uploaded Product';
      sessionStorage.setItem('productName', name);
    }
  };

  const handleScore = () => {
    if (!imageFile) {
      setResult("Please select an image first.");
      return;
    }

    sessionStorage.setItem('showSpinner', 'true');
    setLoading(true);

    const finalize = (text) => {
      setResult(text);
      sessionStorage.setItem('analysisResult', text);
      window.location.href = 'analysis.html';
    };

    if (!apiKey.trim()) {
      finalize(MOCK_RESULT);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(',')[1];
      setResult('Scoring...');
      try {
        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey.trim()}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are an expert in sustainability assessment. When given an image of a product, you will analyze its sustainability across five categories: Materials, Manufacturing Process, Design and Durability, Finishing and Coatings, and End of Life.\n\nFor each category:\n- Provide a clear assumption if the image lacks explicit details\n- Offer a brief evaluation of sustainability\n- Assign a score out of 10 based on your assessment\n\nAt the end, calculate the overall GreenScore as the average of the five category scores. Include a short rationale justifying the overall score.\n\nAlways return your output in the following format:\n\n### Sustainability Analysis of the Product\n\n#### Materials\n- *Assumption*: ...\n- *Evaluation*: ...\n- *Score*: X/10\n\n#### Manufacturing Process\n- *Assumption*: ...\n- *Evaluation*: ...\n- *Score*: X/10\n\n#### Design and Durability\n- *Assumption*: ...\n- *Evaluation*: ...\n- *Score*: X/10\n\n#### Finishing and Coatings\n- *Assumption*: ...\n- *Evaluation*: ...\n- *Score*: X/10\n\n#### End of Life\n- *Assumption*: ...\n- *Evaluation*: ...\n- *Score*: X/10\n\n### GreenScore: Estimated X/10\n- *Rationale*: ...`
              },
              {
                role: 'user',
                content: [
                  { type: 'text', text: ANALYSIS_PROMPT },
                  { type: 'image_url', image_url: { url: `data:${imageFile.type};base64,${base64}` } }
                ]
              }
            ],
            max_tokens: 500
          })
        });
          const data = await resp.json();
          if (!resp.ok) {
            finalize(data.error?.message || 'Error contacting OpenAI API.');
          } else {
            const text = data.choices?.[0]?.message?.content || 'No result';
            finalize(text);
          }
        } catch (err) {
          console.error(err);
          finalize('Error contacting OpenAI API.');
        }
      };
      reader.readAsDataURL(imageFile);
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      {loading && (
        <div className="loading-overlay">
          <div className="loader" aria-label="Loading"></div>
        </div>
      )}


      {/* Hero Section */}
      <section id="home" className="w-full bg-cover bg-center py-16 px-8 text-center text-white" style={{ backgroundImage: "url('assets/Main Background.png')" }}>
        <div className="max-w-md mx-auto bg-black bg-opacity-50 p-6 rounded-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Make every choice count — for the planet and for the future</h2>
          <p className="text-sm text-gray-300 mb-6">Use the power of AI to understand the green impact of your purchases</p>
          <label className="block mb-4">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleSnap}
              className="hidden"
            />
            <span className="cursor-pointer bg-green-600 w-full block text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-700 text-center">
              Snap
            </span>
          </label>

          {/* How It Works */}
          <div className="grid gap-4 sm:grid-cols-3 text-left mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-green-600 bg-opacity-20 rounded-full text-2xl">
                📷
              </div>
              <div>
                <h4 className="font-semibold">Upload a Photo</h4>
                <p className="text-sm text-gray-300">Snap or upload any consumer product</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-green-600 bg-opacity-20 rounded-full text-2xl">
                🤖
              </div>
              <div>
                <h4 className="font-semibold">AI Analysis</h4>
                <p className="text-sm text-gray-300">Our eco trained model analyzes materials, packaging & more</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-green-600 bg-opacity-20 rounded-full text-2xl">
                🌿
              </div>
              <div>
                <h4 className="font-semibold">Get your Greenscore</h4>
                <p className="text-sm text-gray-300">See your score and learn how to choose greener</p>
              </div>
            </div>
          </div>

          {imagePreview && (
            <>
              <img
                src={imagePreview}
                alt="Snap Preview"
                className="rounded-lg border border-white mb-4 mt-4 transition-transform duration-500 ease-in-out transform hover:scale-105"
              />
              <input
                type="text"
                placeholder="OpenAI API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full mb-4 px-3 py-2 rounded-full text-gray-800"
              />
              <button onClick={handleScore} className="bg-white w-full text-green-700 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200">
                Score Me
              </button>
              {result && <p className="text-sm text-white whitespace-pre-wrap mt-4">{result}</p>}
            </>
          )}
        </div>
      </section>

      {/* Feature Highlights */}
      <section
        className="w-full bg-gray-50 py-16 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url('assets/Main Background.png')" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow py-6 px-8 text-center hover:shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4"></div>
            <h4 className="text-lg font-semibold mb-2">Why EcoSnap?</h4>
            <p className="text-gray-600 text-sm">EcoSnap gives you instant green scoring with transparent AI so you can buy better without the guesswork.</p>
          </div>
          <div className="bg-white rounded-xl shadow py-6 px-8 text-center hover:shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4"></div>
            <h4 className="text-lg font-semibold mb-2">Who It's For</h4>
            <p className="text-gray-600 text-sm">From eco-conscious shoppers to sustainability-focused brands, EcoSnap is built for anyone making mindful decisions.</p>
          </div>
          <div className="bg-white rounded-xl shadow py-6 px-8 text-center hover:shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4"></div>
            <h4 className="text-lg font-semibold mb-2">Our AI Advantage</h4>
            <p className="text-gray-600 text-sm">Backed by data and constantly learning, EcoSnap’s AI delivers fast, reliable impact scores tailored to your choices.</p>
          </div>
        </div>
      </section>


    </div>
  );
}

