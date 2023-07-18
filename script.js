const formulario = document.getElementById('paisForm');
const tabla = document.querySelector('table');

tabla.style.display = 'none';

const consultarPais = async (e) => {
    e.preventDefault();
    let name = document.getElementById('paisInput').value;
    if (name === '') {
        alert('Debe ingresar el nombre de un país.');
        return;
    }

    const url = `https://restcountries.com/v3.1/name/${name}`;

    try {
        const respuesta = await fetch(url);

        if (respuesta.ok) {
            const data = await respuesta.json();

            const pais = data[0];

            document.getElementById('nombrePais').innerText = pais.name.common;
            document.getElementById('capitalPais').innerText = pais.capital?.[0];
            document.getElementById('idiomaPais').innerText = Object.values(pais.languages).join(', ');

            const imagenBandera = document.getElementById('imagenBandera');
            imagenBandera.src = pais.flags.png;
            imagenBandera.alt = `Bandera de ${pais.name.common}`;

            document.getElementById('estado').innerText = 'País encontrado';
            tabla.style.display = '';
        } else {
            document.getElementById('estado').innerText = 'País no encontrado';
        }
    } catch (error) {
        console.log(error);
    }
}
const buscarPaisesPorMoneda = async (e) => {
    e.preventDefault();
    let moneda = document.getElementById('monedaInput').value;
    if (moneda === '') {
        alert('Debe ingresar el nombre de una moneda.');
        return;
    }

    const url = `https://restcountries.com/v3.1/currency/${moneda}`;

    try {
        const respuesta = await fetch(url);

        if (respuesta.ok) {
            const data = await respuesta.json();

            tablaPaisesMoneda.innerHTML = '';

            if (data.length > 0) {
                const titulo = document.createElement('tr');
                const th = document.createElement('th');
                th.textContent = `Países que utilizan ${moneda}:`;
                titulo.appendChild(th);
                tablaPaisesMoneda.appendChild(titulo);

                data.forEach(pais => {
                    const tr = document.createElement('tr');
                    const td = document.createElement('td');
                    td.textContent = pais.name.common;
                    tr.appendChild(td);
                    tablaPaisesMoneda.appendChild(tr);
                });
                document.getElementById('estadoMoneda').innerText = '';
                tablaPaisesMoneda.style.display = 'table';
            } else {
                document.getElementById('estadoMoneda').innerText = 'No se encontraron países que utilicen esa moneda.';
                tablaPaisesMoneda.style.display = 'none';
            }
        } else {
            document.getElementById('estadoMoneda').innerText = 'No se encontraron países que utilicen esa moneda.';
            tablaPaisesMoneda.style.display = 'none';
        }
    } catch (error) {
        console.log(error);
    }
}
const buscarPaisesPorIdioma = async (e) => {
    e.preventDefault();
    let idioma = document.getElementById('idiomaInput').value;
    if (idioma === '') {
        alert('Debe ingresar el nombre de un idioma.');
        return;
    }

    const url = `https://restcountries.com/v3.1/lang/${idioma}`;

    try {
        const respuesta = await fetch(url);

        if (respuesta.ok) {
            const data = await respuesta.json();

            tablaPaisesIdioma.innerHTML = '';

            if (data.length > 0) {
                const tituloPais = document.createElement('th');
                tituloPais.textContent = 'País';

                const tituloPoblacion = document.createElement('th');
                tituloPoblacion.textContent = 'Población';

                const tituloTr = document.createElement('tr');
                tituloTr.appendChild(tituloPais);
                tituloTr.appendChild(tituloPoblacion);
                tablaPaisesIdioma.appendChild(tituloTr);

                data.forEach(pais => {
                    const tr = document.createElement('tr');

                    const tdPais = document.createElement('td');
                    tdPais.textContent = pais.name.common;

                    const tdPoblacion = document.createElement('td');
                    tdPoblacion.textContent = pais.population;

                    tr.appendChild(tdPais);
                    tr.appendChild(tdPoblacion);

                    tablaPaisesIdioma.appendChild(tr);
                });

                document.getElementById('estadoIdioma').innerText = '';
                tablaPaisesIdioma.style.display = 'table';
            } else {
                document.getElementById('estadoIdioma').innerText = 'No se encontraron países que hablen ese idioma.';
                tablaPaisesIdioma.style.display = 'none';
            }
        } else {
            document.getElementById('estadoIdioma').innerText = 'No se encontraron países que hablen ese idioma.';
            tablaPaisesIdioma.style.display = 'none';
        }
    } catch (error) {
        console.log(error);
    }
}

formulario.addEventListener('submit', consultarPais);
monedaForm.addEventListener('submit', buscarPaisesPorMoneda);
idiomaForm.addEventListener('submit', buscarPaisesPorIdioma);