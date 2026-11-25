// Os numeros do README presos. Se o codigo mudar e o numero mudar, quebra.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { umaEstrela, kEstrelas, menorGrade, arranjosDaMenor, simetria } from '../src/medidas.js'

test('uma estrela ate 16, e a fracao subindo para e^-2', () => {
  const u = umaEstrela(16)
  assert.deepEqual(u.slice(0, 10).map((l) => l.arranjos), [1n, 0n, 0n, 2n, 14n, 90n, 646n, 5242n, 47622n, 479306n])
  assert.equal(u[15].arranjos, 2806878055610n)
  assert.equal((100 * u[15].fracao).toFixed(2), '13.42')
  for (let i = 4; i < 16; i++) assert.ok(u[i].fracao > u[i - 1].fracao && u[i].fracao < Math.exp(-2))
})

test('duas estrelas: nada ate 7 x 7, 2 no 8 x 8, 146.510 no 10 x 10', () => {
  assert.deepEqual(kEstrelas(2, 4, 11).map((l) => l.arranjos), [0n, 0n, 0n, 0n, 2n, 664n, 146510n, 31197434n])
})

test('tres estrelas: nada ate 11 x 11, 2 no 12 x 12, 42.732 no 13 x 13', () => {
  assert.deepEqual(kEstrelas(3, 8, 13).map((l) => l.arranjos), [0n, 0n, 0n, 0n, 2n, 42732n])
})

test('a menor grade com k estrelas e 4k x 4k, com 2 arranjos, para k = 2, 3, 4', () => {
  for (const k of [2, 3, 4]) {
    const g = menorGrade(k, 4 * k)
    assert.equal(g.n, 4 * k)
    assert.equal(g.arranjos, 2n)
  }
})

test('nas menores grades os dois arranjos sao espelho um do outro', () => {
  for (const k of [1, 2, 3]) assert.equal(arranjosDaMenor(k).espelhos, true)
})

test('9 x 9 com duas: 664 arranjos em 86 classes', () => {
  const s = simetria(9, 2)
  assert.equal(s.total, 664)
  assert.equal(s.classes, 86)
  assert.equal(s.burnside, 86)
  assert.deepEqual(s.porEstabilizador, { 1: 80, 2: 6 })
})
