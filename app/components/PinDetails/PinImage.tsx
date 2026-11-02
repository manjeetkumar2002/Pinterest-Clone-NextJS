import Image from 'next/image'
import React from 'react'
type Props={
  image:string,
  title:string
}
function PinImage({pinDetail}:{pinDetail:Props}) {

  return (
    <div>
      <Image loading='eager' src={pinDetail?.image}
      alt={pinDetail.title}
      width={1000}
      height={1000}
    
      className='rounded-2xl'
      />

    </div>
  )
}

export default PinImage