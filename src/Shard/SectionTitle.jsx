import React from 'react';

const SectionTitle = ({ subHeading, heading }) => {
  return (
    <div className="text-center my-8 w-4/12 mx-auto">
      {/* Subheading */}
      <p className="text-sm text-yellow-500 italic mb-2">{subHeading}</p>
      {/* Heading */}
      <h2 className="uppercase text-3xl text-neutral border-y-4 py-4  ">{heading}</h2>
    </div>
  );
};

export default SectionTitle;
