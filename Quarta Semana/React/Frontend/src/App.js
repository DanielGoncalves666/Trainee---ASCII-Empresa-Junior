import React, {useState, useEffect} from 'react';
import api from './services/api'

import "./App.css";
//import backgroundImage from "./assets/background.jpg"

import Header from './components/Header';

function App() {
    const [projects, setProjects] = useState([]);
    // começar o estado com o tipo que esperamos

    useEffect( () => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        //projects.push(`Novo Projeto ${Date.now()}`);

        //setProjects([... projects, `Novo Projeto ${Date.now()}`]);
    
        const response = await api.post('projects', {
            "title": `Novo Projeto ${Date.now()}`,
	        "owner": "Diego Fernandes"
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Projects" />
            
            {/* <img width={300} src={backgroundImage} /> */}

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type='button' onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}
/**
 * O react precisa que identifiquemos no primeiro elemento do que estamos iterando qual informação é única. No caso acima, é o nome do projeto, mas geralmente usamos a id.
 */

export default App;