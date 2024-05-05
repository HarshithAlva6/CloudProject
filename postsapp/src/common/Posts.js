import React, {useState, useEffect} from "react";
import {fetchData, putData} from "../login/fetch";
import {BUCKETS_REST_API_URL} from './AxiosList';
import Heart from "react-animated-heart";
import "../App.css";
import { v4 as uuidv4 } from 'uuid';

const Posts = (props) => {
    const [images, setImages] = useState({}); 
    const [imagesReadyCnt, setImagesReadyCnt] = useState(0);  // counter of preloaded images
    const [myStyle, setMyStyle] = useState({});
    const [likedPosts, setLikedPosts] = useState([]);
    const email = localStorage.getItem("email");
    useEffect(() => {
        const importedImages = {};
        let i = 0;
        props.data.forEach(item => {
            const img = new Image();
            img.onload = () => {
              i++;
              setImagesReadyCnt(i); // increase counter when image is loaded
                };
            importedImages[item.key] = BUCKETS_REST_API_URL+'/'+item.key;
            img.src = BUCKETS_REST_API_URL+'/'+item.key;
            props.id.find(ide => {
              if((ide.imageName === img.src) && ide.display) {
              setMyStyle(prevState => ({
                ...prevState,
                [ide.imageId]: !prevState[ide.imageId]
              }))
              return;         
            }});   
            props.likeId.forEach(ide => {
              if (ide.imageName === img.src && ide.display) {
                setLikedPosts(prevLikedPosts => {
                  if (prevLikedPosts.includes(ide.imageId)) {
                    console.log("In!2");
                    return prevLikedPosts.filter(id => id !== ide.imageId);
                  } else {
                    console.log("In!3");
                    return [...prevLikedPosts, ide.imageId];
                  }
                });
              }
            });       
          })
        setImages(importedImages); 
    }, [props]);
    if (Object.keys(images).length !== imagesReadyCnt || imagesReadyCnt < 1) {  
        return  <h2>Loading ...</h2>;
      }
    const notOk = async (id, value) => {
      var cnt2 = 0;
      const uuid = uuidv4();
      fetchData('Images',(err, items) => {
        items.find(item => {
          if(item.imageId === id) cnt2 = item.noCount + 1;
          })
          const imageData = {
            imageId: id,
            imageName: value,
            noCount: cnt2?cnt2:1
          }
          const userImageData = {
            uid: uuid,
            email: email,
            imageId: id,
            imageName: value,
            display: true
          }
          setMyStyle(prevState => ({
            ...myStyle,
            [id]: !prevState[id]
          }))
          props.func(id, value);
          console.log(myStyle);
          putData('Images' , imageData);
          putData('UserImage', userImageData);
      })
    }

    const handleLike = (postId, value) => {
      console.log(postId);
      const uuid = uuidv4();
      var cnt2=0;
      fetchData('LikeImages',(err, items) => {
        items.find(item => {
          (item.imageId === postId) ? cnt2 = item.noCount + 1:cnt2 = 1;
          })
      const userData = {
        uid: uuid,
        email: email,
        imageId: postId,
        imageName: value,
        display: true,
      }
      if (likedPosts.includes(postId)) {
        setLikedPosts(likedPosts.filter(id => id !== postId));
      } else {
        setLikedPosts([...likedPosts, postId]);
      }
      props.func(postId, value);
      console.log(myStyle);
      putData('LikeImages' , userData);
  })
};

    const isPostLiked = (postId) => {
      return likedPosts.includes(postId) || myStyle[postId];
    }
    console.log(myStyle, likedPosts);
    return(<div>
    {Object.values(images).map((value, i) => {
      return (
      <div class="cont" style={{width: 18+'rem'}}>
        <div class="m2 card">
          <h5 class="card-title">Posts</h5>
          <div class = "like-button-container">
          <Heart isClick={likedPosts.includes(i + (props.currentPage-1)*50)} onClick={() => handleLike(i, value)} />
          </div>
          <div class = "container" style={{
            opacity: myStyle[`${i += (props.currentPage-1)*50}`] ? 0.1 : 1}} key = {i}>
            <img src={value} />
          </div>
          <button disabled = {isPostLiked(i)} id = "but" onClick = {() => notOk(i, value)}>Is this Post not OK?</button>
        </div>
      </div>
      );
    })}
  </div>
    );
}

export default Posts;