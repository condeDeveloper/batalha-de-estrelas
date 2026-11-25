// Uma funcao por tabela do README. Cada uma calculada uma vez so.

import { conta } from './estrelas.js'
import { arranjosNaForca } from './juiz.js'
import { classes, imagens } from './simetria.js'

const cache = new Map()
const guarda = (k, f) => { if (!cache.has(k)) cache.set(k, f()); return cache.get(k) }

const fatorial = (n) => { let f = 1n; for (let i = 2n; i <= BigInt(n); i++) f *= i; return f }

// uma estrela por linha e coluna: contagem e fracao das n! permutacoes
export const umaEstrela = (N) => guarda('um' + N, () => {
  const r = []
  for (let n = 1; n <= N; n++) {
    const c = conta(n, 1)
    r.push({ n, arranjos: c, fracao: Number(c) / Number(fatorial(n)) })
  }
  return r
})

// k estrelas: a contagem de n = nMin a nMax
export const kEstrelas = (k, nMin, nMax) => guarda(`k${k}:${nMin}:${nMax}`, () => {
  const r = []
  for (let n = nMin; n <= nMax; n++) r.push({ n, arranjos: conta(n, k) })
  return r
})

// a menor grade que aceita k estrelas: a primeira n com arranjo, e quantos
export function menorGrade(k, nMax) {
  for (let n = 1; n <= nMax; n++) {
    const c = conta(n, k)
    if (c > 0n) return { k, n, arranjos: c }
  }
  return null
}

// os arranjos da menor grade, pela forca bruta, e se um e o espelho do outro
export function arranjosDaMenor(k) {
  const { achados } = arranjosNaForca(4 * k, k, true)
  const espelhos = achados.length === 2 && imagens(achados[0]).some((x) => x.join('/') === achados[1].join('/'))
  return { achados, espelhos }
}

// classes por simetria, e quais simetrias tem os arranjos mais simetricos
export const simetria = (n, k) => guarda(`s${n}:${k}`, () => {
  const { achados } = arranjosNaForca(n, k, true)
  const c = classes(achados)
  // nos arranjos com 4 simetrias: algum e fixo pelo giro de 90 graus?
  let giro90 = 0
  for (const g of achados) {
    const ims = imagens(g)
    // imagens: [id, esp, giro, esp(giro), giro2, ..., giro3, ...]
    if (ims[2].join('/') === g.join('/')) giro90++
  }
  return { total: achados.length, ...c, fixosPeloGiro90: giro90 }
})

// a forca bruta contra a programacao dinamica
export function conferencia(casos) {
  return casos.map(([n, k]) => {
    const a = conta(n, k)
    const b = BigInt(arranjosNaForca(n, k))
    return { n, k, dp: a, forca: b, iguais: a === b }
  })
}
