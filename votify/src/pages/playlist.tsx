import { useEffect, useState } from "react"

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
}

export default function() {
  const [data, setData] = useState('loading')
  const [click , setClick ] = useState(false)


  useEffect(() => {

    fetch('http://localhost:3000/api/playlists', { ...requestOptions })
      .then(res => res.json())
      .then(res => setData(res))

  }, [])


  interface Data {
    data: {
      items: {
        images: {
          url: string
        }[],
        name: string,
        tracks: {
          href: string,
          total: number,
        }[]
      }[]
    }
  }
  const createChildren = (data: Data) => {
    const items = data.data.items;

    return items.map((e, i) => (
      <div key={`unique${i}`} className="playlistChild">
        <div><img src={e.images[0].url} /></div>
        <div>{e.name}</div>
      </div>
    ));
  }

  console.log('playlist component', data)

  if (data === 'loading') {
    return (

      <div className='playlistContainer'>
        inside playlists
      </div>
    )
  } else {
    return (

      <div className='playlistContainer'>
        {createChildren(data as unknown as Data)}
      </div>
    )
  }
}

