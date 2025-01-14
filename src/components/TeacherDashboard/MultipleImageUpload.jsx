import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { X } from 'lucide-react'

export function MultipleImageUpload({ onChange, value }) {
  const onDrop = useCallback((acceptedFiles) => {
    onChange([...value, ...acceptedFiles])
  }, [onChange, value])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: true
  })

  const removeFile = (index) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 ${
          isDragActive ? 'border-primary' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Select images</p>
        )}
      </div>
      {value.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {value.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

