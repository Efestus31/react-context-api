import { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [postsData, setPostsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Funzione per fare la chiamata API e aggiornare lo stato
    const fetchPostsData = () => {
        setLoading(true); // Imposta loading a true prima della chiamata API
        fetch('http://localhost:3001/posts')
            .then((response) => response.json())
            .then((data) => {
                setPostsData(data.data || []);
                setLoading(false); // Imposta loading a false dopo aver ricevuto i dati
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                setError('Failed to load posts. Please try again later.');
                setLoading(false);  // Imposta loading a false in caso di errore
            });
    };

    useEffect(() => {
        fetchPostsData();  // Recupera i dati all'inizializzazione
    }, []);

    return (
        <GlobalContext.Provider value={{ postsData, setPostsData, fetchPostsData, loading, error }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;