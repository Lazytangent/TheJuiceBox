import styles from './ImagePreview.module.css';

const ImagePreview = ({ image }) => {
  if (!image) return null;

  return (
    <div className={styles.container}>
      <img src={image} alt={image} />
    </div>
  );
};

export default ImagePreview;
