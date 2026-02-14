import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import './index.css'

import Home from "./Home";
import useMouseWaves from "./usemousewaves";

export default function App() {
  useMouseWaves();
  return <Home />;
}

