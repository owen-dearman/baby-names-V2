import { babyNameData } from "./utils/babyNameData";
import { babyNameDataInterface } from "./utils/babyNameDataInterface";
import { sortNameList } from "./utils/sortNameList";
import { useState } from "react";

function App(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favourites, setToFavourites] = useState<babyNameDataInterface[]>([]);

 
  const alphabeticalOrderNames: babyNameDataInterface[] = sortNameList(babyNameData)
  const filteredNames: babyNameDataInterface[] = alphabeticalOrderNames.filter((nameObject) =>
      nameObject.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter((x) => !favourites.includes(x))
  const preparedNames: JSX.Element[] = filteredNames.map(mapNamesToMain);
  const preparedFavourites: JSX.Element[] = favourites.map(mapNamesToFavourites)

  function mapNamesToMain(props: babyNameDataInterface): JSX.Element {
    return (
      <div key={props.id} className={props.sex} onClick={() => setToFavourites([...favourites, alphabeticalOrderNames.filter((x) => x.id === props.id)[0]])   }>
        {props.name}
      </div>
    );
  }
  function mapNamesToFavourites(props: babyNameDataInterface): JSX.Element {
    return (
      <div key={props.id} className={props.sex} onClick={() => setToFavourites(favourites.filter((x) => x.id !== props.id))}>
        {props.name}
      </div>
    );
  }
    
  

  return (
    <>
      <input
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <hr />
      <h2>Favourites List</h2>
      <div className="babyNamesList">{preparedFavourites}</div>
      <hr />
      <p>Now Showing {preparedNames.length} of {babyNameData.length} Names</p>
      <div className="babyNamesList">{preparedNames}</div>
    </>
  );
}

export default App;
