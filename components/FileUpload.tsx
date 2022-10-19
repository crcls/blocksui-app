import { ChangeEvent, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

interface Props {
  className: string
  label: string
  name: string
  onChange: (file: File | null) => void
}

const FileUpload = ({ className, label, name, onChange }: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop: (item: { files: File[] }) => {
        // TODO: validate file type
        setFile(item.files[0])
      },
    }),
    []
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]

      if (file) {
        setFile(file)
      } else {
        setFile(null)
      }
    }
  }

  useEffect(() => {
    if (file) {
      onChange(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setDataUrl(reader.result as string)
      }
      reader.onerror = () => {
        console.log(reader.error)
        setError(reader.error as Error)
      }
    } else {
      onChange(null)
      setDataUrl(null)
    }
  }, [file])

  return (
    <div className={className}>
      <label
        htmlFor="cover-image"
        className="block text-sm font-medium text-neutral-700"
      >
        {label}
      </label>
      <p>{error?.message}</p>
      <div className="mt-1">
        <div
          ref={drop}
          className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-neutral-300 px-6 pt-5 pb-6"
        >
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-neutral-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-neutral-600">
              <label
                htmlFor={name}
                className="relative cursor-pointer rounded-md bg-white font-medium text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:text-green-500"
              >
                <span>Upload a file</span>
                <input
                  className="sr-only"
                  id={name}
                  name={name}
                  onChange={handleChange}
                  type="file"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        {dataUrl && <img alt={file?.name} src={dataUrl} />}
      </div>
    </div>
  )
}

export default FileUpload
