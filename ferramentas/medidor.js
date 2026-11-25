// node ferramentas/medidor.js [uma N | duas | tres | menor | simetria n k | juiz]
// Sem argumento: uma 16, duas, tres, menor, simetria 9 2 e juiz.
import * as M from '../src/medidas.js'

const [qual, a1, a2] = process.argv.slice(2)
const quer = (t) => !qual || qual === t
const fmt = (n) => n.toLocaleString('pt-BR')
const t0 = Date.now()

if (quer('uma')) {
  const N = +(a1 || 16)
  console.log('## uma estrela por linha e coluna (n rainhas que so atacam a vizinha)')
  console.log('n | arranjos | fracao das n! permutacoes')
  for (const l of M.umaEstrela(N)) console.log(`${l.n} | ${fmt(l.arranjos)} | ${(100 * l.fracao).toFixed(2)}%`)
  console.log(`e^(-2) = ${(100 * Math.exp(-2)).toFixed(2)}%`)
}
if (quer('duas')) {
  console.log('## duas estrelas por linha e coluna')
  for (const l of M.kEstrelas(2, 4, 11)) console.log(`${l.n} | ${fmt(l.arranjos)}`)
}
if (quer('tres')) {
  console.log('## tres estrelas por linha e coluna')
  for (const l of M.kEstrelas(3, 8, 13)) console.log(`${l.n} | ${fmt(l.arranjos)}`)
}
if (quer('menor')) {
  console.log('## a menor grade que aceita k estrelas (fora o 1 x 1 com uma)')
  for (let k = 1; k <= 4; k++) {
    const g = k === 1 ? { n: 4, arranjos: M.kEstrelas(1, 4, 4)[0].arranjos } : M.menorGrade(k, 4 * k)
    console.log(`k = ${k}: ${g.n} x ${g.n}, ${g.arranjos} arranjos`)
  }
  for (let k = 1; k <= 3; k++) {
    const a = M.arranjosDaMenor(k)
    console.log(`k = ${k}, um e o espelho do outro: ${a.espelhos ? 'sim' : 'NAO'}`)
    console.log(a.achados[0].join('\n'))
  }
}
if (quer('simetria')) {
  const n = +(a1 || 9), k = +(a2 || 2)
  const s = M.simetria(n, k)
  console.log(`## ${n} x ${n} com ${k}: classes pelas 8 simetrias do quadrado`)
  console.log(`${fmt(s.total)} arranjos, ${fmt(s.classes)} classes (Burnside: ${fmt(s.burnside)})`)
  console.log(`classes por numero de simetrias: ${JSON.stringify(s.porEstabilizador)}; arranjos fixos pelo giro de 90 graus: ${s.fixosPeloGiro90}`)
}
if (quer('juiz')) {
  console.log('## a forca bruta contra a programacao dinamica')
  const casos = []
  for (let n = 1; n <= 9; n++) casos.push([n, 1])
  for (let n = 4; n <= 10; n++) casos.push([n, 2])
  casos.push([12, 3])
  for (const l of M.conferencia(casos)) console.log(`${l.n} x ${l.n}, ${l.k} | ${fmt(l.dp)} | ${fmt(l.forca)} | ${l.iguais ? 'igual' : 'DIFERENTE'}`)
}
console.log(`(${((Date.now() - t0) / 1000).toFixed(1)} s)`)
