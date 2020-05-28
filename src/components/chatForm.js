import { apiServices } from '../services';
import { pastMessage } from './listMessages';
import { messenger } from '../data';

const chatForm = () => {
  const chatForm = document.querySelector('.js-form');

  const createNewMessage = e => {
    e.preventDefault();
    const messageContent = chatForm.elements.chatFormTextaria.value;
    apiServices.createMessage({ message: messageContent }).then(response => {
      const message = { id: response.data.name, message: messageContent };
      pastMessage(message);
      messenger.items = [...messenger.items, message];
      console.log(messenger.items);
    });
    // pastMessage(messageContent);
    chatForm.reset();
  };

  chatForm.addEventListener('submit', createNewMessage);
};

export default chatForm;
