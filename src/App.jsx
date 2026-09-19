import { useState, useEffect, useCallback } from 'react'
import './App.css'

import { Searchbar } from './components/Searchbar/Searchbar'
import { fetchImages } from './api';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Loader } from './components/Loader/Loader';
import { Button } from './components/Button/Button';
import { Modal } from './components/Modal/Modal';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    setLoading(true);

    fetchImages(query, page).then(res => {
      if (page === 1) {
        setImages(res.hits);

      } else {
        setImages(prev => [...prev, ...res.hits]);
      }

    }).finally(() => setLoading(false));
  }, [query, page])

  const handleSearch = (text) => {
    setQuery(text);
    setPage(1);
  }


  // const handleMore = () => {
  // setPage(prev => prev + 1);
  // }

  const handleMore = useCallback(() => setPage(prev => prev + 1), [])
  const openModal = (url) => {
    setSelectedImage(url)
  }

  const closeModal = () => {
    setSelectedImage(null);
  }

  console.log(images);

  return <>
    <Searchbar handleSearch={handleSearch} />
    {loading && <Loader />}
    <ImageGallery images={images} openModal={openModal} />
    {images.length > 0 && <Button handleMore={handleMore} />}
    {selectedImage && <Modal images={selectedImage} closeModal={closeModal} />}
  </>
}

export default App
