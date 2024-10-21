import { useEffect, useState } from 'react';

export default function MemberList(params) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
      const response = await fetch('http://localhost:8000/api/members/');
      const data = await response.json();
      setMembers(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Team Members</h1>
      {members.map((member) => (
        <div key={member.id}>
          <h2>
            {member.first_name} {member.last_name}
          </h2>
          <p>{member.email}</p>
          <p>{member.phone}</p>
          <p>{member.role}</p>
        </div>
      ))}
    </>
  );
}
