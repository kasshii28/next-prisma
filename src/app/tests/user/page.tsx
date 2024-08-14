'use client'

import axios, { AxiosError } from 'axios';

export default function UserTestPage() {
  const getUserData = async () => {
    try{
      const res = await axios.get('/api/user');
      console.log('res', res);
      console.log('res.data', res.data)
    } catch (err) {
      if(axios.isAxiosError(err)) {
        console.error('AxiosError', err);
      } else {
        console.error('NotAxiosError', err);
      }
    }
  };

  return(
    <div>
      TestUser
      <button onClick={getUserData}>GetUser</button>
    </div>
  )
}