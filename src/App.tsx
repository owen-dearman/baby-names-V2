import { babyNameData } from "./utils/babyNameData"
import {babyNameDataInterface} from "./utils/babyNameDataInterface"
import {sortNameList} from "./utils/sortNameList"
import {mapBabyNames} from "./utils/mapBabyNames"


function App(): JSX.Element {
  //sorts array of baby name objects into alphabetical order and maps them into JSX.Elements with CSS styling based on sex
  const mainNameListItems = sortNameList(babyNameData).map(mapBabyNames)

  return <div className="babyNamesList">{mainNameListItems}</div>
}

export default App;
