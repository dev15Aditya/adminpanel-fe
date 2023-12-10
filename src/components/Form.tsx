import { FormEvent, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-hot-toast';

import BasicDetails from './ProgressForm/BasicDetails';
import FileUpload from './ProgressForm/FileUpload';
import MultiField from './ProgressForm/MultiField';
import { useMultiStepForm } from './ProgressForm/useMultiStepForm';
import ProgressBar from './ProgressForm/ProgressBar';
import { useNavigate } from 'react-router-dom';

type FormData = {
  name?: string;
  email?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  file?: File | null;
  skills?: Array<string>;
};

const INITIAL_DATA: FormData = {
  name: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  pincode: '',
  country: '',
  file: null,
  skills: [],
};

export default function ProgressForm() {
  const nav = useNavigate();
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    next,
    cancel,
  } = useMultiStepForm([
    <BasicDetails {...data} updateFields={updateFields} />,
    <FileUpload {...data} updateFields={updateFields} />,
    <MultiField {...data} updateFields={updateFields} />,
  ]);

  async function submitForm() {
    try {
      const response = await axios.post(
        'http://localhost:8080/form/submit',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('sessionToken'),
          },
        }
      );

      if (response.status === 200) {
        toast.success('Form submitted successfully!');
        nav('/data-table');
      } else {
        toast.error('Form submission failed!');
      }

      next();
    } catch (error) {
      console.error('Form submission error');
      toast.error('Form submission failed!');
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    submitForm();
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <ProgressBar
            currentStep={currentStepIndex}
            totalSteps={steps.length - 1}
          />
        </div>

        {step}

        <div className="flex justify-between m-3">
          {!isFirstStep && (
            <button
              type="button"
              onClick={back}
              className='className="text-blue-500 dark:text-blue-400 bg-transparent border border-solid border-blue-500 dark:border-blue-400 hover:bg-blue-500 hover:bg-opacity-10 dark:hover:bg-opacity-10 hover:text-white dark:hover:text-white active:bg-blue-600 font-bold uppercase px-8 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"'
            >
              Back
            </button>
          )}

          {isFirstStep && (
            <button
              type="button"
              onClick={cancel}
              className='className="text-blue-500 dark:text-blue-400 bg-transparent border border-solid border-blue-500 dark:border-blue-400 hover:bg-blue-500 hover:bg-opacity-10 dark:hover:bg-opacity-10 hover:text-white dark:hover:text-white active:bg-blue-600 font-bold uppercase px-8 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"'
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className='className="text-blue-500 dark:text-blue-400 bg-transparent border border-solid border-blue-500 dark:border-blue-400 hover:bg-blue-500 hover:bg-opacity-10 dark:hover:bg-opacity-10 hover:text-white dark:hover:text-white active:bg-blue-600 font-bold uppercase px-8 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"'
          >
            {isLastStep ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </>
  );
}
