import { babyNameData } from "./utils/babyNameData";
import { babyNameDataInterface } from "./utils/babyNameDataInterface";
import { sortNameList } from "./utils/sortNameList";
import { useState } from "react";

function App(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favourites, setToFavourites] = useState<babyNameDataInterface[]>([]);

  //Producing alphabetically sorted names filtered via search bar
  const alphabeticalOrderNames: babyNameDataInterface[] =
    sortNameList(babyNameData);
  const filteredNames: babyNameDataInterface[] = alphabeticalOrderNames
    .filter((nameObject) =>
      nameObject.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((x) => !favourites.includes(x));

  const [genderFilter, setGenderFilter] =
    useState<babyNameDataInterface[]>(filteredNames);

  //calling mapping functions on array of name objects for main and favourites bar
  //line 25 includes filter function to only show the selected gender
  const preparedNames: JSX.Element[] = filteredNames
    .filter((x) => genderFilter.includes(x))
    .map(mapNamesToMain);
  const preparedFavourites: JSX.Element[] =
    favourites.map(mapNamesToFavourites);

  //mapping names into main name bar
  function mapNamesToMain(props: babyNameDataInterface): JSX.Element {
    return (
      <div
        key={props.id}
        className={props.sex}
        onClick={() =>
          setToFavourites([
            ...favourites,
            alphabeticalOrderNames.filter((x) => x.id === props.id)[0],
          ])
        }
      >
        {props.name}
      </div>
    );
  }

  //mapping names into Favourites Bar
  function mapNamesToFavourites(props: babyNameDataInterface): JSX.Element {
    return (
      <div
        key={props.id}
        className={props.sex}
        onClick={() =>
          setToFavourites(favourites.filter((x) => x.id !== props.id))
        }
      >
        {props.name}
      </div>
    );
  }

  //Formatting of function component

  return (
    <>
      <h1 className="title">Pick Your Favourite Baby Names!</h1>
      <div>
        <input
          style={{ fontSize: 30 }}
          placeholder="Search Here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button style={{ fontSize: 30 }} onClick={() => setSearchTerm("")}>
          Clear Input
        </button>
        <button
          style={{ fontSize: 30 }}
          onClick={() =>
            setGenderFilter(alphabeticalOrderNames.filter((x) => x.sex === "m"))
          }
        >
          ♂️
        </button>
        <button
          style={{ fontSize: 30 }}
          onClick={() =>
            setGenderFilter(alphabeticalOrderNames.filter((x) => x.sex === "f"))
          }
        >
          ♀️
        </button>
        <button
          style={{ fontSize: 30 }}
          onClick={() => setGenderFilter(alphabeticalOrderNames)}
        >
          ♂️♀️
        </button>
      </div>
      <hr />
      <h2>Favourites List</h2>
      <div className="babyNamesList">{preparedFavourites}</div>
      <hr />
      <p>
        Now Showing {preparedNames.length} of {babyNameData.length} Names
      </p>
      <div className="babyNamesList">{preparedNames}</div>
    </>
  );
}

export default App;
