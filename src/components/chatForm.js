import { apiServices } from '../services';
import { pastMessage } from './listMessages';
import { messenger } from '../data';

let pict = '';

const createbase = () => {
  console.log('111');
  const element = document.querySelector('.js-form').elements.fileFormInput;
  return new Promise(resolve => {
    const reader = new FileReader();
    console.log(reader);
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(element.files[0]);
  }).then(data => {
    (pict = data), console.log(pict);
  });
};

const chatForm = () => {
  const chatForm = document.querySelector('.js-form');
  console.log(chatForm);
  console.log(chatForm.elements);
  const createNewMessage = async e => {
    console.log('222');
    e.preventDefault();
    await createbase();
    const messageContent = chatForm.elements.chatFormTextaria.value;
    apiServices
      .createMessage({ message: messageContent, picture: pict })
      .then(response => {
        const message = {
          id: response.data.name,
          message: messageContent,
          picture: pict,
        };
        pastMessage(message);
        messenger.items = [...messenger.items, message];
        // console.log(messenger.items);
      });
    // pastMessage(messageContent);
    chatForm.reset();
  };

  chatForm.addEventListener('submit', createNewMessage);
};

export default chatForm;
