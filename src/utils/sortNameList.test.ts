import {sortNameList} from "./sortNameList"

test("objects should be in alphabetical order based on name values", () => {
    expect(sortNameList([
        { name: "Ben", id: 20, sex: 'm' },
        { name: "Michael", id: 30, sex: 'm' },
        { name: "Aaron", id: 40, sex: 'm' }
    ])).toStrictEqual([
        { name: "Aaron", id: 40, sex: 'm' }, 
        { name: "Ben", id: 20, sex: 'm' }, 
        { name: "Michael", id: 30, sex: 'm' }  
    ]);
    expect(sortNameList([
        { name: "Owen", id: 20, sex: 'm' },
        { name: "Oscar", id: 30, sex: 'm' },
        { name: "Owain", id: 40, sex: 'm' }
    ])).toStrictEqual([
        { name: "Oscar", id: 30, sex: 'm' },
        { name: "Owain", id: 40, sex: 'm' },
        { name: "Owen", id: 20, sex: 'm' },
    ]);
});