import { useCities } from "../../contexts/CitiesContext";
import CityItem from "../cityItem/CityItem";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import styles from "./CityList.module.css";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first by Clicking on a city on the map" />
    );
  return (
    <ul className={styles.cities}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
