import { babyNameDataInterface } from "../babyNameDataInterface";

 export function sortNameList (arrayOfNameObjects: babyNameDataInterface[]): babyNameDataInterface[] {
     const sortedArray = arrayOfNameObjects.sort((a, b) => a.name.localeCompare(b.name));
    return sortedArray
}

