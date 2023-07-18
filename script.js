const formulario = document.getElementById('paisForm');
const tabla = document.querySelector('table');

tabla.style.display = 'none';

const consultarPais = async (e) => {
    e.preventDefault();
    let nombrePais = document.getElementById('paisInput').value;
    if (nombrePais === '') {
        alert('Debe ingresar el nombre de un país.');
        return;
    }

    const url = `https://restcountries.com/${name}`;

    try {
        const respuesta = await fetch(url);

        if (respuesta.ok) {
            const data = await respuesta.json();

            document.getElementById('nombrePais').innerText = data.name;
            document.getElementById('capitalPais').innerText = data.capital;
            document.getElementById('idiomaPais').innerText = data.lang;
            
            document.getElementById('estado').innerText = 'País encontrado';
            tabla.style.display = '';
        } else {
            document.getElementById('estado').innerText = 'País no encontrado';
        }
    } catch (error) {
        console.log(error);
    }
}

formulario.addEventListener('submit', consultarPais);
