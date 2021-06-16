export const login = () => {
    localStorage.setItem('newstation', 'josephine');
}

export const logout = () => {
    localStorage.removeItem('newstation');
}

export const isLogin = () => {
    if (localStorage.getItem('newstation')) {
        return true;
    }

    return false;
}