import React from 'react';
import clsx from "clsx";

const Titre = ({title, className}) => {
  return (
    <h2 className={clsx("text-2xl font-semibold", className)}>
        {title}
    </h2>
  )
}

export default Titre