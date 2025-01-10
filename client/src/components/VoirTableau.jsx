import React from 'react';
import TacheCard from './TacheCard';

const VoirTableau = ({taches}) => {
  return (
    <div>
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10 '>
        {
            taches.map((tache,index) => (
                <TacheCard tache={tache} key={index} />
            ))
        }
    </div>
    </div>
  )
}

export default VoirTableau