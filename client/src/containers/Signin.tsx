import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDocs } from '../App';
import Form, { FormBtn, FormInput } from '../components/Form';
import useRequest from '../hooks/use-request';

interface Props {
  setCurrentUser(data: UserDocs): void;
}

interface FormData {
  email: string;
  password: string;
}

export default function SigIn({ setCurrentUser }: Props) {
  const [form, setForm] = useState<FormData>({email: '', password: ''});
  const { status, sendRequest } = useRequest();
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
      e.preventDefault();
      sendRequest({
        apiRoute: '/api/users/signin',
        method: 'post',
        body: {...form},
        onSuccess(data: UserDocs) {
          setCurrentUser(data);
          navigate('/');
        }
      })
  }
  console.log('status sign', status);
  return (
    <div className="signup-form form-container">
      <Form>
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
        </div>
        <p className={`${status.error ? 'form-error' : 'form-error-hidden'} error`}>{status.message}</p>
      </Form>
    </div>
  );
}
