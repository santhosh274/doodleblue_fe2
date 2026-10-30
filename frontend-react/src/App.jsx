import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [user, setUser] = useState([])
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let ignore = false
    
    const load = async () => {
      setLoader(true)
      setError("")
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        console.log(res, "Response fetched")
        
        if (res.ok || res.status === 200) {
          const data = await res.json()
          if (!ignore) {
            setUser(data)
          }
        } else {
          throw new Error(`Status ${res.status}`)
        } 
      } catch (err) {
        throw new Error(`Status ${err.status}`) 
      } finally {
        if(!ignore) setLoader(false) 
      }
    }
    
    load()
    
    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      {loader ? (
        <>Page is loading</>): (
        <>
          <header className='head'>User List</header>
          {user?.map((elem, i) => (
            <div key={i} className='container'> 
            <p id='data-id'>ID : {elem.id}</p>
              <center id='name'>Name: <b>{elem.name}</b></center>
              <hr />
              <center id='data'>Username: <b>{elem.username}</b></center>
              <center id='data'>Address: <b>{elem.address.street},{elem.address.suite},{elem.address.city}</b></center>
              <center id='data'>Email: <a href={`mailto:${elem.email}`} >{elem.email}</a></center>
              <center id='data'>Website: <a href={`https://${elem.website}`} >{elem.website}</a></center>
              <center id='data'>Phone: {elem.phone}</center>
              <center id='data'>Company: <b>{elem.company.name}</b><br />{elem.company.catchPhrase}<br /> {elem.company.bs}</center>

            </div>
          ))}
        </>
      )}
    </>
  )
}

export default App