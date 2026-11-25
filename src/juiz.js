// O juiz: as estrelas postas uma a uma numa grade de verdade, com a vizinhanca
// conferida casa por casa. Nada de mascara, nada de base k+1.

export function arranjosNaForca(n, k, guardar = false) {
  const grade = Array.from({ length: n }, () => new Array(n).fill(0))
  const porColuna = new Array(n).fill(0)
  const achados = []
  let total = 0

  const livre = (r, c) => {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const a = r + dr, b = c + dc
        if (a >= 0 && a < n && b >= 0 && b < n && grade[a][b]) return false
      }
    }
    return true
  }

  // linha r, ja com `naLinha` estrelas, procurando a partir da coluna c0
  function vai(r, naLinha, c0) {
    if (r === n) {
      if (porColuna.every((x) => x === k)) {
        total++
        if (guardar) achados.push(grade.map((l) => l.map((x) => (x ? '*' : '.')).join('')))
      }
      return
    }
    if (naLinha === k) return vai(r + 1, 0, 0)
    for (let c = c0; c < n; c++) {
      if (porColuna[c] === k || !livre(r, c)) continue
      grade[r][c] = 1
      porColuna[c]++
      vai(r, naLinha + 1, c + 1)
      grade[r][c] = 0
      porColuna[c]--
    }
  }

  vai(0, 0, 0)
  return guardar ? { total, achados } : total
}
