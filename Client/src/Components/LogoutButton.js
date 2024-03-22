import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <button 
            class="btn btn-outline-light btn-lg px-5"
            onClick={() => logout()}>
                Log Out
            </button>
        )
    )
}

export default LogoutButton