import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

// export const ImageGalleryItem = ({ imgId, image, tags, onImgClick }) => {
//   return (
//     <li className={css.item}>
//       <img
//         src={image}
//         alt={tags}
//         className={css.img}
//         onClick={() => onImgClick(imgId)}
//       />
//     </li>
//   );
// };

// ImageGalleryItem.propTypes = {
//   imgId: PropTypes.number.isRequired,
//   image: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   onClick: PropTypes.func,
// };

export class ImageGalleryItem extends Component {
  state = {
    statusModal: false,
  };

  toggleModal = () => {
    this.setState(({ statusModal }) => ({
      statusModal: !statusModal,
    }));
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;
    return (
      <>
        <li className={css.item}>
          <img
            className={css.img}
            src={webformatURL}
            alt=""
            onClick={this.toggleModal}
          ></img>
        </li>
        {this.state.statusModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal}>
            <img src={largeImageURL} alt="largeImage" />
          </Modal>
        )}
      </>
    );
  }
}
