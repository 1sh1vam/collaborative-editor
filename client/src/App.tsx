import TextEditor from "./containers/TextEditor";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DocsContainer from "./containers/DocsContainer";
import Header from "./containers/Header";
import { useEffect, useRef, useState } from "react";
import useRequest from "./hooks/use-request";
import Signup from "./containers/Signup";
import Skeleton from "react-loading-skeleton";
import SigIn from "./containers/Signin";

export interface UserDocs {
  name: string;
  email: string;
  id: string;
}

export interface Docs {
  id: string;
  data: any;
  owner: string;
  name: string;
}

function App() {
  const mountedRef = useRef(false);
  const [docs, setDocs] = useState<Docs[]>([]);
  const [currentUser, setCurrentUser] = useState<UserDocs>({ name: '', email: '', id: '' })
  const { status, sendRequest } = useRequest();

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      sendRequest({
        apiRoute: '/api/users/currentUser',
        method: 'get',
        body: {},
        onSuccess({ currentUser }: { currentUser: UserDocs }) {
          setCurrentUser(currentUser);
        }
       });
    }
  }, []);

  return (
    <div>
    <Router>
      <Header docs={docs} />
        {status.loading && <Skeleton width={500} height={100} />}
        {(mountedRef.current && !status.loading) && (
          <Routes>
            <Route path="/" element={!currentUser.id ? <Navigate to="/signup" /> : <DocsContainer docs={docs} setDocs={setDocs} />} />
            <Route path="/documents/:id" element={<TextEditor setDocs={setDocs} />} />
            <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />} />
            <Route path="/signin" element={<SigIn setCurrentUser={setCurrentUser} />} />
          </Routes>
        )}
    </Router>
    </div>
  );
}

export default App;
