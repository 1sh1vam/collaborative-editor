import { useState } from 'react';
import Form, { FormBtn, FormInput } from '../components/Form';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [form, setForm] = useState<FormData>({name: '', email: '', password: ''});
  const handleSubmit = (e) => {
      e.preventDefault();

  }
  return (
    <div className="signup-form">
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
        <FormBtn onClick={(e) => }>submit</FormBtn>
      </Form>
    </div>
  );
}
