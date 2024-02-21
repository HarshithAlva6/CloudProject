import React, { useEffect, useState } from 'react';

function ImagesList() {
    const [images, setImages] = useState({}); 
    const [imagesReadyCnt, setImagesReadyCnt] = useState(0);  // counter of preloaded images
    useEffect(() => {
                const importedImages = {};
                let i = 0;
                const r = require.context('../src/images', true);
                r.keys().forEach(item => {
                    const importedImg = r(item); // import image
                    importedImages[item.replace("./", "")] = importedImg; // name of file will be a key, path to file will be a value
                    const img = new Image();
                    img.onload = () => {
                      i++;
                      setImagesReadyCnt(i); // increase counter when image is loaded
                        };
                    img.src = importedImg;
                    });
                setImages(importedImages); 
            }, []);
            if (Object.keys(images).length !== imagesReadyCnt || imagesReadyCnt < 1) {  
                return  "Loading ...";
              }
return (
    <div>
        {Object.values(images).map(img => 
        <div class="cont" style={{width: 18+'rem'}}>
        <div class="m2 card">
          <h5 class="card-title">Posts</h5>
          <div class = "container">
            <img src={img} />
          </div>
          <button id = "but">Is this Post OK?</button>
        </div>
      </div>
      )}
    </div>
    );
}

export default ImagesList;