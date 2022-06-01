import TextEditor from "./containers/TextEditor";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DocsContainer from "./containers/DocsContainer";
import Header from "./containers/Header";
import { useEffect, useRef, useState } from "react";
import useRequest from "./hooks/use-request";
import Signup from "./containers/Signup";
import Skeleton from "react-loading-skeleton";

interface UserDocs {
  name: string;
  email: string;
  id: string;
}

function App() {
  const mountedRef = useRef(false);
  const [currentUser, setCurrentUser] = useState<UserDocs>({ name: '', email: '', id: '' })
  const { status, sendRequest } = useRequest();
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      sendRequest({
        apiRoute: '/api/users/currentUser',
        method: 'get',
        body: {},
        onSuccess(data: UserDocs) {
          setCurrentUser(data);
        }
       });
    }
  }, [])

  console.log('status inside app', status);
  return (
    <Router>
      <Header />
        {status.loading && <Skeleton width={500} height={100} />}
        {!status.loading && (
          <Routes>
            <Route path="/" element={!currentUser.id ? <Navigate to="/signup" /> : <DocsContainer />} />
            <Route path="/documents/:id" element={<TextEditor />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        )}
    </Router>
  );
}

export default App;
