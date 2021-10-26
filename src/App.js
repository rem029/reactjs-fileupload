import { useEffect, useRef, useState } from 'react';

function App() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const onButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.substring(0, 5) === 'image') {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    console.log('image update', image);

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

  return (
    <form>
      <button onClick={onButtonClick}>Add Images</button>
      {imagePreview && <img src={imagePreview} width="50%" height="auto" />}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        accept={'image/*'}
        onChange={onFileChange}
      ></input>
    </form>
  );
}

export default App;
