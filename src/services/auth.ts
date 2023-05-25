export function getAuthHeader(){
    const token = localStorage.getItem("accessToken");

    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return authHeader;
}

export function getProfile():string {
    const profile = localStorage.getItem('profile') as string
    return profile
  
  }
  
export function getUser():string{
    const user = localStorage.getItem('user') as string
    return user
}