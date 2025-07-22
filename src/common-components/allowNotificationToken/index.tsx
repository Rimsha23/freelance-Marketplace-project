import { useState, useEffect } from 'react';
import axios from 'axios';
import { messaging } from "../../firebase";
import { getToken } from "firebase/messaging";
const AllowNotification = () => {
  const [token, setToken] = useState <string | null>(null);
  const [tokenPosted, setTokenPosted] = useState(false);

  const fetchToken = async () => {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {    
          const fetchedToken = await getToken(messaging, {
            vapidKey:
              "BLgVhxwPPIjOFU-NbZ3yKSMyGg3PqPcSGOiXX3HpsigCdf6SJKCdBhlKDlYjm2hZlyMFa0ZPKhWgzm0n83io1eY",
          });
          console.log("Token Gen", fetchedToken);
          setToken(fetchedToken)
        } else if (permission === "denied") {
          alert("You denied for the notification");
        }
       
      }

  const postToken = async () => {
    try {
      if (token) {
        const response = await axios.post('https://gitlub.pythonanywhere.com/business/addtoken/', { token }); 
        console.log('Token posted:', response.data);
        setTokenPosted(true);
      } else {
        console.warn('Token is null. Make sure it\'s fetched before posting.');
      }
    } catch (error) {
      console.error('Error posting token:', error);
    }
  };
  useEffect(() => {
    if (!token) {
      fetchToken();
    }
  }, []);

  useEffect(() => {
    if (!tokenPosted) {
      postToken();
    }
  }, [!tokenPosted]);

  return (
    <></>
  );
};

export default AllowNotification;
