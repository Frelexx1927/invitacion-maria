// 1. REEMPLAZA ESTA URL por el enlace que te dio Google Apps Script
const URL_BASE_DATOS = 'https://script.google.com/macros/s/AKfycbySF7AykTj7T5rhztQFVj0ar4KCCzM2EIbfL4fW1H6rEkbe9WB-i01HpQqbYJtpjyFL/exec';

// Referencias a las dos escenas
const escena1 = document.getElementById('escenaInvitacion');
const escena2 = document.getElementById('escenaFormulario');

// Botones de navegación
const btnIrAConfirmar = document.getElementById('btnIrAConfirmar');
const btnVolver = document.getElementById('btnVolver');
const formConfirmacion = document.getElementById('formConfirmacion');
const btnEnviar = document.getElementById('btnEnviar');

// Cambiar a Escena 2 (Formulario)
btnIrAConfirmar.addEventListener('click', () => {
    escena1.classList.add('oculta');
    escena2.classList.remove('oculta');
});

// Volver a Escena 1 (Invitación)
btnVolver.addEventListener('click', () => {
    escena2.classList.add('oculta');
    escena1.classList.remove('oculta');
});

// Enviar datos y GUARDAR EN LA BASE DE DATOS
formConfirmacion.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const personas = document.getElementById('cantPersonas').value;

    // Cambiar texto del botón mientras se guarda en la base de datos
    btnEnviar.textContent = 'Guardando...';
    btnEnviar.disabled = true;

    try {
        // Enviar la información a la hoja de Google Sheets
        await fetch(URL_BASE_DATOS, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombre,
                personas: personas
            })
        });

        alert(`¡Muchas gracias, ${nombre}! Tu confirmación para ${personas} persona(s) ha sido registrada exitosamente. ❤️`);

        // Resetear formulario y volver a la invitación principal
        formConfirmacion.reset();
        escena2.classList.add('oculta');
        escena1.classList.remove('oculta');

    } catch (error) {
        alert('Hubo un error al registrar tu confirmación. Inténtalo de nuevo.');
        console.error(error);
    } finally {
        btnEnviar.textContent = 'ENVIAR CONFIRMACIÓN';
        btnEnviar.disabled = false;
    }
});