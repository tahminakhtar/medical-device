export const accessHeader = (token) => {
    return {
        headers: {
            "authorization": `${token}`
        }
    }
}


