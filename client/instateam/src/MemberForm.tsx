import { useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
  console.log(params);

  // const member = await getContact(params.contactId);
  return { name: 'woo' };
}

export default function MemberForm(params) {
  const [values, setValues] = useState({});

  const { member } = useLoaderData();

  console.log(params);

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    console.log(values);

    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/members/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    // setMembers([...members, data]);
    // setValues({});
    console.log(data);
  };

  return (
    <>
      <h1>Team Member Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={values.first_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={values.last_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={values.role}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
