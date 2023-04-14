import { Component } from 'react';
import { searchImages } from './searchImages/searchImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Notify } from 'notiflix';

export class App extends Component {
  state = {
    searchWord: '',
    page: 1,
    totalHits: 0,
    imageCards: [],
    loading: false,
    showModal: false,
    selectedImgCard: undefined,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.searchWord !== prevState.searchWord ||
      this.state.page !== prevState.page
    ) {
      const { searchWord, page } = this.state;
      this.setState({ loading: true, totalHits: 0 });

      const response = searchImages(searchWord, page);
      response
        .then(response => {
          if (response.data.hits.length === 0) {
            this.setState({ loading: false });
            Notify.warning('The search has not given any results');
            return;
          }
          this.setState(() => ({
            imageCards: [...this.state.imageCards, ...response.data.hits],
            totalHits: response.data.totalHits,
          }));
          if (response.data.total === 0) {
            Notify.warning('Please try again');
          }
        })
        .catch(error => {
          Notify.failure('Something went wrong');
          this.setState({ loading: false });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  onSubmit = inputValue => {
    if (this.state.searchWord !== inputValue) {
      this.setState({ searchWord: inputValue, imageCards: [], page: 1 });
    }
  };

  onImgClick = imgId => {
    const imageCard = this.state.imageCards.find(
      imageCard => imageCard.id === imgId
    );

    this.setState({ selectedImgCard: imageCard, showModal: true });
  };

  onLoadBtnClick = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { imageCards, loading, totalHits, showModal, selectedImgCard, page } =
      this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />;
        {imageCards.length > 0 && (
          <ImageGallery
            imageCardsArray={imageCards}
            onImgClick={this.onImgClick}
          />
        )}
        {/* {showModal && (
          <Modal onClose={this.toggleModal} selectedImgCard={selectedImgCard} />
        )} */}
        {loading && <Loader />}
        {page * 12 <= totalHits && <Button onClick={this.onLoadBtnClick} />}
      </div>
    );
  }
}
