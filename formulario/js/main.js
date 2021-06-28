(function(){

    var formulario = document.formulario_registro;
    var elementos = formulario.elements;

    // ----- SE EJECUTA CUANDO EL EVENTO CLICK ES ACTIVADO

    var validarInputs = function(){
        for (var i = 0; i < elementos.length; i++) {
            // ----- IDENTIFICAMOS SI ES DE TIPO TEXTO, EMAIL O PASSWORD
            if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "password") {
                // ----- COMPROBAMOS QUE ESTEN RELLENADOS
                if (elementos[i].value.length == 0) {
                    console.log('El campo ' + elementos[i].name + ' esta incompleto');
                    elementos[i].className = elementos[i].className + " error";
                    return false;
                } else {
                    elementos[i].className = elementos[i].className.replace(" error", "");
                }
            }
        }
    
        // ----- COMPROBANDO QUE LAS CONTRASEÑAS COINCIDEN
        if (elementos.password.value !== elementos.password1.value) {
            elementos.password.value = "";
            elementos.password1.value = "";
            elementos.password.className = elementos.password.className + " error";
            elementos.password1.className = elementos.password1.className + " error";
        } else {
            elementos.password.className = elementos.password.className.replace(" error", "");
            elementos.password1.className = elementos.password1.className.replace(" error", "");
        }
    
        return true;
    };

    var validarRadios = function(){
        var opciones = document.getElementsByName('sexo');
        resultado = false;

        for (var i = 0; i < elementos.length; i++) {
            if (elementos[i].type == "radio" && elementos[i].name == "sexo") {
                // ----- RECORREMOS LOS RADIO BUTTON
                for (var o = 0; o < opciones.length; o++) {
                    if (opciones[o].checked) {
                        resultado = true;
                        break;
                    }
                }
                
                if (resultado == false ) {
                    elementos[i].parentNode.className = elementos[i].parentNode.className + " error";
                    console.log('El campo sexo está incompleto');
                    return false;
                } else {
                    // ----- ELIMINAMOS LA CLASE ERROR
                    elementos[i].parentNode.className = elementos[i].parentNode.className.replace(" error", "");
                    return true;
                }
            }   
        }
    };

    var validarCheckbox = function(){
        var opciones = document.getElementsByName('terminos');
        resultado = false;

        for (var i = 0; i < elementos.length; i++) {
            if (elementos[i].type == "checkbox") {
                for (var o = 0; o < opciones.length; o++) {
                    if (opciones[o].checked) {
                        resultado = true;
                        break;
                    }
                }

                if (resultado == false) {
                    elementos[i].parentNode.className = elementos[i].parentNode.className + " error";
                    console.log('El campo checkbox está incompleto');
                    return false;
                } else {
                    elementos[i].parentNode.className = elementos[i].parentNode.className.replace(" error", "");
                    return true;
                }
            }
            
        }
    };

    var enviar = function(e){
        if (!validarInputs()) {
            console.log('Falto validar los inputs');
            e.preventDefault();
        } else if (!validarRadios()) {
            console.log('Falto validar los radio');
            e.preventDefault();
        } else if (!validarCheckbox()) {
            console.log('Falto validar los checkbox');
            e.preventDefault();
        } else {
            console.log('Enviado correctamente');
            // e.preventDefault();
        }
    };

    // ----- FUNCIONES FOCUS Y BLUR

    var focusInput = function(){
        this.parentElement.children[1].className = "label active";
        this.parentElement.children[0].className = this.parentElement.children[0].className.replace("error", "");
    };
    
    var blurInput = function() {
        if (this.value <= 0) {
            this.parentElement.children[1].className = "label";
            this.parentElement.children[0].className = this.parentElement.children[0].className + " error";
        }  
    };

    // ----- EVENTOS

    formulario.addEventListener("submit", enviar);

    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "password") {
            elementos[i].addEventListener("focus", focusInput);
            elementos[i].addEventListener("blur", blurInput);
        }  
    }

}())