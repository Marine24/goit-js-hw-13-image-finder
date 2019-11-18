import '../css/style.css';
import apiService from './apiService.js';
import galleryItem from '../template/galleryItem.hbs';
import refs from './refs.js';

const { API_KEY, API_URL } = apiService;
let page = 1;
let perPage = 12;

const { searchForm, serchInput, ul, sectionGallery } = refs;

const getListByName = async name => {
  const result = await fetch(
    `${API_URL}?image_type=photo&orientation=horizontal&q=${name}&page=${page}&per_page=${perPage}&key=${API_KEY}`,
  );
  return await result.json();
};

const createList = photoList => {
  return photoList.reduce((acc, photo) => {
    return acc + galleryItem(photo);
  }, '');
};

const addBtnMore = () => {
  const btn = ` <button class="btn-more">
                    Load more
                </button>`;
  sectionGallery.insertAdjacentHTML('beforeend', btn);
};

const renderList = async () => {
  page = 1;
  const { hits } = await getListByName(serchInput.value);
  ul.innerHTML = createList(hits);
};

const loadeMore = async () => {
  page += 1;
  const { hits } = await getListByName(serchInput.value);
  ul.insertAdjacentHTML('beforeend', createList(hits));
  window.scrollTo(0, document.body.scrollHeight);
  window.scrollTo({
    behavior: 'smooth',
  });
};

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  renderList();
  addBtnMore();
});

sectionGallery.addEventListener('click', async e => {
  loadeMore();
});
