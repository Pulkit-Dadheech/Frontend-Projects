export function SessionStorageSetter(name: string,data: any) {
    localStorage.setItem(name, JSON.stringify(data));

}

export function SessionStorageGetter(name: string) {
    const data=localStorage.getItem(name);
    if(data){
        return JSON.parse(data);
    }
    return data;
}