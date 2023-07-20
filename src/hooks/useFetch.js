// useFetchCat.js
function useFetchCat() {
  const [cat, setCat] = useState([]);
  const [kittyFact, setKittyFact] = useState("");

  const fetchCat = async () => {
    // the rest of your fetching logic
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return { cat, kittyFact, fetchCat };
}

export default useFetchCat;
