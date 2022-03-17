import { babyNameData } from "./utils/babyNameData"
import {babyNameDataInterface} from "./utils/babyNameDataInterface"
import {sortNameList} from "./utils/sortNameList"
import {mapBabyNames} from "./utils/mapBabyNames"
import {useState} from "react"


function App(): JSX.Element {

    const [searchTerm, setSearchTerm] = useState<string>("")

    //sorts array of baby name objects into alphabetical order 
    const sortedNames = sortNameList(babyNameData)
    //filters the names that match the input search
    const searchedNameList:babyNameDataInterface[] = sortedNames.filter((nameObject) => nameObject.name.toLowerCase().includes(searchTerm.toLowerCase()))
    //Maps sorted & filtered names into JSX.Elements with CSS styling based on sex
    const mainNameListItems = searchedNameList.map(mapBabyNames)


   return <>
      <input 
      placeholder="Search Here"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <hr />
    <div className="babyNamesList">{mainNameListItems}</div>

  </>
}

export default App;
