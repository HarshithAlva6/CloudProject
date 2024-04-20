import React, {useState, useEffect} from "react";
import {fetchData, putData} from "../login/fetch";
import {BUCKETS_REST_API_URL} from './AxiosList';
import Heart from "react-animated-heart";
import "../App.css";

const Posts = (props) => {
    const [images, setImages] = useState({}); 
    const [imagesReadyCnt, setImagesReadyCnt] = useState(0);  // counter of preloaded images
    const [myStyle, setMyStyle] = useState({});
    const [likedPosts, setLikedPosts] = useState([]);
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
                console.log(ide, img.src);
              setMyStyle(prevState => ({
                ...prevState,
                [ide.imageId]: !prevState[ide.imageId]
              }))
              console.log(myStyle); 
              return;         
            }});   
            props.likeId.find(ide => {
              if((ide.imageName === img.src) && ide.display) {
                console.log(ide, img.src);
                if (likedPosts.includes(ide.imageId)) {
                  setLikedPosts(likedPosts.filter(id => id !== ide.imageId));
                } else {
                  setLikedPosts([...likedPosts, ide.imageId]);
                }
              return;         
            }});         
          })
        setImages(importedImages); 
    }, [props]);
    if (Object.keys(images).length !== imagesReadyCnt || imagesReadyCnt < 1) {  
        return  "Loading ...";
      }
    const notOk = async (id, value) => {
      var cnt2 = 0;
      fetchData('Images',(err, items) => {
        items.find(item => {
          (item.imageId === id) ? cnt2 = item.noCount + 1:cnt2 = 1;
          })
          const userData = {
            imageId: id,
            display: true,
            imageName: value,
            noCount: cnt2
          }
          setMyStyle(prevState => ({
            ...myStyle,
            [id]: !prevState[id]
          }))
          props.func(id, value);
          console.log(myStyle);
          putData('Images' , userData);
      })
    }

    const handleLike = (postId, value) => {
      console.log(postId);
      var cnt2 = 0;
      fetchData('LikeImages',(err, items) => {
        items.find(item => {
          (item.imageId === postId) ? cnt2 = item.noCount + 1:cnt2 = 1;
          })
          const userData = {
            imageId: postId,
            display: true,
            imageName: value,
            noCount: cnt2
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
    console.log(myStyle);
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