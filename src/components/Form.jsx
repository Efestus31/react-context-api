import { useState, useContext, useEffect } from 'react';
import GlobalContext from '../contexts/GlobalContext';

const initialFormData = {
    title: '',
    image: '',
    slug: '',
    content: '',
    tags: [],
    pubblicato: false
};

export default function Form() {
    const [formData, setFormData] = useState(initialFormData);


    // Funzione per generare lo slug dal titolo
    function generateSlug(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '');
    }

    // Funzione per gestire il cambiamento del titolo
    function handleTitle(e) {
        const title = e.target.value;
        setFormData(prevData => {
            const newSlug = generateSlug(title);
            return { ...prevData, title: title, slug: newSlug };
        });
    }

    // Funzione per gestire l'immagine
    function handleImage(e) {
        setFormData(prevData => ({
            ...prevData,
            image: e.target.value
        }));
    }

    // Funzione per gestire il contenuto dell'articolo
    function handleContent(e) {
        setFormData(prevData => ({
            ...prevData,
            content: e.target.value
        }));
    }

    // Funzione per gestire i tag
    function handleTags(e) {
        const { value, checked } = e.target;
        setFormData(prevData => {
            const newTags = checked
                ? [...prevData.tags, value]
                : prevData.tags.filter(tag => tag !== value);
            return { ...prevData, tags: newTags };
        });
    }

    // Funzione per gestire la pubblicazione
    function handlePublish(e) {
        setFormData(prevData => ({
            ...prevData,
            pubblicato: e.target.checked
        }));
    }

    // Funzione per gestire il submit del form
    function handleSubmit(e) {
        e.preventDefault();
        // Reset dei campi dopo invio
        setFormData(initialFormData);

        // Chiamata POST per inviare i dati al server
        fetch(`http://localhost:3001/posts`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('Post submitted successfully:', res);
            })

            .catch(error => {
                console.error('Error submitting post:', error);
            });
    }

    return (
        <>
            <form className="row g-3" onSubmit={handleSubmit}>

                {/* Title */}
                <div className="col-12">
                    <label htmlFor="title" className="form-label">Titolo articolo </label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title || ''}  // Usa una stringa vuota come fallback
                        onChange={handleTitle}
                        className="form-control"
                        placeholder="Inserisci il titolo dell'articolo"
                    />
                </div>

                {/* Image */}
                <div className="col-12">
                    <label htmlFor="image" className="form-label">Immagine articolo </label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        value={formData.image || ''}
                        onChange={handleImage}
                        placeholder="https://picsum.photos/200/300"
                    />
                </div>

                {/* Content */}
                <div className="col-12">
                    <label htmlFor="content" className="form-label">Contenuto articolo:</label>
                    <textarea
                        id="content"
                        value={formData.content || ''}  // Usa una stringa vuota come fallback
                        onChange={handleContent}
                        className="form-control"
                        placeholder="Scrivi il contenuto dell'articolo"
                        rows="5"
                    />
                </div>

                {/* Tags */}
                <div className="col-12">
                    <label htmlFor="tags">Tags:</label>
                    {['Dolci', 'Torte', 'Ricette vegetariane', 'RicetteFacili', 'Ricette al forno', 'Antipasti', 'Primi piatti'].map(tag => (
                        <label key={tag}>
                            <input
                                className="form-check-input mt-0 mx-2"
                                type="checkbox"
                                value={tag}
                                checked={formData.tags.includes(tag)}
                                onChange={handleTags}
                                aria-label={tag}
                            /> {tag}
                        </label>
                    ))}
                </div>

                {/* Publish */}
                <div className="input-group mb-3">
                    <input
                        type="checkbox"
                        checked={formData.pubblicato}
                        onChange={handlePublish}
                        className="form-check-input mt-0 mx-2"
                        id="pubblicato"
                    />
                    Pubblicato
                </div>

                {/* Submit */}
                <button type="submit">Aggiungi Articolo</button>
            </form>
        </>
    );
}
