import TextEditor from "./containers/TextEditor";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import DocsContainer from "./containers/DocsContainer";
import Header from "./containers/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/documents/:id" element={<TextEditor />} />
        <Route path="/" element={<DocsContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
