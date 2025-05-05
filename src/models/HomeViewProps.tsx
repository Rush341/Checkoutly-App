export interface HomeViewModelProps {
    user: {
        "email": string,
        "emailVerified": boolean,
        "name": string,
        "nickname": string,
        "picture": string,
        "sub": string,
        "updatedAt": string
    }
    isLoading: boolean
    onLogout: () => void
    onExplore: () => void
}