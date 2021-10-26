import { useEffect, useRef, useState, Fragment } from 'react';
import './ImageSelect.css';

const ImageSelect = ({ buttonText = 'Upload Image', preview = false }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const onImageSelectClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const onImageRemoveClick = (event) => {
    event.preventDefault();
    setImage(null);
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.substring(0, 5) === 'image') {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  const ImageSelectButton = ({ buttonText = 'Upload Image' }) => (
    <button className="image-select__btn" onClick={onImageSelectClick}>
      {buttonText}
    </button>
  );

  const ImagePreview = ({ imgSrc }) => (
    <Fragment>
      <button className="image-select_remove" onClick={onImageRemoveClick}>
        X
      </button>
      <img
        className="image-select__img"
        src={imgSrc}
        width="50%"
        height="auto"
        alt="selected-img"
        onClick={onImageSelectClick}
      />
    </Fragment>
  );

  const InputImage = () => (
    <input
      ref={fileInputRef}
      type="file"
      style={{ display: 'none' }}
      accept={'image/*'}
      onChange={onImageChange}
    ></input>
  );

  const ShowImage = () =>
    imagePreview && preview ? <ImagePreview imgSrc={imagePreview} /> : <ImageSelectButton buttonText={buttonText} />;

  const ImageUI = () => (
    <div className="container__image-select">
      <ShowImage />
      <InputImage />
    </div>
  );

  return { image, imagePreview, ImageUI };
};

export default ImageSelect;
