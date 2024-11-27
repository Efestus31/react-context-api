
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Posts from './pages/Posts'
import FormField from './pages/FormField'
import GlobalContext, { GlobalProvider } from './contexts/GlobalContext'
import DefaultLayout from './pages/DefaultLayout'
import PostPage from './pages/PostPage'
import NotFound from './pages/NotFound'



function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/posts" element={<Posts />} />
              <Route path='/form' element={<FormField />} />
              <Route path="/posts/:slug" element={<PostPage />} />
              <Route path='*' element={<NotFound />} />

            </Route>
          </Routes>
        </BrowserRouter >
      </GlobalProvider>
    </>
  )
}

export default App
