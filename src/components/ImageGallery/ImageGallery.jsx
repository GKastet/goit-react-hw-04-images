import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUl } from './ImageGalleryStyled';

function ImageGallery({ responcedImages, onOpenModal }) {
  return (
    <ImageGalleryUl>
      {responcedImages.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onOpenModal={onOpenModal}
          />
        );
      })}
    </ImageGalleryUl>
  );
}

ImageGallery.propTypes = {
  responcedImages: PropTypes.array,
  onOpenModal: PropTypes.func,
};

export default ImageGallery;
