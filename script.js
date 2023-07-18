const formulario = document.getElementById('paisForm');
const tabla = document.querySelector('table');
const button = document.getElementById('buttonConsulta');

tabla.style.display = 'none';

const consultarPais = async (e) => {
    e.preventDefault();
    let nombrePais = document.getElementById('paisInput').value;
    if (nombrePais === '') {
        alert('Debe Ingresar el Nombre de un Pais.');
        return;
    }

    const url = `https://restcountries.com/${nombrePais}`;

    try {
        const respuesta = await fetch(url);

        if (respuesta.ok) {
            const data = await respuesta.json();

            document.getElementById('nombrePais').innerText = data.name;
            document.getElementById('CapitalPais').innerText = data.weight;
            document.getElementById('idiomaPais').innerText = data.types[0].type.name;
            document.getElementById('imagenBandera').src = data.sprites.front_default;
            document.getElementById('estado').innerText = 'Pais encontrado';
            tabla.style.display = '';
        } else {
            document.getElementById('estado').innerText = 'Pais no encontrado';
        }
    } catch (error) {
        console.log(error);
    }
}

const consultarMetodo = async () => {
    try {
        const respuesta = await fetch('./consulta.php');
        const data = await respuesta.text();

        alert(data);
    } catch (error) {
        console.log(error);
    }
}

formulario.addEventListener('submit', consultarPais);
button.addEventListener('click', consultarMetodo);
