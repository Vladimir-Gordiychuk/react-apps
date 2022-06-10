import './ImageList.css';

import React from 'react';
import ImageCard from './ImageCard';

const ImageList = (props) => {

    var images = props.items.map(item => {
        return <ImageCard key={item.id} item={item}/>
    })

    return (
        <div className="image-list">
            {images}
        </div>
        );

};

export default ImageList;