# ImageMagick

## 批处理

```cmd
magick convert *.jpg -resize 2560x1440 -quality 95 -set filename:t new_%t %[filename:t].jpg
```