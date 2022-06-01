import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form, { FormBtn, FormInput } from '../components/Form';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [form, setForm] = useState<FormData>({name: '', email: '', password: ''});
  const handleSubmit = (e: React.SyntheticEvent) => {
      e.preventDefault();
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
          <FormBtn onClick={handleSubmit}>submit</FormBtn>
          <Link to="/signin">sign in</Link>
        </div>
      </Form>
    </div>
  );
}
