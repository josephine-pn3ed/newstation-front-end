export const login = () => {
    localStorage.setItem('newstation', 'josephine');
}

export const logout = () => {
    localStorage.removeItem('newstation');
    localStorage.removeItem('company_id');
    localStorage.removeItem('user');
}

export const isLogin = () => {
    if (localStorage.getItem('newstation')) {
        return true;
    }
    return false;
}

export const setCompanyId = (id: string) => {
    localStorage.setItem('company_id', id);
}

export const getCompanyId = () => {
    return localStorage.getItem('company_id');
}

export const removeCompanyId = () => {
    localStorage.removeItem('company_id');
}

export const setUser = (user: string) => {
    localStorage.setItem('user', user);
}

export const getUser = () => {
    return localStorage.getItem('user');
}

export const removeUser = () => {
    localStorage.removeItem('user');
}