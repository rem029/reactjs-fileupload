import { useEffect, useRef, useState } from 'react';

const ImageSelect = ({ buttonSelectText = 'Image', multipleFiles = false, className = '' }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef();

  const onImageSelectClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const onImageRemoveClick = (id) => {
    console.log('@image remove id', id);

    setImages((currentImages) => currentImages.filter((image, index) => index !== id));
  };

  const onImageSelect = (event) => {
    let files;
    let fileIndex;

    files = event.target.files;

    for (fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const currentFile = files[fileIndex];
      if (currentFile && currentFile.type.substring(0, 5) === 'image') {
        setImages((currentFiles) => [...currentFiles, currentFile]);
      }
    }
  };

  useEffect(() => {
    setImagePreviews([]);
    if (images.length > 0) {
      console.log('images update', images);
      images.map((image, index) => {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreviews((currentPreviews) => [...currentPreviews, reader.result]);
        };
        reader.readAsDataURL(image);
      });
    }
  }, [images]);

  const ImageSelectButton = () => <button onClick={onImageSelectClick}>{buttonSelectText}</button>;

  const InputImage = () => (
    <input
      ref={fileInputRef}
      type="file"
      multiple={multipleFiles}
      style={{ display: 'none' }}
      accept={'image/*'}
      onChange={onImageSelect}
    ></input>
  );

  const ImageUI = () => (
    <div className={className}>
      <ImageSelectButton />
      <InputImage />
    </div>
  );

  return { images, imagePreviews, ImageUI, onImageRemoveClick };
};

export default ImageSelect;
