import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <article className='column'>
                {user?.picture && <img src={user.picture} alt={user?.name} 
                style={{ width: '190px', height: 'auto' }}
                />}
                <h2>{user?.name}</h2>
                {/*<u1>
                    {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
                </u1>*/}
            </article>
        )
    )
}

export default Profile