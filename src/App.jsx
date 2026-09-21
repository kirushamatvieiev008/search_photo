import { useState, useEffect, useCallback, useReducer } from 'react';
import './App.css';

import { Searchbar } from './components/Searchbar/Searchbar';
import { fetchImages } from './api';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Loader } from './components/Loader/Loader';
import { Button } from './components/Button/Button';
import { Modal } from './components/Modal/Modal';

const initialState = {
  query: '',
  images: [],
  loading: false,
  page: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
        page: 1,
        images: [],
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_IMAGES':
      return {
        ...state,
        images: action.payload,
      };

    case 'ADD_IMAGES':
      return {
        ...state,
        images: [...state.images, ...action.payload],
      };

    case 'INCREMENT_PAGE':
      return {
        ...state,
        page: state.page + 1,
      };

    default:
      return state;
  }
}

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.query) {
      return;
    }

    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });

    fetchImages(state.query, state.page)
      .then(res => {
        if (state.page === 1) {
          dispatch({
            type: 'SET_IMAGES',
            payload: res.hits,
          });
        } else {
          dispatch({
            type: 'ADD_IMAGES',
            payload: res.hits,
          });
        }
      })
      .finally(() => {
        dispatch({
          type: 'SET_LOADING',
          payload: false,
        });
      });
  }, [state.query, state.page]);

  const handleSearch = text => {
    dispatch({
      type: 'SET_QUERY',
      payload: text,
    });
  };

  const handleMore = useCallback(() => {
    dispatch({
      type: 'INCREMENT_PAGE',
    });
  }, []);

  const openModal = url => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Searchbar handleSearch={handleSearch} />

      {state.loading && <Loader />}

      <ImageGallery
        images={state.images}
        openModal={openModal}
      />

      {state.images.length > 0 && (
        <Button handleMore={handleMore} />
      )}

      {selectedImage && (
        <Modal
          images={selectedImage}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default App;