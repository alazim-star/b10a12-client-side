import React from 'react';
import SectionTitle from '../Shard/SectionTitle';

const GoldenStudent = () => {
    const images = [
        {
            src: "https://i.ibb.co.com/g4LpSjP/637dba21ddf6a38faa77d1e4bdd8014a-thumbnail.jpg",
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
        },
        {
            src: "https://i.ibb.co.com/6nRMZth/Untitled-13.jpg",
            colSpan: "col-span-2",
            rowSpan: "row-span-1",
        },
        {
            src: "https://i.ibb.co.com/Fsk1s5V/HSBC-feature-image.jpg",
            colSpan: "col-span-",
            rowSpan: "row-span-1",
        },
        {
            src: "https://i.ibb.co.com/9rD95m6/19.jpg",
            colSpan: "col-span-2",
            rowSpan: "row-span-2",
        },
        {
            src: "https://i.ibb.co.com/GfG2crTG/41534147131-3d40e439cc-b.jpg",
            colSpan: "col-span-2",
            rowSpan: "row-span-2",
        },
        
    ];

    return (
        <div className="container mx-auto my-10 px-4">
           
            <SectionTitle heading="Our Achievement"></SectionTitle>
            <div className="grid grid-cols-4  gap-6">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`relative overflow-hidden rounded-lg shadow-lg group border border-[#af9556] ${image.colSpan} ${image.rowSpan}`}
                    >
                        <img
                            src={image.src}
                            alt={`Memory ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        />
                      
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoldenStudent
