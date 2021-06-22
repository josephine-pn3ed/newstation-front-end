export const login = (email: string, user: string, company_id: string) => {
    localStorage.setItem('user_email', email);
    localStorage.setItem('company_id', company_id);
    localStorage.setItem('user', user);
}

export const logout = () => {
    localStorage.removeItem('user_email');
    localStorage.removeItem('company_id');
    localStorage.removeItem('user');
}

export const isLogin = () => {
    if (localStorage.getItem('user_email')) {
        return true;
    }
    return false;
}

export const getUserEmail = () => {
    return localStorage.getItem('user_email')
}

export const setCompanyId = (id: string) => {
<<<<<<< HEAD
    localStorage.setItem('company_id', id);
}
=======
} 
>>>>>>> 32054668505ec360329909e82c3005397eca54da

export const getCompanyId = () => {
    return localStorage.getItem('company_id');
}

export const removeCompanyId = () => {
    localStorage.removeItem('company_id');
}

export const setUser = (user: string) => {
}

export const getUser = () => {
    return localStorage.getItem('user');
}

export const removeUser = () => {
    localStorage.removeItem('user');
}