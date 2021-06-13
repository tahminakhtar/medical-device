export const accessHeader = (token) => {
    return {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
}


