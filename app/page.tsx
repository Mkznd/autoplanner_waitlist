'use client'
import React, { useState } from 'react';
import { sql } from '@vercel/postgres';
import {createUser} from './queries/createUser';

enum ErrorType {
  Name,
  Email
}

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState(new Array<ErrorType>());
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(`${name} ${email}`);
    if(handleValidation()) {
      // Here you would typically send the data to your database
      console.log(`Submitting Name ${name}, Email ${email}`);
      console.log(await createUser(name, email));
      setCompleted(true);
    }
  }

  const handleValidation = () => {
    // validate name
    if (name.length < 2) {
      console.log('Name should be at least 2 characters long '+name, );
      if(errors.indexOf(ErrorType.Name) === -1) {
        setErrors([...errors, ErrorType.Name]);
      }
      return false;
    }
    // validate email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format');
      if(errors.indexOf(ErrorType.Email) === -1) {
        setErrors([...errors, ErrorType.Email]);
      }
      return false;
    }
    console.log(`Validating Name ${name}, Email ${email}`);
    return true;
  }

  const handleDelete = (error: ErrorType) => {
    setErrors(errors.filter(e => e !==error));
  }

  if(completed){
    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Thank you for signing up!</h2>
                  <p className="text-sm text-center text-gray-500 font-normal leading-relaxed">We will keep you updated.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Be the first to use Autoplanner!</h2>
                <p className="text-sm text-center text-gray-500 font-normal leading-relaxed">Enter your information below.</p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">How should we call you?</label>
                  <input type="text" className={`px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 ${errors.indexOf(ErrorType.Name) !== -1 ? 'border-red-500' : 'border-gray-300'}`}
                    value={name} placeholder={"Your name"} onChange={e => setName(e.target.value)} onFocus={() => {handleDelete(ErrorType.Name)}}/>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Where do you prefer to get updates?</label>
                  <input type="email" className={`px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 ${errors.indexOf(ErrorType.Email) !== -1 ? 'border-red-500' : 'border-gray-300'}`}
                    value={email} placeholder={"Your email"} onChange={e => setEmail(e.target.value)} onFocus={() => {handleDelete(ErrorType.Email)}}/>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                  <button className="flex justify-center items-center w-full text-white bg-gray-700 px-4 py-3 rounded-md focus:outline-none" onClick={handleSubmit}>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;