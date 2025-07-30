//auth.js
export const getCurrentUser = () => {
    const user=localStorage.getItem('currentUser');
    return user? JSON.parse(user):null;
};

export const loginUser=(user,posts,todos,albums)=>{
    const data = {user: user ,posts: posts, todos: todos, albums:albums}; 
    localStorage.setItem('currentUser',JSON.stringify(data));
}

export const logoutUser=()=>{   
    localStorage.removeItem('currentUser');
}

//מניעת גישה ישירה מהדפדפן למשתמש לא מחובר
export const checkIfUserLogin = (navigate, setUser) => {
    const storedUser = getCurrentUser();
    if (!storedUser) {
        navigate('/login');
    } else {
        setUser(storedUser);
    }
};