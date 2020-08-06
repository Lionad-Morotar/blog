# ImageMagick & FFMpeg

## 批处理

```
magick convert *.jpg -resize 2560x1440 -quality 95 -set filename:t new_%t %[filename:t].jpg
```

## 截取视频

```
ffmpeg -i ./input.mp4 -vcodec copy -acodec copy -ss 00:00:03 -to 00:00:26 ./output.mp4
```