import { Member } from '../types/Member';

export function getMember(formData: FormData): Member {
  return {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    role: formData.get('role') as 'regular' | 'admin',
  };
}

function isEmailValid(email: string) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

function isPhoneValid(phone: string) {
  const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
  return phonePattern.test(phone);
}

export function validateForm(formData: FormData) {
  const errors: Record<string, string> = {};
  if (!isEmailValid(formData.get('email') as string)) {
    errors.email = 'Invalid email address';
  }
  if (!isPhoneValid(formData.get('phone') as string)) {
    errors.phone = 'Invalid phone number';
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  } else {
    return null;
  }
}
