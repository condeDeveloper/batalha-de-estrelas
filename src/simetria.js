// Os arranjos a menos das 8 simetrias do quadrado (4 giros e 4 espelhos).
// Cada arranjo e uma lista de n textos ('*' estrela, '.' vazio).

const giro = (g) => g.map((_, r) => g.map((l) => l[r]).reverse().join(''))
const espelho = (g) => g.map((l) => l.split('').reverse().join(''))

export function imagens(g) {
  const r = []
  let a = g
  for (let i = 0; i < 4; i++) {
    r.push(a, espelho(a))
    a = giro(a)
  }
  return r
}

// classes e, para conferir, a soma de |Est|/8 (Burnside pelo lado das orbitas)
export function classes(arranjos) {
  const vistos = new Set()
  let classes = 0
  let somaEst = 0
  const porEst = {}
  for (const g of arranjos) {
    const ims = imagens(g).map((x) => x.join('/'))
    const eu = g.join('/')
    const est = ims.filter((x) => x === eu).length
    somaEst += est
    const can = ims.reduce((a, b) => (a < b ? a : b))
    if (!vistos.has(can)) {
      vistos.add(can)
      classes++
      porEst[est] = (porEst[est] || 0) + 1
    }
  }
  return { classes, burnside: somaEst / 8, porEstabilizador: porEst }
}
