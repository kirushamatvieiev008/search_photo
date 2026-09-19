export const ImageGalleryItem = ({image, openModal}) => {
    return <li><img onClick={() => openModal(image.largeImageURL)} src={image.largeImageURL} alt={image.tags} /></li>
}