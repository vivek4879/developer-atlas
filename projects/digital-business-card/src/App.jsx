
import './App.css'
import { ContactButton } from './components/ContactButton.jsx'
import { InfoSection } from './components/InfoSection.jsx'
import { Info } from './components/Info.jsx'
import { Footer } from './components/Footer.jsx'

import tintinProfilePic from './assets/tintin.png'

function App() {
  return (
      <div className='card'>
        <img src={tintinProfilePic} alt="Tintin's image with snowy"/>
          <Info/>
          <ContactButton/>
          <InfoSection/>
          <Footer/>
      </div>
  )

}

export default App
