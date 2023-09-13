import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fulbitoTable from "../firebase/fulbitoTable";

export function useGetTable({ fulbito }) {
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [actFulbito, setActFulbito] = useState({});
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const fulbitoActual = await fulbitoTable(fulbito, user);
          setActFulbito(fulbitoActual);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error(error);
        }
      };
      fetchData();
    }, []);
    return { actFulbito, loading };
  }