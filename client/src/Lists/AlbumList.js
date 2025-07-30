//Albums.js
import React from 'react';
import NewAlbum from '../items/NewAlbum';
import '../css/albumList.css';

function AlbumList({ albums }) {

    if (!albums||albums.length === 0) {
        return <p>Don't have albums, let's create one!</p>;
    }

    return (
        <>
            <div className='album-list'>
                {albums.map((album) => (
                    <NewAlbum key={album.id} id={album.id} title={album.title} />
                ))}
            </div>
        </>
    );
}

export default AlbumList;