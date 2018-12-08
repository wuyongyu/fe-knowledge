函数
===

> `ecmas program.hs`

```haskell
hypotenuse a b = sqrt (a ^ 2 + b ^ 2)

identifyCamel humps = if humps == 1
                        then "dromedary"
                        else "yong"
```

`:load program`

`hypotenuse 3 4`

`:l program`

`identifyCamel 1`

`identifyCamel 2`

> let

`let double x = 2 * x`

`double 7`

`let x = 3.0`

`let y = 4.0`

`hypotenuse x y`

`let x = 3`

`let y = 4`

`hypotenuse x y`

`:q`