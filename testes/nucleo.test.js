import { test } from 'node:test'
import assert from 'node:assert/strict'
import { linhas, conta } from '../src/estrelas.js'

test('linhas de 5 casas com 2 estrelas sem vizinhas: 6', () => {
  // 10100, 10010, 10001, 01010, 01001, 00101: C(4, 2) = 6
  assert.equal(linhas(5, 2).length, 6)
  for (const m of linhas(5, 2)) assert.equal(m & (m << 1), 0)
})

test('1 x 1 com uma estrela vale; 2 x 2 e 3 x 3 nao', () => {
  assert.equal(conta(1, 1), 1n)
  assert.equal(conta(2, 1), 0n)
  assert.equal(conta(3, 1), 0n)
})

test('4 x 4 com uma estrela: as duas permutacoes 2413 e 3142', () => {
  assert.equal(conta(4, 1), 2n)
})

test('a chave em texto da o mesmo que a chave numerica', () => {
  for (const [n, k] of [[8, 1], [9, 2], [12, 3]]) assert.equal(conta(n, k, { chaveTexto: true }), conta(n, k))
})

test('a poda nao tira arranjo: sem estrelas sobrando, 4k-1 nunca aceita k', () => {
  for (const k of [2, 3]) assert.equal(conta(4 * k - 1, k), 0n)
})
