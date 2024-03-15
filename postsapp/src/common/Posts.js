import React, {useState, useEffect} from "react";

const Posts = (props) => {
    console.log("Posts",props);
    const [images, setImages] = useState({}); 
    const [imagesReadyCnt, setImagesReadyCnt] = useState(0);  // counter of preloaded images
    const [myStyle, setMyStyle] = useState({});
    useEffect(() => {
        const importedImages = {};
        let i = 0;
        const r = require.context('../../src/images/instagram_data2/img2', true);
        props.data.forEach(item => {
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
    }, [props.currentPage]);
    if (Object.keys(images).length !== imagesReadyCnt || imagesReadyCnt < 1) {  
        return  "Loading ...";
      }
    const notOk = (id) => {
      console.log(id, "ID");
      setMyStyle(prevState => ({
        ...myStyle,
        [id]: !prevState[id]
      }))
      console.log(myStyle);
    }
    return(<div>
        {Object.values(images).map((value, i) => 
      <div class="cont" style={{width: 18+'rem'}}>
        <div class="m2 card">
          <h5 class="card-title">Posts</h5>
          <div class = "container" style={{
            opacity: myStyle[`${i += (props.currentPage-1)*50}`] ? 0.1 : 1}} key = {i}>
            <img src={value} />
          </div>
          <button id = "but" onClick = {() => notOk(i)}>Is this Post not OK?</button>
        </div>
      </div>
      )}
    </div>);
}

export default Posts;