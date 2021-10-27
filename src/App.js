import { Fragment, useEffect } from 'react';
import ImageSelect from './ImageSelect';

function App() {
  const { images, imagePreviews, onImageRemoveClick, ImageUI } = ImageSelect({
    buttonSelectText: <h1>Add Image(s)</h1>,
    multipleFiles: true,
  });

  useEffect(() => {
    console.log('imagePreviews', imagePreviews);
  }, [imagePreviews]);

  useEffect(() => {
    console.log('images for upload', images);
  }, [images]);

  return (
    <Fragment>
      <ImageUI />
      {imagePreviews.map((imagePreview, index) => (
        <Fragment>
          <img
            src={imagePreview}
            style={{ width: '50%', height: 'auto' }}
            onClick={() => onImageRemoveClick(index)}
            alt={`images_preview${index}`}
          />
          <h2>{index}</h2>
        </Fragment>
      ))}
    </Fragment>
  );
}

export default App;
