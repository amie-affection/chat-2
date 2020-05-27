import axios from 'axios';

// const convertData = data => {
// //   console.log(data);
//   const result = [];
//   for (const element in data) {
//     // console.log(element);
//     // console.log(data[element]);
//     result.push({ id: element, ...data[element] });
//   }
//   return result;
// };

// const createMessage = content => {
//   try {
//     axios.post(
//       'https://project-chat-79c90.firebaseio.com/messenger.json',
//       content,
//     );
//   } catch (error) {
//     console.log('Error!');
//   }
// };

// const getMessage = async () => {
//   try {
//     const result = await axios.get(
//       'https://project-chat-79c90.firebaseio.com/messenger.json',
//     );
//     return convertData(result.data);
//   } catch (error) {
//     console.log('Error!');
//   }
// };

// const editMessage = (id, content) => {
//   axios.patch(
//     `https://project-chat-79c90.firebaseio.com/messenger/${id}.json`,
//     { content },
//   );
// };

// const deleteMessage = id => {
//   axios.delete(
//     `https://project-chat-79c90.firebaseio.com/messenger/${id}.json`,
//   );
// };

// export { createMessage, getMessage, editMessage, deleteMessage };

const convertData = (data) => {
    //   console.log(data);
    const result = [];
    for (const elementId in data) {
        // console.log(element);
        // console.log(data[element]);
        result.push({ id: elementId, ...data[elementId] });
    }
    return result;
};
    
export const apiServices = {

  createMessage(content) {
    try {
      return axios.post(
        'https://project-chat-79c90.firebaseio.com/messenger.json',
        content,
      );
    } catch (error) {
      console.log('Error!');
    }
  },

  async getMessage() {
    try {
      const result = await axios.get(
        'https://project-chat-79c90.firebaseio.com/messenger.json',
      );
      return convertData(result.data);
    } catch (error) {
      console.log('Error!');
    }
  },

  editMessage(id, content) {
    axios.patch(
      `https://project-chat-79c90.firebaseio.com/messenger/${id}.json`,
      { content },
    );
  },

  deleteMessage(id) {
    axios.delete(
      `https://project-chat-79c90.firebaseio.com/messenger/${id}.json`,
    );
  },
};
