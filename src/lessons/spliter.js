<div id="simulador-splitter-p5">
  <style>
    #simulador-splitter-p5 {
      --azul: #2563eb;
      --verde: #16a34a;
      --rojo: #dc2626;
      --fondo: #f8fafc;
      --texto: #172033;
      --borde: #cbd5e1;

      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      padding: 16px;
      box-sizing: border-box;
      border: 1px solid var(--borde);
      border-radius: 16px;
      background: var(--fondo);
      color: var(--texto);
      font-family: Arial, Helvetica, sans-serif;
    }

    #simulador-splitter-p5 * {
      box-sizing: border-box;
    }

    #simulador-splitter-p5 .splitter-titulo {
      margin: 0 0 4px;
      text-align: center;
      font-size: clamp(20px, 3vw, 30px);
    }

    #simulador-splitter-p5 .splitter-subtitulo {
      margin: 0 0 14px;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }

    #simulador-splitter-p5 .splitter-controles {
      display: grid;
      grid-template-columns: repeat(5, minmax(130px, 1fr));
      gap: 12px;
      margin-bottom: 14px;
    }

    #simulador-splitter-p5 .splitter-control {
      padding: 10px;
      border: 1px solid var(--borde);
      border-radius: 10px;
      background: white;
    }

    #simulador-splitter-p5 .splitter-control label {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 7px;
      font-size: 13px;
      font-weight: 700;
    }

    #simulador-splitter-p5 input[type="range"] {
      width: 100%;
      cursor: pointer;
    }

    #simulador-splitter-p5 .color-a {
      color: var(--azul);
    }

    #simulador-splitter-p5 .color-b {
      color: var(--verde);
    }

    #simulador-splitter-p5 .color-c {
      color: var(--rojo);
    }

    #simulador-splitter-p5 .splitter-canvas {
      width: 100%;
      min-height: 480px;
      overflow: hidden;
      border: 1px solid var(--borde);
      border-radius: 12px;
      background: white;
    }

    #simulador-splitter-p5 .splitter-canvas canvas {
      display: block;
    }

    #simulador-splitter-p5 .splitter-leyenda {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;
      margin-top: 12px;
      font-size: 13px;
      font-weight: 700;
    }

    #simulador-splitter-p5 .leyenda-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    #simulador-splitter-p5 .leyenda-color {
      width: 14px;
      height: 14px;
      border-radius: 50%;
    }

    @media (max-width: 850px) {
      #simulador-splitter-p5 .splitter-controles {
        grid-template-columns: repeat(2, minmax(140px, 1fr));
      }
    }

    @media (max-width: 500px) {
      #simulador-splitter-p5 {
        padding: 10px;
      }

      #simulador-splitter-p5 .splitter-controles {
        grid-template-columns: 1fr;
      }

      #simulador-splitter-p5 .splitter-canvas {
        min-height: 560px;
      }
    }
  </style>

  <h2 class="splitter-titulo">Divisor de corriente — Splitter</h2>
  <p class="splitter-subtitulo">
    El splitter divide el caudal, pero conserva la composición de la corriente de entrada.
  </p>

  <div class="splitter-controles">
    <div class="splitter-control">
      <label>
        <span>Caudal de entrada</span>
        <span id="sp-q-valor">100 u/h</span>
      </label>
      <input id="sp-q" type="range" min="20" max="200" step="1" value="100">
    </div>

    <div class="splitter-control">
      <label>
        <span>Fracción hacia salida 1</span>
        <span id="sp-split-valor">40 %</span>
      </label>
      <input id="sp-split" type="range" min="5" max="95" step="1" value="40">
    </div>

    <div class="splitter-control">
      <label class="color-a">
        <span>Componente A</span>
        <span id="sp-a-valor">40 %</span>
      </label>
      <input id="sp-a" type="range" min="0" max="100" step="1" value="40">
    </div>

    <div class="splitter-control">
      <label class="color-b">
        <span>Componente B</span>
        <span id="sp-b-valor">35 %</span>
      </label>
      <input id="sp-b" type="range" min="0" max="100" step="1" value="35">
    </div>

    <div class="splitter-control">
      <label class="color-c">
        <span>Componente C</span>
        <span id="sp-c-valor">25 %</span>
      </label>
      <input id="sp-c" type="range" min="0" max="100" step="1" value="25">
    </div>
  </div>

  <div id="sp-canvas" class="splitter-canvas"></div>

  <div class="splitter-leyenda">
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
      const raiz = document.getElementById("simulador-splitter-p5");
      if (!raiz || raiz.dataset.iniciado === "true") return;
      raiz.dataset.iniciado = "true";

      const cargarP5 = (callback) => {
        if (window.p5) {
          callback();
          return;
        }

        const scriptExistente = document.querySelector(
          'script[data-p5-splitter="true"]'
        );

        if (scriptExistente) {
          scriptExistente.addEventListener("load", callback, { once: true });
          return;
        }

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.min.js";
        script.dataset.p5Splitter = "true";
        script.onload = callback;
        script.onerror = () => {
          raiz.querySelector("#sp-canvas").innerHTML =
            "<p style='padding:20px;color:#b91c1c'>No se pudo cargar p5.js.</p>";
        };
        document.head.appendChild(script);
      };

      cargarP5(() => {
        const qSlider = raiz.querySelector("#sp-q");
        const splitSlider = raiz.querySelector("#sp-split");
        const aSlider = raiz.querySelector("#sp-a");
        const bSlider = raiz.querySelector("#sp-b");
        const cSlider = raiz.querySelector("#sp-c");

        const qValor = raiz.querySelector("#sp-q-valor");
        const splitValor = raiz.querySelector("#sp-split-valor");
        const aValor = raiz.querySelector("#sp-a-valor");
        const bValor = raiz.querySelector("#sp-b-valor");
        const cValor = raiz.querySelector("#sp-c-valor");
        const canvasContenedor = raiz.querySelector("#sp-canvas");

        let actualizandoComposicion = false;

        function normalizarComposicion(sliderModificado) {
          if (actualizandoComposicion) return;
          actualizandoComposicion = true;

          let valores = [
            Number(aSlider.value),
            Number(bSlider.value),
            Number(cSlider.value)
          ];

          const indice = {
            [aSlider.id]: 0,
            [bSlider.id]: 1,
            [cSlider.id]: 2
          }[sliderModificado.id];

          const restante = 100 - valores[indice];
          const otros = [0, 1, 2].filter(i => i !== indice);
          const sumaOtros = valores[otros[0]] + valores[otros[1]];

          if (sumaOtros <= 0) {
            valores[otros[0]] = restante / 2;
            valores[otros[1]] = restante / 2;
          } else {
            valores[otros[0]] =
              restante * valores[otros[0]] / sumaOtros;
            valores[otros[1]] =
              restante * valores[otros[1]] / sumaOtros;
          }

          valores = valores.map(v => Math.max(0, Math.min(100, v)));

          let redondeados = valores.map(v => Math.round(v));
          const diferencia =
            100 - redondeados.reduce((suma, valor) => suma + valor, 0);

          redondeados[otros[1]] += diferencia;

          aSlider.value = redondeados[0];
          bSlider.value = redondeados[1];
          cSlider.value = redondeados[2];

          actualizandoComposicion = false;
          actualizarTextos();
        }

        function actualizarTextos() {
          qValor.textContent = `${Number(qSlider.value).toFixed(0)} u/h`;
          splitValor.textContent = `${Number(splitSlider.value).toFixed(0)} %`;
          aValor.textContent = `${Number(aSlider.value).toFixed(0)} %`;
          bValor.textContent = `${Number(bSlider.value).toFixed(0)} %`;
          cValor.textContent = `${Number(cSlider.value).toFixed(0)} %`;
        }

        [aSlider, bSlider, cSlider].forEach(slider => {
          slider.addEventListener("input", () => normalizarComposicion(slider));
        });

        qSlider.addEventListener("input", actualizarTextos);
        splitSlider.addEventListener("input", actualizarTextos);

        actualizarTextos();

        const sketch = p => {
          let particulas = [];
          let acumuladorEmision = 0;

          const colores = [
            [37, 99, 235],
            [22, 163, 74],
            [220, 38, 38]
          ];

          const obtenerDatos = () => {
            const q = Number(qSlider.value);
            const fraccion1 = Number(splitSlider.value) / 100;
            const composicion = [
              Number(aSlider.value) / 100,
              Number(bSlider.value) / 100,
              Number(cSlider.value) / 100
            ];

            return {
              q,
              fraccion1,
              q1: q * fraccion1,
              q2: q * (1 - fraccion1),
              composicion
            };
          };

          const elegirComponente = composicion => {
            const r = Math.random();
            if (r < composicion[0]) return 0;
            if (r < composicion[0] + composicion[1]) return 1;
            return 2;
          };

          class Particula {
            constructor(datos) {
              this.componente = elegirComponente(datos.composicion);
              this.salida = Math.random() < datos.fraccion1 ? 1 : 2;
              this.progreso = 0;
              this.velocidad = p.random(0.0035, 0.0065);
              this.tamano = p.random(9, 13);
              this.desfase = p.random(-7, 7);
            }

            puntoBezier(t, p0, p1, p2, p3) {
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

            posicion(geometria) {
              const tEntrada = 0.55;

              if (this.progreso <= tEntrada) {
                const t = this.progreso / tEntrada;
                return {
                  x: p.lerp(geometria.inicioX, geometria.splitterX, t),
                  y: geometria.centroY + this.desfase
                };
              }

              const t = (this.progreso - tEntrada) / (1 - tEntrada);
              const destinoY =
                this.salida === 1
                  ? geometria.salida1Y
                  : geometria.salida2Y;

              return this.puntoBezier(
                t,
                { x: geometria.splitterX, y: geometria.centroY },
                {
                  x: geometria.splitterX + geometria.ancho * 0.11,
                  y: geometria.centroY
                },
                {
                  x: geometria.finX - geometria.ancho * 0.18,
                  y: destinoY
                },
                { x: geometria.finX, y: destinoY }
              );
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
            const ancho = p.width;
            const alto = p.height;

            return {
              ancho,
              alto,
              inicioX: ancho * 0.045,
              splitterX: ancho * 0.44,
              splitterAncho: Math.max(95, ancho * 0.12),
              finX: ancho * 0.94,
              centroY: alto * 0.51,
              salida1Y: alto * 0.25,
              salida2Y: alto * 0.77
            };
          }

          function dibujarTuberia(geometria) {
            const grosorExterior = Math.max(18, p.width * 0.021);
            const grosorInterior = Math.max(10, p.width * 0.012);

            p.noFill();
            p.strokeCap(p.ROUND);

            p.stroke(148, 163, 184);
            p.strokeWeight(grosorExterior);
            p.line(
              geometria.inicioX,
              geometria.centroY,
              geometria.splitterX,
              geometria.centroY
            );

            dibujarRama(geometria, geometria.salida1Y, grosorExterior);
            dibujarRama(geometria, geometria.salida2Y, grosorExterior);

            p.stroke(255);
            p.strokeWeight(grosorInterior);
            p.line(
              geometria.inicioX,
              geometria.centroY,
              geometria.splitterX,
              geometria.centroY
            );

            dibujarRama(geometria, geometria.salida1Y, grosorInterior);
            dibujarRama(geometria, geometria.salida2Y, grosorInterior);
          }

          function dibujarRama(geometria, destinoY, grosor) {
            p.bezier(
              geometria.splitterX,
              geometria.centroY,
              geometria.splitterX + geometria.ancho * 0.11,
              geometria.centroY,
              geometria.finX - geometria.ancho * 0.18,
              destinoY,
              geometria.finX,
              destinoY
            );
          }

          function dibujarSplitter(geometria) {
            const x =
              geometria.splitterX - geometria.splitterAncho * 0.48;
            const y = geometria.centroY - 64;
            const w = geometria.splitterAncho;
            const h = 128;

            p.stroke(71, 85, 105);
            p.strokeWeight(2);
            p.fill(241, 245, 249);
            p.rect(x, y, w, h, 8);

            p.noStroke();
            p.fill(23, 32, 51);
            p.textAlign(p.CENTER, p.CENTER);
            p.textStyle(p.BOLD);
            p.textSize(Math.max(16, p.width * 0.019));
            p.text("SPLITTER", x + w / 2, y + h / 2 - 9);

            p.textStyle(p.NORMAL);
            p.textSize(Math.max(10, p.width * 0.011));
            p.fill(100, 116, 139);
            p.text("Sin reacción", x + w / 2, y + h / 2 + 17);
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
            p.textSize(Math.max(14, p.width * 0.017));
            p.fill(23, 32, 51);
            p.text(`${titulo}: ${caudal.toFixed(1)} u/h`, x, y);

            p.textStyle(p.NORMAL);
            p.textSize(Math.max(10, p.width * 0.0115));

            const texto =
              `A: ${(composicion[0] * 100).toFixed(0)} %  |  ` +
              `B: ${(composicion[1] * 100).toFixed(0)} %  |  ` +
              `C: ${(composicion[2] * 100).toFixed(0)} %`;

            p.fill(100, 116, 139);
            p.text(texto, x, y + 22);
          }

          function dibujarInformacion(geometria, datos) {
            textoCorriente(
              "Entrada",
              datos.q,
              datos.composicion,
              geometria.inicioX,
              geometria.centroY - 34,
              p.LEFT
            );

            textoCorriente(
              "Salida 1",
              datos.q1,
              datos.composicion,
              geometria.finX,
              geometria.salida1Y - 34,
              p.RIGHT
            );

            textoCorriente(
              "Salida 2",
              datos.q2,
              datos.composicion,
              geometria.finX,
              geometria.salida2Y - 34,
              p.RIGHT
            );

            p.textAlign(p.CENTER, p.CENTER);
            p.textStyle(p.BOLD);
            p.textSize(Math.max(13, p.width * 0.014));
            p.fill(30, 64, 175);
            p.text(
              `Qentrada = Q1 + Q2`,
              geometria.ancho / 2,
              geometria.alto - 48
            );

            p.textStyle(p.NORMAL);
            p.textSize(Math.max(11, p.width * 0.012));
            p.fill(71, 85, 105);
            p.text(
              `${datos.q.toFixed(1)} = ${datos.q1.toFixed(1)} + ${datos.q2.toFixed(1)} u/h`,
              geometria.ancho / 2,
              geometria.alto - 27
            );
          }

          p.setup = () => {
            const ancho = Math.max(320, canvasContenedor.clientWidth);
            const alto = ancho < 600 ? 560 : 480;
            const canvas = p.createCanvas(ancho, alto);
            canvas.parent(canvasContenedor);
            p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
          };

          p.draw = () => {
            p.background(255);

            const geometria = geometriaActual();
            const datos = obtenerDatos();

            dibujarTuberia(geometria);
            dibujarSplitter(geometria);

            const emisionesPorSegundo = p.map(datos.q, 20, 200, 4, 24);
            acumuladorEmision += emisionesPorSegundo / 60;

            while (acumuladorEmision >= 1) {
              particulas.push(new Particula(datos));
              acumuladorEmision -= 1;
            }

            particulas.forEach(particula => {
              particula.actualizar();
              particula.dibujar(geometria);
            });

            particulas = particulas.filter(particula => !particula.termino());

            if (particulas.length > 350) {
              particulas.splice(0, particulas.length - 350);
            }

            dibujarInformacion(geometria, datos);
          };

          p.windowResized = () => {
            const ancho = Math.max(320, canvasContenedor.clientWidth);
            const alto = ancho < 600 ? 560 : 480;
            p.resizeCanvas(ancho, alto);
          };
        };

        new p5(sketch);
      });
    })();
  </script>
</div>