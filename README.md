# Crucigrama
**Generar tu propio crucigrama** 💡

Con esta herramienta podremos cargar la estructura deseada para armar nuestro propio **crucigrama personalizado**. El crucigrama debe respetar el **formato JSON**, con la estructura que se presenta a continuación. También, se incluye un JSON de ejemplo. Con sólo modificar los valores del JSON de ejemplo, se puede obtener un nuevo crucigrama.

Accede a la herramienta [haciendo clic aquí](https://m0nt4ld0.github.io/crucigrama/).

![image](https://github.com/user-attachments/assets/d6b948e3-97ff-4738-8f10-0515ac57b297)

El JSON a insertar debe contener el siguiente formato:

- **vword**: Es la palabra a modo de "pista" que se muestra verticalmente.
- **refs**: Arreglo con las referencias del crucigrama (descripciones a modo de "pista" para que el jugador intente adivinar la palabra.
- **answers**: Arreglo con las palabras de respuesta.

A continuación, se presenta un ejemplo:

```
[
  {
     "vword": "Freud",
     "refs": [
        "Antigua teoría pseudocientífica, hoy sin validez, que afirmaba poder determinar rasgos del cáracter y de la personalidad basándose en la forma del cráneo y las facciones.",
        "Fuerza que durante el análisis «se defiende por todos los medios contra la curación y a toda costa quiere aferrarse a la enfermedad y el padecimiento»",
        "Complejo de...",
        "Fuente de estímulos en constante fluir, procedente de una excitación interna (a diferencia del estímulo que es externo) y está ligada a un objeto, el cual es transitorio. Su satisfacción es parcial.",
        "Proyección, introyección, identificación proyectiva, todos estos son mecanismos de..."
     ],
     "answers": [
        "frenologia",
        "resistencia",
        "edipo",
        "pulsion",
        "defensa"       
     ]
  }
]
```
Este JSON dará lugar al siguiente crucigrama:

![image](https://github.com/user-attachments/assets/c9478e37-1f0a-4a0e-9260-5c45e713d6e3)
