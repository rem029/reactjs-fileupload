import { Fragment } from 'react';
import ImageSelect from './ImageSelect';

function App() {
  const { image, imagePreview, ImageUI } = ImageSelect({ buttonText: 'Upload Image', preview: false });

  
  return (
    <Fragment>
      <ImageUI />
      <img src={imagePreview} style={{ width: '100%', height: 'auto' }} />
    </Fragment>
  );
}

export default App;
