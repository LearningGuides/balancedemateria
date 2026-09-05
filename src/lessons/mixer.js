<div id="simulador-mixer-p5">
  <style>
    #simulador-mixer-p5 {
      --azul: #2563eb;
      --verde: #16a34a;
      --rojo: #dc2626;
      --fondo: #f8fafc;
      --texto: #172033;
      --borde: #cbd5e1;

      width: 100%;
      max-width: 1150px;
      margin: 0 auto;
      padding: 16px;
      box-sizing: border-box;
      border: 1px solid var(--borde);
      border-radius: 16px;
      background: var(--fondo);
      color: var(--texto);
      font-family: Arial, Helvetica, sans-serif;
    }

    #simulador-mixer-p5 * {
      box-sizing: border-box;
    }

    #simulador-mixer-p5 .mixer-titulo {
      margin: 0 0 4px;
      text-align: center;
      font-size: clamp(20px, 3vw, 30px);
    }

    #simulador-mixer-p5 .mixer-subtitulo {
      margin: 0 0 14px;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }

    #simulador-mixer-p5 .mixer-paneles {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 14px;
    }

    #simulador-mixer-p5 .mixer-panel {
      padding: 12px;
      border: 1px solid var(--borde);
      border-radius: 12px;
      background: white;
    }

    #simulador-mixer-p5 .mixer-panel h3 {
      margin: 0 0 10px;
      font-size: 16px;
      color: #334155;
    }

    #simulador-mixer-p5 .mixer-controles {
      display: grid;
      grid-template-columns: repeat(2, minmax(130px, 1fr));
      gap: 10px;
    }

    #simulador-mixer-p5 .mixer-control {
      padding: 9px;
      border: 1px solid #e2e8f0;
      border-radius: 9px;
      background: #f8fafc;
    }

    #simulador-mixer-p5 .mixer-control label {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
      font-size: 12px;
      font-weight: 700;
    }

    #simulador-mixer-p5 input[type="range"] {
      width: 100%;
      cursor: pointer;
    }

    #simulador-mixer-p5 .color-a {
      color: var(--azul);
    }

    #simulador-mixer-p5 .color-b {
      color: var(--verde);
    }

    #simulador-mixer-p5 .color-c {
      color: var(--rojo);
    }

    #simulador-mixer-p5 .mixer-canvas {
      width: 100%;
      min-height: 500px;
      overflow: hidden;
      border: 1px solid var(--borde);
      border-radius: 12px;
      background: white;
    }

    #simulador-mixer-p5 .mixer-canvas canvas {
      display: block;
    }

    #simulador-mixer-p5 .mixer-leyenda {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;
      margin-top: 12px;
      font-size: 13px;
      font-weight: 700;
    }

    #simulador-mixer-p5 .leyenda-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    #simulador-mixer-p5 .leyenda-color {
      width: 14px;
      height: 14px;
      border-radius: 50%;
    }

    @media (max-width: 850px) {
      #simulador-mixer-p5 .mixer-paneles {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 560px) {
      #simulador-mixer-p5 {
        padding: 10px;
      }

      #simulador-mixer-p5 .mixer-controles {
        grid-template-columns: 1fr;
      }

      #simulador-mixer-p5 .mixer-canvas {
        min-height: 620px;
      }
    }
  </style>

  <h2 class="mixer-titulo">Mezclador de corrientes — Mixer</h2>

  <p class="mixer-subtitulo">
    Dos corrientes se combinan para formar una sola corriente de salida.
  </p>

  <div class="mixer-paneles">
    <div class="mixer-panel">
      <h3>Corriente de entrada 1</h3>

      <div class="mixer-controles">
        <div class="mixer-control">
          <label>
            <span>Caudal Q1</span>
            <span id="mx-q1-valor">60 u/h</span>
          </label>
          <input id="mx-q1" type="range" min="5" max="150" step="1" value="60">
        </div>

        <div class="mixer-control">
          <label class="color-a">
            <span>Componente A</span>
            <span id="mx-a1-valor">60 %</span>
          </label>
          <input id="mx-a1" type="range" min="0" max="100" step="1" value="60">
        </div>

        <div class="mixer-control">
          <label class="color-b">
            <span>Componente B</span>
            <span id="mx-b1-valor">30 %</span>
          </label>
          <input id="mx-b1" type="range" min="0" max="100" step="1" value="30">
        </div>

        <div class="mixer-control">
          <label class="color-c">
            <span>Componente C</span>
            <span id="mx-c1-valor">10 %</span>
          </label>
          <input id="mx-c1" type="range" min="0" max="100" step="1" value="10">
        </div>
      </div>
    </div>

    <div class="mixer-panel">
      <h3>Corriente de entrada 2</h3>

      <div class="mixer-controles">
        <div class="mixer-control">
          <label>
            <span>Caudal Q2</span>
            <span id="mx-q2-valor">40 u/h</span>
          </label>
          <input id="mx-q2" type="range" min="5" max="150" step="1" value="40">
        </div>

        <div class="mixer-control">
          <label class="color-a">
            <span>Componente A</span>
            <span id="mx-a2-valor">10 %</span>
          </label>
          <input id="mx-a2" type="range" min="0" max="100" step="1" value="10">
        </div>

        <div class="mixer-control">
          <label class="color-b">
            <span>Componente B</span>
            <span id="mx-b2-valor">30 %</span>
          </label>
          <input id="mx-b2" type="range" min="0" max="100" step="1" value="30">
        </div>

        <div class="mixer-control">
          <label class="color-c">
            <span>Componente C</span>
            <span id="mx-c2-valor">60 %</span>
          </label>
          <input id="mx-c2" type="range" min="0" max="100" step="1" value="60">
        </div>
      </div>
    </div>
  </div>

  <div id="mx-canvas" class="mixer-canvas"></div>

  <div class="mixer-leyenda">
    <div class="leyenda-item">
      <span class="leyenda-color" style="background:#2563eb"></span>
      Componente A
    </div>

    <div class="leyenda-item">
      <span class="leyenda-color" style="background:#16a34a"></span>
      Componente B
    </div>

    <div class="leyenda-item">
      <span class="leyenda-color" style="background:#dc2626"></span>
      Componente C
    </div>
  </div>

  <script>
    (() => {
      const raiz = document.getElementById("simulador-mixer-p5");

      if (!raiz || raiz.dataset.iniciado === "true") return;

      raiz.dataset.iniciado = "true";

      function cargarP5(callback) {
        if (window.p5) {
          callback();
          return;
        }

        const scriptExistente = document.querySelector(
          'script[data-p5-mixer="true"]'
        );

        if (scriptExistente) {
          scriptExistente.addEventListener("load", callback, { once: true });
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.min.js";
        script.dataset.p5Mixer = "true";

        script.onload = callback;

        script.onerror = () => {
          raiz.querySelector("#mx-canvas").innerHTML =
            "<p style='padding:20px;color:#b91c1c'>No se pudo cargar p5.js.</p>";
        };

        document.head.appendChild(script);
      }

      cargarP5(() => {
        const q1Slider = raiz.querySelector("#mx-q1");
        const q2Slider = raiz.querySelector("#mx-q2");

        const a1Slider = raiz.querySelector("#mx-a1");
        const b1Slider = raiz.querySelector("#mx-b1");
        const c1Slider = raiz.querySelector("#mx-c1");

        const a2Slider = raiz.querySelector("#mx-a2");
        const b2Slider = raiz.querySelector("#mx-b2");
        const c2Slider = raiz.querySelector("#mx-c2");

        const q1Valor = raiz.querySelector("#mx-q1-valor");
        const q2Valor = raiz.querySelector("#mx-q2-valor");

        const a1Valor = raiz.querySelector("#mx-a1-valor");
        const b1Valor = raiz.querySelector("#mx-b1-valor");
        const c1Valor = raiz.querySelector("#mx-c1-valor");

        const a2Valor = raiz.querySelector("#mx-a2-valor");
        const b2Valor = raiz.querySelector("#mx-b2-valor");
        const c2Valor = raiz.querySelector("#mx-c2-valor");

        const canvasContenedor = raiz.querySelector("#mx-canvas");

        let actualizando = false;

        function normalizarGrupo(sliderModificado, sliders) {
          if (actualizando) return;

          actualizando = true;

          let valores = sliders.map(slider => Number(slider.value));
          const indice = sliders.indexOf(sliderModificado);
          const otros = [0, 1, 2].filter(i => i !== indice);

          const restante = 100 - valores[indice];
          const sumaOtros =
            valores[otros[0]] + valores[otros[1]];

          if (sumaOtros <= 0) {
            valores[otros[0]] = restante / 2;
            valores[otros[1]] = restante / 2;
          } else {
            valores[otros[0]] =
              restante * valores[otros[0]] / sumaOtros;

            valores[otros[1]] =
              restante * valores[otros[1]] / sumaOtros;
          }

          let redondeados = valores.map(valor =>
            Math.max(0, Math.min(100, Math.round(valor)))
          );

          const diferencia =
            100 - redondeados.reduce((suma, valor) => suma + valor, 0);

          redondeados[otros[1]] += diferencia;

          sliders.forEach((slider, i) => {
            slider.value = redondeados[i];
          });

          actualizando = false;
          actualizarTextos();
        }

        function actualizarTextos() {
          q1Valor.textContent = `${Number(q1Slider.value).toFixed(0)} u/h`;
          q2Valor.textContent = `${Number(q2Slider.value).toFixed(0)} u/h`;

          a1Valor.textContent = `${Number(a1Slider.value).toFixed(0)} %`;
          b1Valor.textContent = `${Number(b1Slider.value).toFixed(0)} %`;
          c1Valor.textContent = `${Number(c1Slider.value).toFixed(0)} %`;

          a2Valor.textContent = `${Number(a2Slider.value).toFixed(0)} %`;
          b2Valor.textContent = `${Number(b2Slider.value).toFixed(0)} %`;
          c2Valor.textContent = `${Number(c2Slider.value).toFixed(0)} %`;
        }

        [a1Slider, b1Slider, c1Slider].forEach(slider => {
          slider.addEventListener("input", () => {
            normalizarGrupo(
              slider,
              [a1Slider, b1Slider, c1Slider]
            );
          });
        });

        [a2Slider, b2Slider, c2Slider].forEach(slider => {
          slider.addEventListener("input", () => {
            normalizarGrupo(
              slider,
              [a2Slider, b2Slider, c2Slider]
            );
          });
        });

        q1Slider.addEventListener("input", actualizarTextos);
        q2Slider.addEventListener("input", actualizarTextos);

        actualizarTextos();

        const sketch = p => {
          let particulas = [];
          let acumulador1 = 0;
          let acumulador2 = 0;

          const colores = [
            [37, 99, 235],
            [22, 163, 74],
            [220, 38, 38]
          ];

          function obtenerDatos() {
            const q1 = Number(q1Slider.value);
            const q2 = Number(q2Slider.value);
            const qSalida = q1 + q2;

            const composicion1 = [
              Number(a1Slider.value) / 100,
              Number(b1Slider.value) / 100,
              Number(c1Slider.value) / 100
            ];

            const composicion2 = [
              Number(a2Slider.value) / 100,
              Number(b2Slider.value) / 100,
              Number(c2Slider.value) / 100
            ];

            const composicionSalida = [
              (
                q1 * composicion1[0] +
                q2 * composicion2[0]
              ) / qSalida,

              (
                q1 * composicion1[1] +
                q2 * composicion2[1]
              ) / qSalida,

              (
                q1 * composicion1[2] +
                q2 * composicion2[2]
              ) / qSalida
            ];

            return {
              q1,
              q2,
              qSalida,
              composicion1,
              composicion2,
              composicionSalida
            };
          }

          function elegirComponente(composicion) {
            const r = Math.random();

            if (r < composicion[0]) return 0;

            if (r < composicion[0] + composicion[1]) return 1;

            return 2;
          }

          function puntoBezier(t, p0, p1, p2, p3) {
            const u = 1 - t;

            return {
              x:
                u * u * u * p0.x +
                3 * u * u * t * p1.x +
                3 * u * t * t * p2.x +
                t * t * t * p3.x,

              y:
                u * u * u * p0.y +
                3 * u * u * t * p1.y +
                3 * u * t * t * p2.y +
                t * t * t * p3.y
            };
          }

          class Particula {
            constructor(entrada, composicion) {
              this.entrada = entrada;
              this.componente = elegirComponente(composicion);
              this.progreso = 0;
              this.velocidad = p.random(0.0035, 0.006);
              this.tamano = p.random(9, 13);
              this.desfase = p.random(-6, 6);
            }

            posicion(geometria) {
              const puntoUnion = 0.58;

              if (this.progreso <= puntoUnion) {
                const t = this.progreso / puntoUnion;

                const inicioY =
                  this.entrada === 1
                    ? geometria.entrada1Y
                    : geometria.entrada2Y;

                return puntoBezier(
                  t,
                  {
                    x: geometria.inicioX,
                    y: inicioY + this.desfase
                  },
                  {
                    x: geometria.ancho * 0.28,
                    y: inicioY + this.desfase
                  },
                  {
                    x: geometria.mixerX - geometria.ancho * 0.08,
                    y: geometria.centroY + this.desfase
                  },
                  {
                    x: geometria.mixerX,
                    y: geometria.centroY + this.desfase
                  }
                );
              }

              const t =
                (this.progreso - puntoUnion) /
                (1 - puntoUnion);

              return {
                x: p.lerp(
                  geometria.mixerX,
                  geometria.finX,
                  t
                ),

                y: geometria.centroY + this.desfase
              };
            }

            actualizar() {
              this.progreso += this.velocidad;
            }

            dibujar(geometria) {
              const pos = this.posicion(geometria);
              const color = colores[this.componente];

              p.noStroke();
              p.fill(color[0], color[1], color[2], 235);
              p.circle(pos.x, pos.y, this.tamano);

              p.fill(255, 255, 255, 75);
              p.circle(
                pos.x - this.tamano * 0.17,
                pos.y - this.tamano * 0.17,
                this.tamano * 0.3
              );
            }

            termino() {
              return this.progreso > 1.03;
            }
          }

          function geometriaActual() {
            return {
              ancho: p.width,
              alto: p.height,
              inicioX: p.width * 0.055,
              mixerX: p.width * 0.48,
              finX: p.width * 0.94,
              centroY: p.height * 0.5,
              entrada1Y: p.height * 0.27,
              entrada2Y: p.height * 0.73,
              mixerAncho: Math.max(100, p.width * 0.12),
              mixerAlto: 130
            };
          }

          function dibujarTuberias(geometria) {
            const grosorExterior = Math.max(18, p.width * 0.021);
            const grosorInterior = Math.max(10, p.width * 0.012);

            p.noFill();
            p.strokeCap(p.ROUND);

            p.stroke(148, 163, 184);
            p.strokeWeight(grosorExterior);

            dibujarEntrada(
              geometria,
              geometria.entrada1Y
            );

            dibujarEntrada(
              geometria,
              geometria.entrada2Y
            );

            p.line(
              geometria.mixerX,
              geometria.centroY,
              geometria.finX,
              geometria.centroY
            );

            p.stroke(255);
            p.strokeWeight(grosorInterior);

            dibujarEntrada(
              geometria,
              geometria.entrada1Y
            );

            dibujarEntrada(
              geometria,
              geometria.entrada2Y
            );

            p.line(
              geometria.mixerX,
              geometria.centroY,
              geometria.finX,
              geometria.centroY
            );
          }

          function dibujarEntrada(geometria, inicioY) {
            p.bezier(
              geometria.inicioX,
              inicioY,
              geometria.ancho * 0.28,
              inicioY,
              geometria.mixerX - geometria.ancho * 0.08,
              geometria.centroY,
              geometria.mixerX,
              geometria.centroY
            );
          }

          function dibujarMixer(geometria) {
            const x =
              geometria.mixerX -
              geometria.mixerAncho * 0.48;

            const y =
              geometria.centroY -
              geometria.mixerAlto / 2;

            p.stroke(71, 85, 105);
            p.strokeWeight(2);
            p.fill(241, 245, 249);

            p.rect(
              x,
              y,
              geometria.mixerAncho,
              geometria.mixerAlto,
              8
            );

            p.noStroke();
            p.textAlign(p.CENTER, p.CENTER);
            p.textStyle(p.BOLD);
            p.textSize(Math.max(16, p.width * 0.018));
            p.fill(23, 32, 51);

            p.text(
              "MIXER",
              x + geometria.mixerAncho / 2,
              y + geometria.mixerAlto / 2 - 10
            );

            p.textStyle(p.NORMAL);
            p.textSize(Math.max(10, p.width * 0.011));
            p.fill(100, 116, 139);

            p.text(
              "Mezcla completa",
              x + geometria.mixerAncho / 2,
              y + geometria.mixerAlto / 2 + 18
            );
          }

          function textoCorriente(
            titulo,
            caudal,
            composicion,
            x,
            y,
            alineacion
          ) {
            p.noStroke();
            p.textAlign(alineacion, p.BOTTOM);
            p.textStyle(p.BOLD);
            p.textSize(Math.max(13, p.width * 0.016));
            p.fill(23, 32, 51);

            p.text(
              `${titulo}: ${caudal.toFixed(1)} u/h`,
              x,
              y
            );

            p.textStyle(p.NORMAL);
            p.textSize(Math.max(9, p.width * 0.0105));
            p.fill(100, 116, 139);

            const texto =
              `A: ${(composicion[0] * 100).toFixed(1)} %  |  ` +
              `B: ${(composicion[1] * 100).toFixed(1)} %  |  ` +
              `C: ${(composicion[2] * 100).toFixed(1)} %`;

            p.text(texto, x, y + 21);
          }

          function dibujarInformacion(geometria, datos) {
            textoCorriente(
              "Entrada 1",
              datos.q1,
              datos.composicion1,
              geometria.inicioX,
              geometria.entrada1Y - 38,
              p.LEFT
            );

            textoCorriente(
              "Entrada 2",
              datos.q2,
              datos.composicion2,
              geometria.inicioX,
              geometria.entrada2Y - 38,
              p.LEFT
            );

            textoCorriente(
              "Salida",
              datos.qSalida,
              datos.composicionSalida,
              geometria.finX,
              geometria.centroY - 38,
              p.RIGHT
            );

            p.textAlign(p.CENTER, p.CENTER);
            p.textStyle(p.BOLD);
            p.textSize(Math.max(13, p.width * 0.014));
            p.fill(30, 64, 175);

            p.text(
              "Qsalida = Q1 + Q2",
              geometria.ancho / 2,
              geometria.alto - 58
            );

            p.textStyle(p.NORMAL);
            p.textSize(Math.max(11, p.width * 0.012));
            p.fill(71, 85, 105);

            p.text(
              `${datos.qSalida.toFixed(1)} = ` +
              `${datos.q1.toFixed(1)} + ` +
              `${datos.q2.toFixed(1)} u/h`,
              geometria.ancho / 2,
              geometria.alto - 36
            );

            p.textSize(Math.max(9, p.width * 0.0105));

            p.text(
              "xi,salida = " +
              "(Q1·xi,1 + Q2·xi,2) / (Q1 + Q2)",
              geometria.ancho / 2,
              geometria.alto - 16
            );
          }

          p.setup = () => {
            const ancho = Math.max(
              320,
              canvasContenedor.clientWidth
            );

            const alto = ancho < 600 ? 620 : 500;

            const canvas = p.createCanvas(ancho, alto);
            canvas.parent(canvasContenedor);

            p.pixelDensity(
              Math.min(window.devicePixelRatio || 1, 2)
            );
          };

          p.draw = () => {
            p.background(255);

            const geometria = geometriaActual();
            const datos = obtenerDatos();

            dibujarTuberias(geometria);
            dibujarMixer(geometria);

            const emisiones1 = p.map(
              datos.q1,
              5,
              150,
              2,
              18
            );

            const emisiones2 = p.map(
              datos.q2,
              5,
              150,
              2,
              18
            );

            acumulador1 += emisiones1 / 60;
            acumulador2 += emisiones2 / 60;

            while (acumulador1 >= 1) {
              particulas.push(
                new Particula(
                  1,
                  datos.composicion1
                )
              );

              acumulador1 -= 1;
            }

            while (acumulador2 >= 1) {
              particulas.push(
                new Particula(
                  2,
                  datos.composicion2
                )
              );

              acumulador2 -= 1;
            }

            particulas.forEach(particula => {
              particula.actualizar();
              particula.dibujar(geometria);
            });

            particulas = particulas.filter(
              particula => !particula.termino()
            );

            if (particulas.length > 400) {
              particulas.splice(
                0,
                particulas.length - 400
              );
            }

            dibujarInformacion(geometria, datos);
          };

          p.windowResized = () => {
            const ancho = Math.max(
              320,
              canvasContenedor.clientWidth
            );

            const alto = ancho < 600 ? 620 : 500;

            p.resizeCanvas(ancho, alto);
          };
        };

        new p5(sketch);
      });
    })();
  </script>
</div>