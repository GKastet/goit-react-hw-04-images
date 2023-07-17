import PropTypes from 'prop-types';

import { GalleryItemLi, ImgStyled } from './ImageGalleryItemStyled';

function ImageGalleryItem({
  id,
  tags,
  webformatURL,
  largeImageURL,
  onOpenModal,
}) {
  return (
    <GalleryItemLi key={id}>
      <ImgStyled
        src={webformatURL}
        alt={tags}
        onClick={() => {
          onOpenModal({ id, tags, largeImageURL });
        }}
      />
    </GalleryItemLi>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
