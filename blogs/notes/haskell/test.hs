import qualified Data.List  as List
import qualified Data.Char as Char
import qualified Data.Map as Map
import qualified Data.Set as Set

-- List Comprehension

length' xs = sum [1 | _ <- xs]

filterA2Z st = [c | c <- st, c `elem` ['A'..'Z']]

-- Functions

head' :: [a] -> a
head' [] = error "dummy~"
head' (x:_) = x

tell :: (Show a) => [a] -> String
tell [] = "Empty"
tell [x] = "One element: " ++ show x
tell [x,y] = "Two elements: " ++ show x ++ " and " ++ show y
tell (x:y:_) = "More elements"

length'' :: (Num b) => [a] -> b
length'' [] = 0
length'' (_:xs) = 1+length'' xs

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

slowsort'' :: (Ord a) => [a] -> [a]
slowsort'' [] = []
slowsort'' (x:xs) = slowsort'' (filter (<=x) xs) ++ [x] ++ slowsort'' (filter (>x) xs)

elem' :: (Eq a) => a -> [a] -> Bool
elem' a = foldl (\acc cur -> if acc then acc else a == cur) False

map'' :: (a -> b) -> [a] -> [b]
map'' fn = foldl (\h c -> h ++ [fn c]) []

access :: Eq a => a -> [(a, b)] -> b
access key = snd . head . filter (\(k,v) -> k == key)

-- Type Classes

data Point = Point Float Float deriving (Show)
data Vector a = Vector a a a deriving (Show)
data Shape = Circle Point Float | Rectangle Point Point deriving (Show)

vplus :: (Num t) => Vector t -> Vector t -> Vector t
vplus (Vector i j k) (Vector l m n) = Vector (i+l) (j+m) (k+n)

surface :: Shape -> Float
surface (Circle _ r) = pi * r * 2
surface (Rectangle (Point x1 y1) (Point x2 y2)) = abs (x2 - x1) * abs (y2 - y1)

nudge :: Shape -> Float -> Float -> Shape
nudge (Circle (Point x y) r) mx my = Circle (Point (x + mx) (y + my)) r
nudge (Rectangle (Point x1 y1) (Point x2 y2)) mx my = Rectangle (Point (x1 + mx) (x2 + mx)) (Point (y1 + my) (y2 + my))
