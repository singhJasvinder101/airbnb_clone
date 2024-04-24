import countries from "world-countries";

// let's filter the required fields only and return new object
const formatedCountries = countries.map((country) => (
    {
        value: country.cca2,
        label: country.name.common,
        flag: country.flag,
        latlng: country.latlng,
        region: country.region,
    }
))
 const useCountries = () => {
    const getAll = () => formatedCountries;

     const getByValue = (name: string) => {
        return formatedCountries.find((country) => country.value === name);
    }

    return {
        getAll,
        getByValue
    }
}

export default useCountries;
