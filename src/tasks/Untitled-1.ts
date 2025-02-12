const checkIfCalledAsync = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'Called asynchronously' });
    }, 2000);
  });
};

checkIfCalledAsync()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
