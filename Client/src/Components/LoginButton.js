import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <button 
            class="btn btn-outline-light btn-lg px-5"
            onClick={() => loginWithRedirect()}>
                Log In
            </button>
        )
    )
}

export default LoginButton