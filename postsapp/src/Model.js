import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import AxiosList from "./common/AxiosList";
import Navi from "./common/Navi";
import './App.css';

function ImageClassifier() {
  const [model, setModel] = useState(null);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [trainedImages, setTrainedImages] = useState([]);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trainingInProgress, setTrainingInProgress] = useState(false);
  const [classify, setClass] = useState('');

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

  // Create a canvas and context
  const canvas = document.createElement('canvas');
  canvas.width = 224;
  canvas.height = 224;
  const ctx = canvas.getContext('2d');

  // Draw the image onto the canvas
  ctx.drawImage(img, 0, 0, 224, 224);

  // Get the pixel data from the canvas
  const imageData = ctx.getImageData(0, 0, 224, 224);

  // Convert the pixel data to a tensor
  const tensor = tf.tidy(() => {
    // Convert the pixel data to a 3D tensor
    const tensor3d = tf.tensor3d(imageData.data, [224, 224, 4], 'int32');

    // Remove the alpha channel if present
    const rgbTensor = tensor3d.slice([0, 0, 0], [224, 224, 3]);

    // Add an extra dimension to represent the batch size
    return rgbTensor.expandDims(0);
  });

  return tensor;
}

  
async function classifyImage(imageUrl) {
  if (!model) return;
  try {
    const img = await loadImage(imageUrl);
    const reshapedImg = img.squeeze(); // Remove the batch dimension if it's there
    // Resize the image
    const resizedImg = tf.image.resizeNearestNeighbor(reshapedImg, [224, 224]);
    // Add batch dimension
    const imgBatch = resizedImg.expandDims(0);
    const prediction = await model.classify(imgBatch);
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
  //const imageTensors = [];
  const groupedImages = {};
  const inputTensors = [];
  const targetTensors = [];
  var dataArray = [];
  images.forEach(image => {
    image.prediction.forEach(prediction => {
      const predictionKey = JSON.stringify(prediction.className);
      if (!groupedImages[predictionKey]) {
        groupedImages[predictionKey] = [];
      }
      groupedImages[predictionKey].push(image);
    })
  });
  for (const predictionKey in groupedImages) {
    var groupImages = groupedImages[predictionKey];
    const numSamples = groupImages.length;
    console.log(predictionKey, '+', groupImages, "+", groupedImages, 
  '+', typeof(predictionKey));
    if(predictionKey == `"${classify}"`){
      console.log("Got in!");
      groupImages.forEach(item => {
        dataArray.push({
          url: item.url,
          prediction: item.prediction
        });
      });
      setTrainedImages(dataArray);
    }
    console.log(`Group: ${predictionKey}, Number of samples: ${numSamples}`);
    for (const imageObj of groupImages) {
      const imgTensor = await loadImage(imageObj.url);
      inputTensors.push(imgTensor);
      targetTensors.push(imgTensor);
    }
  }
  // Define the model architecture for unsupervised learning
  const autoencoder = tf.sequential({
    layers: [
      // Example: Add layers for autoencoder
      tf.layers.inputLayer({ inputShape: [224, 224, 3] }),
      tf.layers.flatten(),
      tf.layers.dense({ units: 100, activation: 'relu' }),
      tf.layers.dense({ units: 224 * 224 * 3, activation: 'sigmoid' }), // Output layer
      tf.layers.reshape({ targetShape: [224, 224, 3] })
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
  const inputXs = tf.concat(inputTensors, 0);
  const targetYs = tf.concat(targetTensors, 0);

  await autoencoder.fit(inputXs, targetYs, {
    epochs: 10,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1}: Loss = ${logs.loss}`);
      }
    }
  });
  inputXs.dispose();
  targetYs.dispose();
  console.log("Auto3", autoencoder);

  // Save the trained model
  await autoencoder.save("downloads://trained-model");
  setTrainingInProgress(false);
}
  useEffect(() => {
      trainModel();
  }, [images]);

  function filterSimilarImages() {
    // Logic to filter out similar images based on classifications
    console.log(images, trainedImages);
    var wow = images.filter(image => !trainedImages.map(data => data.url).includes(image.url));
    console.log(wow);
    setFilteredImages(wow);
  }

  async function trainImages() {
    // Load the saved trained model
    if (images.length > 0) {
      filterSimilarImages();
    }
  }

  return (
    <div>
      <Navi />
      {loading ? (
        <p>Loading...</p>
      ) : (
      filteredImages.map((image, index) => (
        <div class="cont" style={{width: 18+'rem'}}>
        <div class="m2 card" key={index}>
          <h5 class="card-title">Trained Images</h5>
          <div class = "contain">
            <img src={image.url} alt={`Image ${index + 1}`}  />
            <p>Classification: {image.prediction?image.prediction[0].className:<p>Waiting...</p>}</p>
          </div>
        </div>
      </div>
      )
      ))}
      <div className='train'>
          <button onClick={fetchAndClassifyImages}>Fetch and Classify Images</button>
          {trainingInProgress && <p>Training in progress...</p>}
          <button onClick={trainImages}>Display Images</button>  <br />
          <input className="styled-input" placeholder = "Mention classification" onChange={(e) => setClass(e.target.value)} />
      </div>
    </div>
  );
}

export default ImageClassifier;