# Batalha de estrelas

A Batalha de Estrelas (Star Battle) sem as regiões: numa grade n×n, **k estrelas em cada linha e em cada coluna**, e nenhuma estrela encostada em outra, nem na diagonal. O quebra-cabeça de jornal ainda divide a grade em regiões com k estrelas cada; aqui se conta o espaço de onde toda solução sai. Em Node puro, sem dependência nenhuma.

---

## Os quatro achados

**1. A menor grade que aceita k estrelas é 4k×4k, e nela há só 2 arranjos, um o espelho do outro.** Com 2 estrelas nada cabe até 7×7, e o 8×8 tem exatamente 2 arranjos; com 3, nada até 11×11 e 2 no 12×12; com 4, nada até 15×15 e 2 no 16×16. Com 1 estrela é o 4×4, também com 2 (fora o 1×1, em que a única casa leva a única estrela). Nos três primeiros casos a força bruta acha os dois e confere que um é o espelho do outro.

**2. O 10×10 de jornal com 2 estrelas tem 146.510 arranjos, e só 18.438 essencialmente diferentes.** Juntando os que um giro ou um espelho leva um no outro, sobram 18.438 classes: 18.196 sem simetria nenhuma, 229 com duas simetrias e só **13 com quatro**. Há 22 arranjos que ficam iguais girando a grade de 90°.

**3. Uma linha a mais que o mínimo multiplica por centenas ou milhares.** Com 2 estrelas, do 8×8 para o 9×9 os arranjos vão de 2 para 664 (332 vezes). Com 3, do 12×12 para o 13×13 vão de 2 para 42.732 (21.366 vezes).

**4. Com uma estrela, a fração das permutações que serve sobe para e^(−2) sem passar.** Uma estrela por linha e coluna é uma permutação em que linhas vizinhas não têm estrelas em colunas vizinhas (o problema de Hertzsprung). A fração das `n!` permutações que serve sobe a cada `n` a partir do 4×4: 12,50% no 6×6, 13,21% no 10×10, **13,42%** no 16×16, sempre abaixo de e^(−2) = 13,53%.

---

## As tabelas

Todos os números saem de `node ferramentas/medidor.js` e estão presos em `testes/`.

### Uma estrela

| n | arranjos | das n! |
| --- | --- | --- |
| 1 | 1 | 100,00% |
| 2 | 0 | 0 |
| 3 | 0 | 0 |
| 4 | 2 | 8,33% |
| 5 | 14 | 11,67% |
| 6 | 90 | 12,50% |
| 7 | 646 | 12,82% |
| 8 | 5.242 | 13,00% |
| 9 | 47.622 | 13,12% |
| 10 | 479.306 | 13,21% |
| 11 | 5.296.790 | 13,27% |
| 12 | 63.779.034 | 13,31% |
| 13 | 831.283.558 | 13,35% |
| 14 | 11.661.506.218 | 13,38% |
| 15 | 175.203.184.374 | 13,40% |
| 16 | 2.806.878.055.610 | 13,42% |

### Duas e três estrelas

| n | duas | três |
| --- | --- | --- |
| 4 a 7 | 0 | 0 |
| 8 | **2** | 0 |
| 9 | 664 | 0 |
| 10 | 146.510 | 0 |
| 11 | 31.197.434 | 0 |
| 12 | | **2** |
| 13 | | 42.732 |

### Os dois arranjos do 8×8 com duas estrelas

O primeiro, como a força bruta o acha; o outro é ele no espelho.

```
.*.*....
.....*.*
.*.*....
.....*.*
*.*.....
....*.*.
*.*.....
....*.*.
```

O do 12×12 com três estrelas tem o mesmo desenho: blocos de três estrelas alternando entre a metade esquerda e a direita, com a virada no meio.

---

## Os juízes

**A força bruta.** `src/juiz.js` põe as estrelas uma a uma numa grade de verdade e confere as 8 casas vizinhas de cada uma, sem máscara de bits. Ela bate com a programação dinâmica em todos os casos medidos: uma estrela de 1×1 a 9×9, duas de 4×4 a 10×10 (os 146.510 do 10×10, um por um) e três no 12×12.

**Órbitas contra Burnside.** As classes por simetria saem de dois jeitos: a menor das 8 imagens de cada arranjo, e a soma de `|simetrias|/8` sobre todos os arranjos. Dão o mesmo no 9×9 e no 10×10.

**Chave em texto contra chave numérica.** A programação dinâmica guarda o estado num número quando ele cabe em 2^53 e num texto quando não cabe. Os testes forçam o texto em grades pequenas e conferem que o resultado é o mesmo.

---

## O que as medidas me corrigiram

- **A chave do estado passava de 2^53 no 16×16 com 4 estrelas.** O estado é a contagem de cada coluna em base 5 vezes a máscara da linha anterior, e no 16×16 isso vai a cerca de 10^16. Acima de 2^53 dois estados diferentes podem cair no mesmo número sem aviso. Eu tinha medido "2 arranjos no 16×16" com essa chave. Refeito com a chave em texto quando o número não cabe, deu 2 de novo, mas o primeiro 2 valia por sorte.
- **O comentário de um teste listava as linhas erradas.** Para mostrar as 6 linhas de 5 casas com 2 estrelas sem vizinhas, escrevi de cabeça uma lista que tinha uma linha com 3 estrelas (`10101`) e faltava outra. O teste passava porque conferia a contagem, não o comentário. A lista agora é a certa: `10100 10010 10001 01010 01001 00101`.

---

## Como usar

Node 20 ou mais novo. Sem dependência.

```bash
npm test
node ferramentas/medidor.js
node ferramentas/medidor.js simetria 10 2   # ~20 s
node exemplos/uso.js
```

```js
import { conta, arranjosNaForca } from 'batalha-de-estrelas'

conta(10, 2)                         // 146510n
arranjosNaForca(8, 2, true).achados  // os dois arranjos do 8 x 8
```

## Os arquivos

- `src/estrelas.js`: a programação dinâmica linha por linha.
- `src/juiz.js`: a força bruta numa grade de verdade.
- `src/simetria.js`: as 8 simetrias do quadrado, órbitas e Burnside.
- `src/medidas.js`: as tabelas do README.
- `ferramentas/medidor.js`: imprime as tabelas.
- `testes/`: 16 testes; o 10×10 inteiro pela força bruta e as classes dele ficam em `pesados.test.js`.

## Licença

MIT.
