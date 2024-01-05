export function SessionStorageSetter(name: string,data: any) {
    sessionStorage.setItem(name, JSON.stringify(data));

}

export function SessionStorageGetter(name: string) {
    const data=sessionStorage.getItem(name);
    if(data){
        return JSON.parse(data);
    }
    return data;
}