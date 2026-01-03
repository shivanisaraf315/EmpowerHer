const STORAGE_KEY="evalData"
export const getData=()=>{
    const data=localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data):[];
};
export const setData=(data)=>{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(data))
}