import { babyNameData } from "./utils/babyNameData";
//import { babyNameDataInterface } from "./utils/babyNameDataInterface";
import { sortNameList } from "./utils/sortNameList";
import { mapBabyNames } from "./utils/mapBabyNames";
import { useState } from "react";

function App(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");

  //Sorts name data in alphabetical order, filters sorted names to matching search input and maps the filtered names into JSX.Elements
  const sortedNames = sortNameList(babyNameData)
    .filter((nameObject) =>
      nameObject.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map(mapBabyNames);

  return (
    <>
      <input
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <hr />
      <div className="babyNamesList">{sortedNames}</div>
    </>
  );
}

export default App;
