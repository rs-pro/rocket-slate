import './Home.css'

import React from 'react'
import {
  RocketEditor,
  RocketContent,
  RocketToolbar
} from 'rocket-slate'


const Home = ({ title, version }) => {
  return (
    <div className='Home'>
      <div className='Home__Header'>
        <h1>{title}</h1>
        <p>A rich text editor based on SlateJS</p>
      </div>

      <Version version={version} />

      <RocketEditor>
        <RocketToolbar />
        <RocketContent />
      </RocketEditor>

      <div className='Home__Info'>
        <p>
          You had a problem?!
          Report click <a
            href="https://github.com/rs-pro/rocket-slate/issues/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>.
        </p>
      </div>
    </div>
  )
}

export default Home
