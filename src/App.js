import { Fragment, useEffect } from 'react';
import ImageSelect from './ImageSelect';

function App() {
  const { imageSchema, images, imageDeleteByIndex, imageDeleteAll, ImageUI } = ImageSelect({
    buttonSelectText: <h1>Add Image(s)</h1>,
    multipleFiles: true,
  });
  useEffect(() => {
    console.log('@APP IMAGES', images);
  }, [images]);

  return (
    <Fragment>
      <ImageUI />

      <button
        onClick={(e) => {
          e.preventDefault();
          imageDeleteAll();
        }}
      >
        Delete all
      </button>

      {images.map((image = imageSchema, index) => (
        <Fragment>
          {image.isReading ? (
            <h2>loading...</h2>
          ) : (
            <img
              src={image.preview}
              style={{ width: '20%', height: 'auto', display: 'block' }}
              onClick={() => imageDeleteByIndex(index)}
              alt={`images_preview${index}`}
            />
          )}

          <h2>{index}</h2>
        </Fragment>
      ))}
    </Fragment>
  );
}

export default App;
