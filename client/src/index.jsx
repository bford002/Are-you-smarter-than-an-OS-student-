import React from 'react';
import { App } from './Components/App.jsx';
import { createRoot } from 'react-dom/client';

const appElement = createRoot( document.getElementById('app') );

appElement.render( <App /> );
