import axios from 'axios';

export async function searchImages(searchWord, page) {
  const KEY = '33701838-08d3e3f94ecab37407d30d12a';
  const BASE_URL = `https://pixabay.com/api/?q=${searchWord}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios.get(BASE_URL);

  return response;
}