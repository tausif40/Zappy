import React, { useState, useEffect, useMemo } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const Gallery = ({ images }) => {
  const [ selectedImageIndex, setSelectedImageIndex ] = useState(0);

  // Create a unique identifier for this Gallery instance
  const galleryId = useMemo(() => Math.random().toString(36).substring(2, 11), []);

  // console.log('images-', images)
  // Update selected image when images prop changes
  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImageIndex(0);
    }
  }, [ images ]);

  // Add keyboard navigation for PhotoView
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNext();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ selectedImageIndex, images ]);

  // Check if images array exists and has content
  if (!images || images.length === 0) {
    return (
      <div style={{ padding: 16 }} className='bg-slate-50'>
        <div
          // style={{
          //   width: '100%',
          //   height: 380,
          //   background: '#f3f3f3',
          //   borderRadius: 8,
          //   display: 'flex',
          //   alignItems: 'center',
          //   justifyContent: 'center',
          //   color: '#666'
          // }}
          className="w-full h-[380px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-500"
        >
          No images available
        </div>
      </div>
    );
  }

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div style={{ padding: 16 }} className='bg-slate-50'>
      {/* Large banner/main image */}
      <PhotoProvider
        key={`${galleryId}-${images?.length}-${JSON.stringify(images)}`} // Unique key that changes with images
        maskOpacity={0.8}
        loop={true}
        speed={() => 200}
        photoClosable={false}
        maskClosable={true}
      >
        <div style={{ marginBottom: 20, position: 'relative' }}>
          {/* Main banner image - click to open PhotoView with all images */}
          <PhotoView src={images[ selectedImageIndex ]} index={selectedImageIndex}>
            <img
              src={images[ selectedImageIndex ]}
              alt="Main"
              // style={{
              //   width: '100%',
              //   height: 380,
              //   objectFit: 'cover',
              //   borderRadius: 10,
              //   boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              //   cursor: 'pointer'
              // }}
              className="w-full md:h-[380px] h-[240px] object-cover rounded-lg shadow-lg cursor-pointer"
            />
          </PhotoView>

          {/* Navigation buttons - only show if there are multiple images */}
          {images.length > 1 && (
            <>
              {/* Previous button */}
              <button
                onClick={goToPrevious}
                // style={{
                //   position: 'absolute',
                //   left: 10,
                //   top: '50%',
                //   transform: 'translateY(-50%)',
                //   background: 'rgba(0, 0, 0, 0.4)',
                //   color: 'white',
                //   border: 'none',
                //   borderRadius: '50%',
                //   width: 36,
                //   height: 36,
                //   cursor: 'pointer',
                //   display: 'flex',
                //   alignItems: 'center',
                //   justifyContent: 'center',
                //   fontSize: '24px',
                //   transition: 'all 0.2s ease',
                //   zIndex: 10
                // }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-9 h-9 flex items-center justify-center text-2xl transition duration-200 hover:bg-black/80 hover:scale-110 z-10"
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.8)';
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.4)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                ‹
              </button>

              {/* Next button */}
              <button
                onClick={goToNext}
                // style={{
                //   position: 'absolute',
                //   right: 10,
                //   top: '50%',
                //   transform: 'translateY(-50%)',
                //   background: 'rgba(0, 0, 0, 0.4)',
                //   color: 'white',
                //   border: 'none',
                //   borderRadius: '50%',
                //   width: 36,
                //   height: 36,
                //   cursor: 'pointer',
                //   display: 'flex',
                //   alignItems: 'center',
                //   justifyContent: 'center',
                //   fontSize: '24px',
                //   transition: 'all 0.2s ease',
                //   zIndex: 10
                // }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-9 h-9 flex items-center justify-center text-2xl transition duration-200 hover:bg-black/80 hover:scale-110 z-10"
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.8)';
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.4)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                ›
              </button>

              {/* Image counter */}
              <div
                // style={{
                //   position: 'absolute',
                //   bottom: 10,
                //   right: 10,
                //   background: 'rgba(0, 0, 0, 0.6)',
                //   color: 'white',
                //   padding: '4px 8px',
                //   borderRadius: 12,
                //   fontSize: '12px',
                //   fontWeight: '500'
                // }}
                className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-lg text-xs font-medium"
              >
                {selectedImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails - only show if there are more than 1 image */}
        {images.length >= 1 && (
          <div style={{
            display: 'flex',
            gap: 14
          }}>
            {images.map((img, idx) => (
              <div key={idx} onClick={() => handleThumbnailClick(idx)}>
                <img
                  src={img}
                  alt={`thumb-${idx}`}
                  // style={{
                  //   width: 140,
                  //   height: 80,
                  //   objectFit: 'cover',
                  //   borderRadius: 8,
                  //   background: '#f3f3f3',
                  //   cursor: 'pointer',
                  //   border: idx === selectedImageIndex ? '3px solid #db2777' : '0px solid transparent',
                  //   transition: 'all 0.2s ease'
                  // }}
                  className={`lg:w-[140px] lg:h-[80px] sm:w-[110px] sm:h-[65px] w-[90px] h-[55px] object-cover rounded-md bg-gray-100 cursor-pointer transition-all duration-200 ${idx === selectedImageIndex ? 'ring-2 ring-pink-600' : ''}`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Hidden PhotoView elements for all images - enables navigation through all images */}
        {images?.map((img, idx) => (
          <PhotoView key={idx} src={img} index={idx} style={{ display: 'none' }}>
            <div style={{ display: 'none' }} />
          </PhotoView>
        ))}
      </PhotoProvider>
    </div>
  );
};

export default Gallery;
