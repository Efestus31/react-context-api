import { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import GlobalContext from '../contexts/GlobalContext'



export default function FormField() {
    const [formData, setFormData] = useState({
        titolo: '',
        immagine: '',
        contenuto: '',
        categoria: '',
        tags: [],
        pubblicato: false
    })
    //accediamo al valore di Url_api
    const { Url_api } = useContext(GlobalContext)


    //handle title imput
    function handleTitle(e) {
        setFormData({ ...formData, titolo: e.target.value })
    }
    //handle image
    function handleImage(e) {
        setFormData({ ...formData, immagine: e.target.files[0] });
    }
    //handle content imput
    function handleContent(e) {
        setFormData({ ...formData, contenuto: e.target.value })
    }
    //handle form imput
    function handleCategory(e) {
        setFormData({ ...formData, categoria: e.target.value })
    }
    //handle tags
    function handleTags(e) {
        const { value, checked } = e.target
        setFormData((prevData) => {
            const newTags = checked
                ? [...prevData.tags, value]
                : prevData.tags.filter((tag) => tag !== value)
            return { ...prevData, tags: newTags }
        })
    }
    //handle publish
    function handlePublish(e) {
        setFormData({ ...formData, pubblicato: e.target.checked })
    }

    function handleSubmit(e) {
        e.preventDefault()
        // console.log(formData);
        //setArticoli([...articoli, formData]);
        //reset of title after submit
        setFormData({ title: '', image: '', content: '', categoria: '', tags: [], pubblicato: false })

        //make the consume of the context 

        //make a post request to the api serve  and pass over the newItem object to the SetArticoli state setter
        fetch(`${Url_api}/posts`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(response => {
                setArticoli([...articoli, response]);
            })

    }

    return (
        <>

            <form className="row g-3" onSubmit={handleSubmit} >

                {/* Title */}
                <div className="col-12">
                    <label htmlFor="task" className="form-label">Titolo articolo </label>
                    <input
                        type="text"
                        id='titolo'
                        value={formData.titolo}
                        onChange={handleTitle}
                        className="form-control"
                        placeholder="Inserisci il titolo dell'articolo"
                    />
                </div>

                {/* image */}
                <div className="col-12">
                    <label htmlFor="task" className="form-label">Immagine articolo  </label>
                    <input
                        type="file"
                        className="form-control"
                        id="immagineArticolo"
                        onChange={handleImage}
                        accept="image/*"
                    />
                </div>

                {/* text area */}
                <div className="col-12">

                    <label htmlFor="contenuto" className='form-label'>Contenuto articolo:</label>
                    <textarea
                        id='contenuto'
                        value={formData.contenuto}
                        onChange={handleContent}
                        className="form-control"
                        placeholder="Scrivi il contenuto dell'articolo"
                        rows="5"
                    />
                </div>
                {/* select */}
                <div className="col-12">
                    <label className="input-group-text" htmlFor="inputGroupCategory">Categorie</label>
                    <select
                        id='categoria'
                        value={formData.categoria}
                        onChange={handleCategory}
                        className="form-select"
                    >
                        <option value="">Scegli la categoria:</option>
                        <option value="1">Tecnologia</option>
                        <option value="2">Lifestyle</option>
                        <option value="3">Educazione</option>
                        <option value="4">Cucina e Ricette</option>
                        <option value="5">Business e Finanza</option>
                    </select>
                </div>
                {/* checkbox */}
                <div className="col-12">
                    <label htmlFor="tags">Tags:</label>
                    <label>
                        <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            value="Innovazione"
                            checked={formData.tags.includes('Innovazione')}
                            onChange={handleTags}
                            aria-label="Innovazione"
                        /> Innovazione
                    </label>
                    <label>
                        <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            value="Benessere"
                            checked={formData.tags.includes('Benessere')}
                            onChange={handleTags}
                            aria-label="Benessere"
                        /> Benessere
                    </label>
                    <label>
                        <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            value="Educazione"
                            checked={formData.tags.includes('Educazione')}
                            onChange={handleTags}
                            aria-label="Educazione"
                        /> Educazione
                    </label>
                    <label>
                        <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            value="RicetteFacili"
                            checked={formData.tags.includes('RicetteFacili')}
                            onChange={handleTags}
                            aria-label="RicetteFacili"
                        /> RicetteFacili
                    </label>
                    <label>
                        <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            value="Startup"
                            checked={formData.tags.includes('Startup')}
                            onChange={handleTags}
                            aria-label="Startup"
                        /> Startup
                    </label>
                </div>

                {/* publish */}
                <div className="input-group mb-3">
                    <input
                        type="checkbox"
                        checked={formData.pubblicato}
                        onChange={handlePublish}
                        className="form-check-input mt-0"
                        id="pubblicato" />
                    Pubblicato
                </div>

                {/* Submit */}
                <button type="submit">Aggiungi Articolo</button>
            </form>

            <Link className="btn btn-primary my-3" to='/posts'>Our posts</Link>
        </>
    )
}
