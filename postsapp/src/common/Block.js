import React, {useState, useEffect} from "react";
import {putData} from "../login/fetch";

const Block = (props) => {
    console.log("Posts",props);
    const [images, setImages] = useState({}); 
    const [imagesReadyCnt, setImagesReadyCnt] = useState(0);  // counter of preloaded images
    const importedImages = {};
    useEffect(() => {
        let i = 0;
        props.data.forEach(item => {
          console.log(item);
            importedImages[item.imageName] = item.imageName; // name of file will be a key, path to file will be a value
            const img = new Image();
            img.onload = () => {
              i++;
              setImagesReadyCnt(i); // increase counter when image is loaded
                };
            img.src = item.imageName;
            });
        setImages(importedImages); 
    }, [props.data]);

    if (Object.keys(images).length !== imagesReadyCnt || imagesReadyCnt < 1) { 
        return  "Loading ...";
      }

      const Ok = async (value) => {
        props.data.some(item => {
          if(item.imageName === value) {
            const userData = {
              noCount: item.noCount,
              imageId: item.imageId,
              imageName: item.imageName,
              display: false
            }
            putData('Images' , userData);
            delete item.imageId;
            delete item.imageName;
            delete item.display;
            delete item.noCount;
            props.func(value, userData);
          }
        })
      }
    return(<div>
    {Object.values(images).map((value, i) => {
      console.log(value); // Logging value here
      return (
      <div class="cont" style={{width: 18+'rem'}}>
        <div class="m2 card">
          <h5 class="card-title">Posts</h5>
          <div class = "container">
            <img src={value} />
          </div>
          <button id = "but" onClick = {() => Ok(value)}>Return post?</button>
        </div>
      </div>
      );
    })}
  </div>
    );
}

export default Block;