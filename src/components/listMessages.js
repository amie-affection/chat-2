import axios from 'axios';
import { apiServices } from '../services';

const listMessages = document.querySelector('.listMessages');

const createItem = ({ message, id }) => {
  return `
      <li data-id='${id}'>
      ${message}
      </li>
      `;
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
  //   getMessage().then(data => console.log(data));
  apiServices.getMessage().then(response => createListItem(response));
};

export default getListMessages;
