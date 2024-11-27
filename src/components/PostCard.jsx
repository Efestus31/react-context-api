import { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../contexts/GlobalContext';

export default function PostCard() {
    const { postsData, setPostsData } = useContext(GlobalContext); // Usa il contesto per ottenere e aggiornare i post

    // Funzione per gestire l'eliminazione di un post
    function handleDelete(slug) {
        fetch(`http://localhost:3001/posts/${slug}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then(() => {
                // Rimuoviamo il post dalla lista nel contesto
                const updatedPosts = postsData.filter((post) => post.slug !== slug);
                // Solo aggiorna lo stato se la lista dei post è effettivamente cambiata
                if (updatedPosts.length !== postsData.length) {
                    setPostsData(updatedPosts); // Aggiorniamo i dati dei post nel contesto
                }
                console.log("Post eliminato con successo!");
            })
            .catch((error) => {
                console.error("Error deleting post:", error);
            });
    }

    return (
        <>
            {/* Verifica che ci siano dati prima di tentare di iterarli */}
            {postsData.length > 0 ? (
                postsData.map((post, index) => (
                    <div className="col" key={post.id || index}>
                        <div className="card">
                            <h3>{post.title}</h3>
                            <Link to={`/posts/${post.slug}`}>
                                <img
                                    src={`http://localhost:3001/` + post.image}
                                    alt={post.title}
                                    style={{ width: '100%', height: '10rem', aspectRatio: '1' }}
                                />
                            </Link>
                        </div>
                        <div className="border border-gray-400 p-2">
                            {post.content}
                        </div>
                        <button
                            className="btn btn-danger mt-2"
                            onClick={() => handleDelete(post.slug)} // Passa lo slug del post da eliminare
                        >
                            Elimina
                        </button>
                    </div>
                ))
            ) : (
                <p>No posts available</p> // Messaggio se non ci sono post
            )}
        </>
    );
}