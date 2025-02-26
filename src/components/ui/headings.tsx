import React from 'react'
import Image from 'next/image';

interface HeadingsProps {
  image: string;
  alt: string;
}

const Headings = ({ image, alt }: HeadingsProps) => {
  return (
    <div className='max-w-7xl m-auto px-2 md:px-5 '>
      <Image className="flex justify-center items-center rounded-lg w-full mt-20 mb-10" src={image} alt={alt} width={1000} height={500}/>
    </div>
  )
}

export default Headings