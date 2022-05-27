import TextEditor from "./containers/TextEditor";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
