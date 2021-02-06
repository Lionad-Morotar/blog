import Data.Char (toLower)
import Data.List ( (\\) )
import qualified Data.Set as S

isIsogram :: String -> Bool
isIsogram str = null $ map toLower str \\ ['a'..'z']

isIsogram' :: String -> Bool
isIsogram' = unique . map toLower
  where unique [] = True 
        unique (x:xs) = notElem x xs && unique xs

isIsogram'' :: String -> Bool 
isIsogram'' = (==) <$> length <*> S.size . S.fromList . map toLower