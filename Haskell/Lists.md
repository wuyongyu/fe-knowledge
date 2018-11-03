列表
===

`let numbers = [4,8,15,16,23,42]`

`head numbers`

`tail numbers`

`tail (tail numbers)`

`tail (tail (tail (tail (tail(tail numbers)))))`

`numbers`

`5 : []`

`1 : 5: []`

`99 : tail numbers`

`length numbers`

`reverse numbers`

`numbers !! 3`

`last numbers`

`init numbers`

`null numbers`

`null []`

`elem 15 numbers`

`[1,2,3] ++ [4,5,6]`

`['y','o','n','g','y','u']`

`"adam" < "ant"`

`[[1,2,3],[4,5,6]]`

`maximum numbers`

`minimum numbers`

`sum numbers`

`product numbers`

`sum[1..100]`

`['a'..'e']`

`[2,4..10]`

`[10,9..1]`

`[1..]`

`take 5 [1..]`

深入理解
===

`[2^n | n <- [1..10]]`

`[2^n | n <- [1..10], 2^n >= 10, 2^n < 100]`

`[x | x <- "outrageous", not (elem x "aeiou")]`

> [x | x <- "outrageous", not (x \`elem\` "aeiou")]