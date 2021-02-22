-- List Comprehension

length' xs = sum [1 | _ <- xs]

filterA2Z st = [c | c <- st, c `elem` ['A'..'Z']]

-- Functions

head' :: [a] -> a
head' [] = error "dummy~"
head' (x:_) = x

tell :: (Show a) => [a] -> String
tell [] = "Empty"
tell (x:[]) = "One element: " ++ show x
tell (x:y:[]) = "Two elements: " ++ show x ++ " and " ++ show y
tell (x:y:_) = "More elements"

length'' :: (Num b) => [a] -> b
length'' [] = 0
length'' (_:xs) = 1+length'' xs

sum' :: (Num a) => [a] -> a
sum' [] = 0
sum' (res:xs) = res + sum' xs

compare' :: (Ord a) => a -> a -> Ordering
compare' a b
  | a < b = LT
  | a > b = GT
  | otherwise = EQ

calcBmis :: (RealFloat a) => [(a, a)] -> [a]
calcBmis xs = [bmi w h | (w, h) <- xs]
  where bmi w h = w / h ^ 2

cylinderArea :: (RealFloat a) => a -> a -> a
cylinderArea r h =
  let sideArea = 2 * pi * r * h
      topArea = pi * r ^ 2
  in sideArea + 2 * topArea

-- Recursion

maximum' :: (Ord a) => [a] -> a
maximum' [] = error "empty list"
maximum' [x] = x
maximum' (x:rest) = max x (maximum' rest)

replicate' :: (Num n, Ord n) => n -> x -> [x]
replicate' n x
  | n <= 0 = []
  | otherwise = x:replicate' (n-1) x

reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:rest) = reverse' rest ++ [x]

repeat' :: a -> [a]
repeat' x = x:repeat' x

zip' :: [a] -> [b] -> [(a, b)]
zip' _ [] = []
zip' [] _ = []
zip' (x:xs) (y:ys) = (x,y):zip' xs ys

slowsort :: (Ord a) => [a] -> [a]
slowsort [] = []
slowsort (mid:xs) =
  let lts = slowsort [x | x <- xs, x <= mid]
      gts = slowsort [x | x <- xs, x > mid] 
  in lts ++ [mid] ++ gts

-- High Order Functions

applyTwice :: (a -> a) -> a -> a
applyTwice f x = f (f x)

zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith' _ _ [] = []
zipWith' _ [] _ = []
zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys

flip' :: (a -> b -> c) -> (b -> a -> c)
flip' f x y = f y x

map' :: (a -> b) -> [a] -> [b]
map' _ [] = []
map' f (x:xs) = f x : map' f xs

filter' :: (a -> Bool) -> [a] -> [a]
filter' _ [] = []
filter' f (x:xs)
  | f x = x : filter' f xs
  | otherwise = filter' f xs

slowsort' :: (Ord a) => [a] -> [a]
slowsort' [] = []
slowsort' (mid:xs) =
  let lts = slowsort' (filter' (<=mid) xs)
      gts = slowsort' (filter' (>mid) xs)
  in  lts ++ [mid] ++ gts

-- continue on https://learnyouahaskell.mno2.org/zh-cn/ch06/high-order-function#lambda