//NewAlbum.js
import '../css/album.css';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

function NewAlbum({id, title }) {

    const navigate = useNavigate();
    const currentUser=getCurrentUser();
    const currentUserId = currentUser.user.id;

    function onClick(id){
        navigate(`/users/${currentUserId}/albums/${id}/photos`, { state: { id } });
    }

    return (
        <>
            <div className="album" 
            style={{border : "solid blue 2px", width:"200px",height:"200px"}} 
            onClick={() => onClick(id)} >
                <p>{id}</p>
                <p>{title}</p>
            </div>
        </>
    );
}

export default NewAlbum;