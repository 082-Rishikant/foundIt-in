import { useState } from "react";
import Itemcontext from "./Itemcontext";

function Itemstates(props) {
  // const host="http://localhost:5000";
  const host="https://foundit-in.herokuapp.com";
  
  const itemsinitially = [];
  const [items, setItems] = useState(itemsinitially);
  const [item, setItem] = useState(itemsinitially);
  const [userData, setUser] = useState(itemsinitially);
  const [allusers, setAllusers] = useState(itemsinitially);
  const [allitems, setAllitems] = useState(itemsinitially);
  const [uploader, setUploader] = useState(itemsinitially);

  const [isAdded, setisAdded] = useState(false);

  // 1. ******** Fetch all items using fetch API *********
  const fetchAllItems = async () => {
    // Method-1   ****API call****
    const response = await fetch(`${host}/api/item/fetchitems`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': localStorage.getItem('auth_token')
      }
    });
    const json = await response.json();
    if(json.success)  setItems(json.items_list);
    return json;
  }

  // 2. ******** Add A Item ********
  const addItem = async (data) => {
    setisAdded(false);
    const response = await fetch(`${host}/api/item/uploaditem`, {
      method: 'POST',
      headers: {
        'auth_token': localStorage.getItem('auth_token')
      },
      body: data
    });
    const json = await response.json();
    if (json.success) {
      setisAdded(true);
      setItems(items.concat(json.savedItem));
      document.getElementById('modalDismiss2').click();
    }
    else {
      alert(json.message);
    }
    return json.success;
  }

  // 3. ******** Delete A Item ********
  const deleteItem = async (id) => {
    const response = await fetch(`${host}/api/item/deleteItem/${id}`, {
      method: 'DELETE',
      headers: {
        'auth_token': localStorage.getItem('auth_token'),
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    if (!json.success) {
      alert(json.message);
    } else {
      const newItems = items.filter((e) => { return e._id !== id });
      setItems(newItems);
    }

    return json.success;
  }

  // 4. ******** Edit a Item ********
  const editItem = async (data, id) => {
    const response = await fetch(`${host}/api/item/updateItem/${id}`, {
      method: 'PUT',
      headers: {
        'auth_token': localStorage.getItem('auth_token')
      },
      body: data
    });
    const json = await response.json();
    if (json.success) {
      const item = json.item;
      let newItems = JSON.parse(JSON.stringify(items));
      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        if (element._id === id) {
          newItems[index].name = item.name;
          newItems[index].description = item.description;
          newItems[index].type = item.type;
          newItems[index].date = item.date;
          newItems[index].place = item.place;
          newItems[index].image_name = item.image_name;
          break;
        }
      }
      setItems(newItems);
      return json.success;
    } else {
      alert(json.message);
      return json.success;
    }
  }

  // 5. ********clear the Items ********
  const clearItems = () => {
    setItems(itemsinitially);
    setUser(itemsinitially);
    setAllusers(itemsinitially);
    setUploader(itemsinitially);
    setAllitems(itemsinitially);
  }

  // 6. ******** Fetch a item using fetch API *********
  const getAItem = async (id) => {
    // Method-1   ****API call****
    const response = await fetch(`${host}/api/item/getAItem/${id}`, {
      method: 'GET',
      headers: {
        'auth_token': localStorage.getItem('auth_token')
      }
    });
    const json = await response.json();
    if(json.success)  setItem(json.item);
    return json;
  }

  // 6. ****** Get All items || ADMIN Access ONLY ********
  const getAllItems=async()=>{
    const response=await fetch(`${host}/api/item/getAllItems`, {
      method:'GET',
      headers:{
        'auth_token':localStorage.getItem('auth_token')
      }
    });
    const json=await response.json();
    if(json.success)  setAllitems(json.allitems);
    return json;
  }

  // 1. ******** Get Loggedin User details ********
  const getUser = async () => {
    // API Call
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': localStorage.getItem('auth_token')
      }
    });
    const json = await response.json();
    setUser(json.user_data);
    return json;
  }

  // 2. ******** Get User details with Id ********(Login Required)
  const getUserById=async (id)=>{
    const response=await fetch(`${host}/api/auth/getUserById/${id}`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth_token':localStorage.getItem('auth_token')
      }
    });
    const json=await response.json();
    setUploader(json.uploader);
    return json;
  }

  //3. ****** Get All user || ADMIN Access ONLY ********
  const getAllUsers=async()=>{
    const response=await fetch(`${host}/api/auth/getAllUsers`, {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth_token':localStorage.getItem('auth_token')
      }
    });
    const json=await response.json();
    setAllusers(json.users);
    return json;
  }
  
  //4. ****** Block a user || ADMIN Access ONLY ********
  const blockAUser=async(id)=>{
    const response=await fetch(`${host}/api/auth/blockAUser/${id}`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth_token':localStorage.getItem('auth_token')
      }
    });
    const json=await response.json();
    return json;
  }

  return (
    <Itemcontext.Provider value={{getUserById, uploader, clearItems, isAdded, items, fetchAllItems, addItem, deleteItem, editItem, getUser, userData, allusers, getAllUsers, blockAUser, getAllItems, allitems, item, getAItem}}>
      {props.children}
    </Itemcontext.Provider>
  )
}

export default Itemstates
