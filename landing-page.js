import React, { useState } from "react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [result, setResult] = useState("");

  const handleSnap = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleScore = () => {
    if (!imageFile) {
      setResult("Please select an image first.");
      return;
    }
    if (!apiKey) {
      setResult("Please enter your OpenAI API key.");
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
                  { type: 'image_url', image_url: { url: `data:${imageFile.type};base64,${base64}` } }
                ]
              }
            ],
            max_tokens: 500
          })
        });
        const data = await resp.json();
        if (!resp.ok) {
          setResult(data.error?.message || 'Error contacting OpenAI API.');
        } else {
          setResult(data.choices?.[0]?.message?.content || 'No result');
        }
      } catch (err) {
        console.error(err);
        setResult('Error contacting OpenAI API.');
      }
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center shadow-sm md:px-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-600 rounded-full"></div>
          <h1 className="text-xl font-bold text-green-600">EcoSnap</h1>
        </div>
        <button className="md:hidden text-gray-700 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-green-600">Home</a>
          <a href="#" className="hover:text-green-600">About Us</a>
          <a href="#" className="hover:text-green-600">Why</a>
          <a href="green_agent.html" className="hover:text-green-600">Green Agent</a>
        </nav>
      </header>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white shadow-sm">
          <a href="#" className="block py-2 text-sm hover:text-green-600">Home</a>
          <a href="#" className="block py-2 text-sm hover:text-green-600">About Us</a>
          <a href="#" className="block py-2 text-sm hover:text-green-600">Why</a>
          <a href="green_agent.html" className="block py-2 text-sm hover:text-green-600">Green Agent</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="w-full bg-cover bg-center py-16 px-8 text-center text-white" style={{ backgroundImage: "url('https://via.placeholder.com/800x600?text=Green+Earth+AI+Choices')" }}>
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
      <section className="w-full bg-gray-50 py-16 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4"></div>
            <h4 className="text-lg font-semibold mb-2">Why EcoSnap?</h4>
            <p className="text-gray-600 text-sm">EcoSnap gives you instant green scoring with transparent AI so you can buy better without the guesswork.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4"></div>
            <h4 className="text-lg font-semibold mb-2">Who It's For</h4>
            <p className="text-gray-600 text-sm">From eco-conscious shoppers to sustainability-focused brands, EcoSnap is built for anyone making mindful decisions.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4"></div>
            <h4 className="text-lg font-semibold mb-2">Our AI Advantage</h4>
            <p className="text-gray-600 text-sm">Backed by data and constantly learning, EcoSnap’s AI delivers fast, reliable impact scores tailored to your choices.</p>
          </div>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="w-full bg-gray-900 text-white py-8 px-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-600 rounded-full"></div>
            <h5 className="text-lg font-bold">EcoSnap</h5>
          </div>
          <p className="text-sm text-gray-400 max-w-xs">
            Making everyday choices greener with the power of AI.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-linkedin"></i></a>
          </div>
          <p className="text-xs text-gray-500">© 2025 EcoSnap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

