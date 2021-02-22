roughlyPI :: (Floating p, Integral t) => t -> p
roughlyPI 0 = 2
roughlyPI k = e + roughlyPI (k - 1)
  where
    k' = fromIntegral k
    e = 2 ** (k' + 1) * fac k * (1 / (2 * k' + 1))
      where
        fac 1 = 1 / (k' + 1)
        fac p = (fromIntegral p / (k' + fromIntegral p)) * fac (p - 1)