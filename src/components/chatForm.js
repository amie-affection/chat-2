import { apiServices } from '../services';
import { pastMessage } from './listMessages';

const chatForm = () => {
  const chatForm = document.querySelector('.js-form');

  const createNewMessage = e => {
    e.preventDefault();
    const messageContent = chatForm.elements.chatFormTextaria.value;
    apiServices
      .createMessage({ message: messageContent })
      .then(response =>
        pastMessage({ id: response.data.name, message: messageContent }),
      );
    // pastMessage(messageContent);
    chatForm.reset();
  };

  chatForm.addEventListener('submit', createNewMessage);
};

export default chatForm;
