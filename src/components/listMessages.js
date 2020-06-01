import { apiServices } from '../services';
import { messenger } from '../data';

const listMessages = document.querySelector('.listMessages');
const innerItem = (message, picture) => {
  return `<span class='listMessagesItemText'>${message}</span>
  ${picture ? `<img src="${picture}"/>` : ''}
      <button class='edit' data-action='edit'>Edit</button>
      <button class='delete' data-action='delete'>Delete</button>`;
};

const createItem = ({ message, id, picture = '' }) => {
  return `
      <li data-id='${id}'>
      ${innerItem(message, picture)}
      </li>
      `;
};

const deleteItem = id => {
  messenger.items = messenger.items.filter(item => item.id !== id);
};

const handleClick = e => {
  if (e.target.dataset.action === 'delete') {
    const id = e.target.closest('li[data-id]').dataset.id;
    console.log(id);
    deleteItem(id);
    createListItem(messenger.items);
    apiServices.deleteMessage(id);
  }
  if (e.target.dataset.action === 'edit') {
    const dataId = e.target.closest('li[data-id]');
    const id = dataId.dataset.id;
    const messageAds = messenger.items.find(item => item.id === id);
    const innerMarkup = `<input class = 'inputElement' value='${messageAds.message}' type='text'/>
      <button data-action='save'>Save</button>`;
    dataId.innerHTML = innerMarkup;
    const saveNewData = () => {
      const message = document.querySelector('.inputElement').value;
      console.log(message);
      document
        .querySelector('[data-action="save"]')
        .removeEventListener('click', saveNewData);
      dataId.innerHTML = innerItem(message);
      messageAds.message = message;
      console.log(messenger.items);
      apiServices.editMessage(id, { message });
      console.log({ message });
    };
    document
      .querySelector('[data-action="save"]')
      .addEventListener('click', saveNewData);
    console.log(dataId);
  }
};

const createListItem = messages => {
  const markup = messages.reduce((acc, message) => {
    return (acc += createItem(message));
  }, '');
  listMessages.innerHTML = markup;
};

export const pastMessage = message => {
  listMessages.insertAdjacentHTML('beforeend', createItem(message));
  console.log(createItem(message));
};

const getListMessages = () => {
  apiServices.getMessage().then(response => {
    createListItem(response);
    // console.log(response);
    messenger.items = [...response];
    listMessages.addEventListener('click', handleClick);
  });
};

export default getListMessages;
