import React from 'react'

const Icon = ({ className, iconName, size = 22, viewBox = 32 }) => (
      <svg className={className} width={size} height={size} viewBox={`0 0 ${viewBox} ${viewBox}`}>
        {iconName.map(icon => <path d={icon} />)}
      </svg>
  );
  
  export default Icon;