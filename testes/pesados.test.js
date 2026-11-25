// O 10 x 10 com duas estrelas inteiro pela forca bruta, e as classes dele (~25 s).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { simetria, conferencia } from '../src/medidas.js'

test('10 x 10 com duas: a forca bruta acha os 146.510', { timeout: 600000 }, () => {
  const [l] = conferencia([[10, 2]])
  assert.equal(l.forca, 146510n)
  assert.equal(l.iguais, true)
})

test('10 x 10 com duas: 18.438 classes, 13 com quatro simetrias, 22 arranjos fixos pelo giro de 90 graus', { timeout: 600000 }, () => {
  const s = simetria(10, 2)
  assert.equal(s.classes, 18438)
  assert.equal(s.burnside, 18438)
  assert.deepEqual(s.porEstabilizador, { 1: 18196, 2: 229, 4: 13 })
  assert.equal(s.fixosPeloGiro90, 22)
})
