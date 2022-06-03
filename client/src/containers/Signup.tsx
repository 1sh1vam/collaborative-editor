import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDocs } from '../App';
import Form, { FormBtn, FormInput } from '../components/Form';
import useRequest from '../hooks/use-request';

interface Props {
  setCurrentUser(data: UserDocs): void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Signup({ setCurrentUser }: Props) {
  const [form, setForm] = useState<FormData>({name: '', email: '', password: ''});
  const { status, sendRequest } = useRequest();
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
      e.preventDefault();
      sendRequest({
        apiRoute: '/api/users/signup',
        method: 'post',
        body: {...form},
        onSuccess(data: UserDocs) {
          setCurrentUser(data);
          navigate('/');
        }
      })
  }
  return (
    <div className="signup-form form-container">
      <Form>
        <FormInput
          placeholder="Enter your name"
          value={form.name}
          onChange={({ target }) =>
            setForm((prev) => ({ ...prev, name: (target as HTMLInputElement).value }))
          }
        />
        <FormInput
          placeholder="Enter email"
          value={form.email}
          onChange={({ target }) =>
            setForm((prev) => ({ ...prev, email: (target as HTMLInputElement).value }))
          }
        />
        <FormInput
          placeholder="Enter password"
          value={form.password}
          type="password"
          onChange={({ target }) =>
            setForm((prev) => ({ ...prev, password: (target as HTMLInputElement).value }))
          }
        />
        <div className='btn-container'>
          <FormBtn loading={status.loading} onClick={handleSubmit}>submit</FormBtn>
          <Link to="/signin">sign in</Link>
        </div>
        <p className={`${status.error ? 'form-error' : 'form-error-hidden'} error`}>{status.message}</p>
      </Form>
    </div>
  );
}
