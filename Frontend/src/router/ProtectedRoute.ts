import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthStatus } from '../utils/token';

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles: Array<'user' | 'admin'>;
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
    const authStatus = getAuthStatus();

    useEffect(() => {
        if (authStatus !== 'user' && authStatus !== 'admin' || !allowedRoles.includes(authStatus)) {
            navigate('/');
            setIsAllowed(false);
        } else {
            setIsAllowed(true);
        }
    }, [authStatus, allowedRoles, navigate]);

    if (isAllowed === null) {
        return null;
    }

    return isAllowed ? children : null;
}