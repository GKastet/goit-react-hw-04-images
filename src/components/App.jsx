import { useState, useEffect } from 'react';
import { requestImages } from '../Api/api';
import { ContainerStyled } from './ContainerStyled';
import SearchBar from './Searchbar/Searchbar';
import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

export default function App() {
  const [pictureName, setPictureName] = useState('');
  const [responcedImages, setResponcedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPictures, setTotalPictures] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    modalData: null,
  });

  useEffect(() => {
    if (!pictureName) {
      return;
    }
    async function fetchRender() {
      try {
        setIsLoading(true);
        const responcedImages = await requestImages(pictureName, page);
        setTotalPictures(responcedImages.totalHits);
        setResponcedImages(prevState => {
          return page === 1
            ? responcedImages.hits
            : [...prevState, ...responcedImages.hits];
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRender();
  }, [pictureName, page]);

  const fetchLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onSubmit = pictureName => {
    setPictureName(pictureName);
    setPage(1);
  };
  const onOpenModal = data => {
    setModal({ isOpen: true, modalData: data });
  };

  const onCloseModal = () => setModal({ isOpen: false, modalData: null });

  return (
    <>
      <ContainerStyled>
        <SearchBar onSubmit={onSubmit} />
        {isLoading && <Loader />}
        {error && <>Oops... Error: {error}</>}
        {responcedImages?.length > 0 && (
          <ImageGallery
            responcedImages={responcedImages}
            onOpenModal={onOpenModal}
          />
        )}

        {responcedImages.length > 0 &&
          responcedImages.length < totalPictures && (
            <Button fetchLoadMore={fetchLoadMore} />
          )}
        {modal.isOpen && (
          <Modal onCloseModal={onCloseModal} modalData={modal.modalData} />
        )}
      </ContainerStyled>
    </>
  );
}
