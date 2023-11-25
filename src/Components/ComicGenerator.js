import React, { useState } from 'react';
import './ComicGenerator.css';

const ComicGenerator = () => {
  const [panelInput, setPanelInput] = useState('');
  const [comicPanels, setComicPanels] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateComic = async () => {
    try {
      setLoading(true);

      // Make API call
      const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
          headers: {
            "Accept": "image/png",
            "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ "inputs": panelInput }),
        }
      );

      const result = await response.blob();
      setComicPanels([...comicPanels, result]);
    } catch (error) {
      console.error("Error generating comic:", error);
      alert("Failed to generate comic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comic-generator-container">
      <div id="comicContainer">
        <form>
          <label htmlFor="panel1">Enter Image Description:</label>
          <input
            type="text"
            id="panel1"
            name="panel1"
            value={panelInput}
            onChange={(e) => setPanelInput(e.target.value)}
            required
          />
          <button type="button" onClick={generateComic}>
            Generate Comic
          </button>
        </form>
      </div>

      <div id="comicDisplay" className="comic-display-container">
        {loading && (
          <div className="spinner-overlay">
            <div className = "spinner"> </div>
            <div className = "loading-text"> Loading...</div>
          </div>
        )}
        {comicPanels.map((panel, index) => (
          <img
            key={index}
            src={URL.createObjectURL(panel)}
            alt={`Generated Comic ${index + 1}`}
            className="comicImage"
          />
        ))}
      </div>
    </div>
  );
};

export default ComicGenerator;
