import TextEditor from "./containers/TextEditor";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import DocsContainer from "./containers/DocsContainer";
import Header from "./containers/Header";
import { useEffect, useRef, useState } from "react";
import useRequest from "./hooks/use-request";
import Signup from "./containers/Signup";

interface UserDocs {
  id: string;
  name: string;
  email: string;
  password: string;
}

function App() {
  const mountedRef = useRef(false);
  const navigate = useNavigate();
  const { status, sendRequest } = useRequest();
  const [currentUser, setCurrentUser] = useState<UserDocs>({id: '', name: '', email: '', password: ''})
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      sendRequest({
        apiRoute: '/api/users/currentUser',
        method: 'get',
        body: {},
        onSuccess: (data: UserDocs) => setCurrentUser(data),
        onError: ({ status }) => {
          if (status === 401) {
            navigate('/signup')
          }
        }
       });
    }
  }, [])
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/documents/:id" element={<TextEditor />} />
        <Route path="/" element={<DocsContainer />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
