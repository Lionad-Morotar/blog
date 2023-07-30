# 音视频流处理

[TOC]

## FFMPEG

#### 拷贝视频片段

```
# 包括音频
ffmpeg -i ./input.mp4 -vcodec copy -acodec copy -ss 00:00:03 -to 00:00:26 ./output.mp4

# 简化版本
ffmpeg -i ./input.mp4 -ss 00:00:03 -t 3 output.mp4
```

#### 拼接视频片段

```
ffmpeg -f concat -i concat.txt -c copy joined.mp4

# concat.txt
file "head.mp4"
file "tail.mp4"
```

#### 视频转图片

```
ffmpeg -ss 8 -t 10 -i example.mp4 -s 1920*1080 -r 24 r_is_framerate.gif
```

#### 视频转音频

```
ffmpeg -i example.mp4 -f mp3 output.mp3
```

## ImageMagick

#### 转换图片格式

```
magick convert *.jpg -resize 2560x1440 -quality 95 -set filename:t new_%t %[filename:t].jpg
```

## 阅读更多

* [*19 FFmpeg Commands For All Needs*](https://catswhocode.com/ffmpeg-commands/)