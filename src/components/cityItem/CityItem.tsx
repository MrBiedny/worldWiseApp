import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../../contexts/CitiesContext";
import CityTypes from "../../types/CityTypes";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }: { city: CityTypes }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  const flagemojiToPNG = (flag: string) => {
    const countryCode = Array.from(
      flag,
      (codeUnit): number => codeUnit.codePointAt(0)!
    )
      .map((char: number) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li className={styles.list}>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.time}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
