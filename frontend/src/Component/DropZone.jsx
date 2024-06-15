import { useCallback, useEffect, useState } from 'react'
import {useDropzone} from 'react-dropzone';
import upload from '../assets/upload.png';

const  DropZone = ( { status,
  setStatus,
  detector,
  result,
  setResult,
  className,
  setimgurl
}) => {
 
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])

  const onDrop = useCallback(
    (accepted, rejected ) => {
      if (accepted?.length) {
        setFiles([
          ...accepted.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          )
        ])

        setStatus('ready')
        setResult(null)

        const reader = new FileReader()

        reader.onload = function (e) {
          const image = e?.target?.result
          setimgurl(image);
          detector(image)
        }
        reader.readAsDataURL(accepted[0])
      }
      if (rejected?.length) {
        setRejected(rejected)
      }
    },
    [detector, setResult, setStatus]
  )
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000,
    maxFiles: 1,
    onDrop
  })

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  

  const remove = () => {
    setFiles([])
    setRejected([])
  }

  return (
    <>
    
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps({ name: 'file' })} />
        <div className='w-max h-max flex flex-col rounded-[20px] hover:cursor-pointer hover:scale-[1.05]  hover:transition-transform'>
            <img src={upload} width={"150rem"} height={"10rem"} className='rounded-[10px]'/>
        </div>
      </div>
    </>
  )
}

export default DropZone;