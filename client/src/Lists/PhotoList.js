//PhotoList.js
import React, { useEffect, useRef, useState } from 'react';
import NewPhoto from '../items/NewPhoto';
import '../css/photoList.css';

function PhotoList({ photos, onDelete, onUpdate }) {
  const [visibleCount, setVisibleCount] = useState(18);
  const loaderRef = useRef(null);
  const batchSize = 6;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + batchSize, photos.length));
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [photos.length]);

  if (photos.length === 0) {
    return <p>Don't have any photos, let's add one!</p>;
  }

  return (
    <>
      <div className="photo-list">
        {photos.slice(0, visibleCount).map((p) => (
          <NewPhoto
            key={p.id}
            id={p.id}
            title={p.title}
            url={p.url}
            thumbnailUrl={p.thumbnailUrl}
            albumid={p.albumId}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>

      {visibleCount < photos.length && (
        <div ref={loaderRef} className="loader">
          <p>Loading more photos...</p>
        </div>
      )}
    </>
  );
}

export default PhotoList;
