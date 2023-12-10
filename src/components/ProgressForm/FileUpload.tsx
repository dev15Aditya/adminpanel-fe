import Geolocation from './Geolocation';

type FormDataProps = {
  file?: File | null;
  updateFields?: (fields: Partial<FormDataProps>) => void;
};

export default function FileUpload({ file, updateFields }: FormDataProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    updateFields && updateFields({ file: selectedFile });
  };

  return (
    <>
      <div className="w-[300px] mx-auto">
        <h1 className="text-white text-3xl font-mono font-bold pb-5">
          Upload your files
        </h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            File Upload
          </label>
          <input
            type="file"
            id="file"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            placeholder="Upload your files"
            required
            onChange={handleFileChange}
          />
          {file && <p>Selected File: {file.name}</p>}
        </div>
        <Geolocation />
      </div>
    </>
  );
}
