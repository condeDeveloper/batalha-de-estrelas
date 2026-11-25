import { conta, arranjosNaForca } from '../src/index.js'

// o tamanho de jornal: 10 x 10 com duas estrelas por linha e coluna
console.log('10 x 10 com duas:', conta(10, 2))

// a menor grade com duas estrelas, e os dois arranjos dela
const { achados } = arranjosNaForca(8, 2, true)
console.log(achados[0].join('\n'))
