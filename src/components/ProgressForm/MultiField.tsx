import { useEffect, useState } from 'react';

type props = {
  skills?: Array<string>;
  updateFields?: (fields: Partial<props>) => void;
};
export default function MultiField({ skills, updateFields }: props) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const options = [
    'Javascript',
    'Typescript',
    'Tailwinds CSS',
    'Node JS',
    'React JS',
  ];

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions([...selectedOptions, ...selected]);

    if (updateFields) {
      updateFields({ skills: [...selectedOptions, ...selected] });
    }
  };

  useEffect(() => {
    setSelectedOptions(skills || []);
  }, [skills]);
  return (
    <>
      <div className="w-[300px] mx-auto">
        <h1 className="text-2xl font-bold text-white mb-3">
          Choose your options{' '}
        </h1>
        <select
          id="dropdown"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={onChangeHandler}
          value={selectedOptions}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <br />
        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'None'}
        </div>
      </div>
    </>
  );
}
