import { babyNameData } from "./babyNameData"
import {babyNameDataInterface} from "./babyNameDataInterface"
import {sortNameList} from "./utils/sortNameList"
import {mapBabyNames} from "./utils/mapBabyNames"


function App(): JSX.Element {

  const mainNameListItems = sortNameList(babyNameData).map(mapBabyNames)

  return <div className="babyNamesList">{mainNameListItems}</div>
}

export default App;
