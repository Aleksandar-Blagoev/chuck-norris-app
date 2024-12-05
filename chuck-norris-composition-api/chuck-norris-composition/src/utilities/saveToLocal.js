const saveToLocalStorage = (option, obj) => {
  if(typeof option !== "string") {
    console.log("First argument must be from type String !");
  }

  localStorage.setItem(option, JSON.stringify(obj));
}

export default saveToLocalStorage
