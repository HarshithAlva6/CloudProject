import React, {useState, useEffect} from "react";
import {fetchData, putData, deleteData} from "../login/fetch";
import AWS from 'aws-sdk';
import '../App.css';

// Initialize AWS S3 client
const s3 = new AWS.S3({ 
  accessKeyId: 'AKIAQ3EGQDESVNNPWNC5',
  secretAccessKey: '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',
  region: 'us-west-1'
 });


const Block = (props) => {
    const email = localStorage.getItem("email");
    console.log("Posts",props);
    const [images, setImages] = useState({}); 
    const [imagesReadyCnt, setImagesReadyCnt] = useState(0);  // counter of preloaded images
    const importedImages = {};
    useEffect(() => {
        let i = 0;
        props.data.forEach(item => {
          console.log(item);
            const keyz = item.imageName.split('/').pop();
            importedImages[keyz] = item.imageName; // name of file will be a key, path to file will be a value
            const img = new Image();
            img.onload = () => {
              i++;
              setImagesReadyCnt(i); // increase counter when image is loaded
                };
            img.src = item.imageName;
            });
        setImages(importedImages); 
    }, [props.data]);

    const Del = (value) => {
      const params = {
        Bucket: 'instagram4alva',
        Key: value
      };
  
      // Call deleteObject method of S3
      s3.deleteObject(params, (err, data) => {
        if (err) {
          console.error('Error deleting object:', err);
          // Handle error (e.g., display error message)
        } else {
          console.log('Object deleted successfully:', data);
          // Handle successful deletion (e.g., update state)
        }
      });
    }

    const DelTemp = async (value, where) => {
      props.data.some(item => {
        if(item.imageName === value) {
          console.log("Delete", typeof item.uid, where);
          deleteData(where, item.uid);
        }
      });
    }

    if(Object.keys(images).length == 0) return <h2>No data found!</h2>;
    else if (Object.keys(images).length !== imagesReadyCnt || imagesReadyCnt < 1) { 
        console.log(Object.keys(images).length, imagesReadyCnt)
        return  <h2>Loading ...</h2>;
      }

      const Ok = async (value, where) => {
        var cnt1 = 0;
        fetchData('Images',(err, items) => {
          items.find(item => {
            if(item.imageName === value) {
              const imageData = {
                imageId: item.imageId,
                imageName: value,
                noCount: item.noCount-1
              }
              putData("Images", imageData);
            }
            })
          })
        props.data.some(item => {
          if(item.imageName === value) {
            const userImageData = {
              uid: item.uid,
              email: email,
              imageId: item.imageId,
              imageName: item.imageName,
              display: false
            }
            putData(where, userImageData);
            delete item.uid;
            delete item.imageId;
            delete item.imageName;
            delete item.display;
            delete item.noCount;
            props.func(value, userImageData);
            if(props.where === "UserImage"){
              cnt1 = item.noCount - 1;
              const imageData = {
                imageId: item.imageId,
                imageName: item.imageName,
                noCount: cnt1
              }
              putData("Images", imageData);
            }
          }
        })
      }
    return(<div>
    {Object.entries(images).map(([key,value], i) => {
      console.log(key, value); // Logging value here
      return (
      <div class="cont" style={{width: 18+'rem'}} key={key}>
        <div class="m2 card">
          <h5 class="card-title">Posts</h5>
          <div class = "container">
            <img src={value} alt={`Image ${i}`}/>
          </div>
          {(props.where === "UserImage")?
          <div id = "but">
            <button onClick = {() => Ok(value, props.where)}>Restore</button>
            <button onClick = {() => DelTemp(value, props.where)}>Delete</button>
            <button onClick = {() => Del(key)}>Delete Post Permanently?</button>
          </div>:<button id = "but" onClick = {() => Ok(value, props.where)}>Unlike</button>}
        </div>
      </div>
      );
    })}
  </div>
    );
}

export default Block;