import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../../assets/default_image.svg";

const ImageGenerator = () => {
  const [image_url, setImageUrl] = useState("/");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return;
    }

    setLoading(true); // Set loading to true before making the request

    const url = "https://open-ai21.p.rapidapi.com/texttoimage2";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "eb615e1054msh4d970fb9f0a2f76p117647jsn433f6663ed02",
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
      },
      body: JSON.stringify({ text: inputRef.current.value }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      if (result.generated_image) {
        setImageUrl(result.generated_image);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        Albert's image <span>generator </span>
      </div>
      <div className="img-loading">
        {loading ? ( // Show loading spinner if loading is true
          <div className="spinner"></div>
        ) : (
          <div className="image">
            <img src={image_url === "/" ? default_image : image_url} alt="" />
          </div>
        )}
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what is in your mind"
        />
        <div className="generate-btn" onClick={imageGenerator}>
          Generate
        </div>
      </div>
      <div className="disclaimer">
        <p className="text">
          Disclaimer: this is the free version of the API where you can get the
          little access of the generations and not all of the pictures are not
          going to provide the accurate results.
        </p>
      </div>
    </div>
  );
};

export default ImageGenerator;
