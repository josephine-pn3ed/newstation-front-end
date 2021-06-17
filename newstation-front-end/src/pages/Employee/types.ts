export interface Props {
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
    handleLogoutButton: () => void;
    employees: string[][];
}