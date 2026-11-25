// Batalha de estrelas (Star Battle): numa grade n x n, k estrelas em cada
// linha e em cada coluna, e nenhuma estrela encostada em outra, nem na
// diagonal. O quebra-cabeca de jornal ainda divide a grade em regioes com k
// estrelas cada; aqui se conta o que sobra sem as regioes, que e o espaco de
// onde toda solucao sai.
//
// Programacao dinamica linha por linha. Estado: a mascara da linha anterior e
// quantas estrelas cada coluna ja tem (em base k+1).

// as mascaras de uma linha com k estrelas, sem duas vizinhas
export function linhas(n, k) {
  const r = []
  for (let m = 0; m < 1 << n; m++) {
    if (m & (m << 1)) continue
    let b = 0
    for (let x = m; x; x &= x - 1) b++
    if (b === k) r.push(m)
  }
  return r
}

export function conta(n, k, { chaveTexto = false } = {}) {
  const L = linhas(n, k)
  const base = k + 1
  const pot = []
  for (let c = 0, p = 1; c < n; c++, p *= base) pot.push(p)
  // estado: colunas (numero em base k+1) e a mascara anterior. Enquanto
  // (k+1)^n * 2^n cabe em 2^53 a chave e um numero so; acima disso vira
  // texto, senao estados diferentes caem na mesma chave sem aviso.
  const cabeNumero = !chaveTexto && Math.pow(base, n) * Math.pow(2, n) < Number.MAX_SAFE_INTEGER
  const junta = cabeNumero ? (cols, m) => cols * (1 << n) + m : (cols, m) => cols + ',' + m
  const separa = cabeNumero
    ? (ch) => [Math.floor(ch / (1 << n)), ch % (1 << n)]
    : (ch) => { const i = ch.indexOf(','); return [Number(ch.slice(0, i)), Number(ch.slice(i + 1))] }
  let estados = new Map([[junta(0, 0), 1n]])
  for (let r = 0; r < n; r++) {
    const prox = new Map()
    const faltam = n - r - 1 // linhas que ainda vem depois desta
    for (const [chave, v] of estados) {
      const [cols, ant] = separa(chave)
      const proibido = ant | (ant << 1) | (ant >> 1)
      for (const m of L) {
        if (m & proibido) continue
        let novo = cols
        let ok = true
        for (let c = 0; c < n && ok; c++) {
          if (!((m >> c) & 1)) continue
          const q = Math.floor(novo / pot[c]) % base
          if (q === k) ok = false
          else novo += pot[c]
        }
        if (!ok) continue
        // poda: a coluna c ainda precisa de k - q estrelas nas linhas que
        // faltam, e na mesma coluna duas estrelas nao podem estar em linhas
        // seguidas: cabem ceil(f/2), ou floor(f/2) se esta linha ja tem
        // estrela em c
        let cabe = true
        for (let c = 0; c < n && cabe; c++) {
          const q = Math.floor(novo / pot[c]) % base
          const max = (m >> c) & 1 ? Math.floor(faltam / 2) : Math.ceil(faltam / 2)
          if (k - q > max) cabe = false
        }
        if (!cabe) continue
        const k2 = junta(novo, m)
        prox.set(k2, (prox.get(k2) || 0n) + v)
      }
    }
    estados = prox
  }
  let total = 0n
  for (const v of estados.values()) total += v
  return total
}
