import { useEffect, useState } from "react";

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
const requestOptions = {
  method: 'GET',
  headers: myHeaders,
};


export default function() {
  const [data, setData] = useState('loading')

  useEffect(() => {

    fetch('http://localhost:3000/api/users', { ...requestOptions })
      .then(res => {
        return res.json();
      }).then(res => {
        setData(res.data.id)
        return res;
      })

  }, [])

  return (
    <div>
      <div>{`Welcome ${JSON.stringify(data)}`}</div>
      <a href = "http://localhost:3000/playlist">Go to your playlists</a>
    </div>
  )
}
