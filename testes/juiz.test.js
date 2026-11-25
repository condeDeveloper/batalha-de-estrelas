import { test } from 'node:test'
import assert from 'node:assert/strict'
import { arranjosNaForca } from '../src/juiz.js'
import { conferencia } from '../src/medidas.js'
import { classes } from '../src/simetria.js'

test('a forca bruta e a programacao dinamica: uma estrela ate 8, duas ate 9, tres no 12', () => {
  const casos = []
  for (let n = 1; n <= 8; n++) casos.push([n, 1])
  for (let n = 4; n <= 9; n++) casos.push([n, 2])
  casos.push([12, 3])
  for (const l of conferencia(casos)) assert.equal(l.iguais, true, `${l.n} x ${l.n} com ${l.k}`)
})

test('a forca bruta acha os dois arranjos do 4 x 4', () => {
  const r = arranjosNaForca(4, 1, true)
  assert.deepEqual(r.achados, [['.*..', '...*', '*...', '..*.'], ['..*.', '*...', '...*', '.*..']])
})

test('classes: orbitas e Burnside dao o mesmo no 9 x 9 com uma estrela', () => {
  const r = classes(arranjosNaForca(9, 1, true).achados)
  assert.equal(r.classes, r.burnside)
  assert.equal(r.classes, 6034)
})
