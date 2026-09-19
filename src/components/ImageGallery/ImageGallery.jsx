import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem"
import './ImageGallery.css';

export const ImageGallery = ({ images, openModal }) => {
    return <ul className="gallery">
        {images.map(el => {
            return <ImageGalleryItem key={el.id} image={el} openModal={openModal}/>
        })}
    </ul>
}