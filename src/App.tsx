import { babyNameData } from "./utils/babyNameData";
import { babyNameDataInterface } from "./utils/babyNameDataInterface";
import { sortNameList } from "./utils/sortNameList";
import { useState } from "react";

function App(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favourites, setToFavourites] = useState<babyNameDataInterface[]>([]);
  const [currentActiveButton, setActiveButton] = useState<string>("any");

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

  //download favourites
  const downloadFavourites = () => {
    const namesString: string= favourites.map((x) => `${x.name} (${x.sex})`).join(", ")
    const element = document.createElement("a");
    const file = new Blob([namesString], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "Favourite-Baby-Names.txt";
    document.body.appendChild(element);
    element.click();
  };

  //Formatting of function component
  return (
    <>
      <h1 className="headerTitle">Pick Your Favourite Baby Names</h1>
      <div>
        <input
          style={{ fontSize: 20 }}
          placeholder="Search Here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm("")}>Clear Input</button>
        <button
          className={currentActiveButton === "male" ? "activeButton" : ""}
          onClick={() => {
            setGenderFilter(
              alphabeticalOrderNames.filter((x) => x.sex === "m")
            );
            setActiveButton("male");
          }}
        >
          ♂️
        </button>
        <button
          className={currentActiveButton === "female" ? "activeButton" : ""}
          onClick={() => {
            setGenderFilter(
              alphabeticalOrderNames.filter((x) => x.sex === "f")
            );
            setActiveButton("female");
          }}
        >
          ♀️
        </button>
        <button
          className={currentActiveButton === "any" ? "activeButton" : ""}
          onClick={() => {
            setGenderFilter(alphabeticalOrderNames);
            setActiveButton("any");
          }}
        >
          ♂️♀️
        </button>
      </div>
      <hr />
      <h2 className="title">Favourites List</h2>
      <p className="subtitle">Showing {favourites.length} names</p>
      <button style={{ fontSize: 20}} onClick={() => setToFavourites([])}>
        Clear Favourites
      </button>
      <button style={{fontSize: 20}} onClick={downloadFavourites}>Download Favourites</button>
      <div className="babyNamesList">{preparedFavourites}</div>
      <hr />
      <h2 className="title">Name List</h2>
      <p className="subtitle">
        Showing {preparedNames.length} of {babyNameData.length} Names
      </p>
      <div className="babyNamesList">{preparedNames}</div>
    </>
  );
}

export default App;
