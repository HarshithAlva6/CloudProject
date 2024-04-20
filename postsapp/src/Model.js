import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import AxiosList from "./common/AxiosList";
import Navi from "./common/Navi";

function ImageClassifier() {
  const [model, setModel] = useState(null);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trainingInProgress, setTrainingInProgress] = useState(false);

async function fetchBucket() {
  try {
      const response = await AxiosList.getImages();
      setContent(response.data);
      console.log(response);
  } catch (error) { console.error('Error fetching users:', error); }
}
useEffect(() => {
  fetchBucket();
  loadModel();
}, []);

async function loadModel() {
  const mobilenetModel = await mobilenet.load();
  setModel(mobilenetModel);
}

  async function loadImage(imageUrl) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    await img.decode();
    const tensor = tf.browser.fromPixels(img).resizeNearestNeighbor([224, 224]).toFloat();
    return tensor.expandDims();
  }
  
  async function classifyImage(imageUrl) {
    if (!model) return;

    try {
      const img = await loadImage(imageUrl);
      const prediction = await model.classify(img);
      console.log(prediction);
      return prediction;
    } catch (error) {
      console.error('Error classifying image:', error);
      throw error;
    }
  }

  async function fetchAndClassifyImages() {  
    setLoading(true);
    const urls = content.map(item => item.imageName); 
    console.log(urls);
    const newImages = [];
    for (const url of urls) {
      const prediction = await classifyImage(url);
      newImages.push({ url, prediction });
    }
    setImages(newImages);
    setLoading(false);
  }

   // Function to train the model
   async function trainModel() {
    if (!model || !images.length) return;

    const imageTensors = [];
    for (const imageObj of images) {
      const imgTensor = await loadImage(imageObj.url);
      imageTensors.push(imgTensor);
    }

    const xs = tf.stack(imageTensors);
    console.log(xs);
    // Define the model architecture for unsupervised learning
    const autoencoder = tf.sequential({
      layers: [
        // Example: Add layers for autoencoder
        tf.layers.flatten({ inputShape: [7, 7, 256] }),
        tf.layers.dense({ units: 100, activation: 'relu' }),
        tf.layers.dense({ units: 7 * 7 * 256, activation: 'sigmoid' }), // Output layer
        tf.layers.reshape({ targetShape: [7, 7, 256] })
      ]
    });
    console.log("Auto", autoencoder);
  
    // Compile the model
    autoencoder.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError'
    });
    console.log("Auto2", autoencoder);
  
    // Train the model
    setTrainingInProgress(true);
    await autoencoder.fit(xs, xs, {
      epochs: 10,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch + 1}: Loss = ${logs.loss}`);
        }
      }
    });
    console.log("Auto3", autoencoder);
    setTrainingInProgress(false);
  
    // Save the trained model
    await autoencoder.save("models/autoencoder-model");
  }
  useEffect(() => {
      trainModel();
  }, [images]);

  function filterSimilarImages() {
    // Logic to filter out similar images based on classifications
    console.log(images);
    setFilteredImages(images);
  }

  useEffect(() => {
    if (images.length > 0) {
      filterSimilarImages();
    }
  }, [images]);

  return (
    <div>
      <Navi />
      <button onClick={fetchAndClassifyImages}>Fetch and Classify Images</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
      filteredImages.map((image, index) => (
        <div key={index}>
          <img src={image.url} alt={`Image ${index + 1}`} />
          <p>Classification: {image.prediction?image.prediction.map((img) => (<div>
            <p>{img.className}</p>
            <p>{img.probability}</p>
          </div>)):<p>Waiting...</p>}</p>
        </div>
      )
      ))}
            {trainingInProgress && <p>Training in progress...</p>}
    </div>
  );
}

export default ImageClassifier;