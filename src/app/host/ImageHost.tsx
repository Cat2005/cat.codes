import React from 'react';

interface ImageHostProps {
    imageUrl: string;
}

const ImageHost: React.FC<ImageHostProps> = ({ imageUrl }) => {
    return (
        <div>
            <img src={imageUrl} alt="Hosted" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
    );
};

export default ImageHost;