import './ImageSlider.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ImageSliderProps {
  images: string[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const prevImage = (selectedImageIndex - 1 + images.length) % images.length;
  const nextImage = (selectedImageIndex + 1) % images.length;
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };
  return (
    <div className="image-slider">
      <div className="image-slider__main-image-container">
        <img src={images[selectedImageIndex]} alt={`Image ${selectedImageIndex}`} />
      </div>
      <div className="image-slider__preview-container">
        <div className="arrow" onClick={() => handleImageClick(prevImage)}>
          <FontAwesomeIcon icon="angle-left" />
        </div>
        <div className="image-slider__previews">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className={index === selectedImageIndex ? 'selected' : ''}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
        <div className="arrow" onClick={() => handleImageClick(nextImage)}>
          <FontAwesomeIcon icon="angle-right" />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
