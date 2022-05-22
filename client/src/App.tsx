import TextEditor from "./containers/TextEditor";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import DocsContainer from "./containers/DocsContainer";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to={`/documents/${uuidv4()}`} />} />
        <Route path="/documents/:id" element={<TextEditor />} /> */}
        <Route path="/" element={<DocsContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
