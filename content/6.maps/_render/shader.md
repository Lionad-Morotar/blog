---
title: Shader Art
description: Shader Art 是一种使用 Shader 语言进行创作的艺术形式，它可以用来制作动画、图像、音乐等。
---

#### An introduction to Shader Art Coding

最简单的 Shader：

```glsl
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / iResolution.xy;
    // Output to screen
    fragColor = vec4(uv,0,1.0);
}
```

带抗锯齿边缘的环形：

```glsl
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.xy * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    // 分母越大越平滑
    float pixelWidth = 5.0 / iResolution.y;

    float d = length(uv);
    d -= 0.68;
    d = abs(d);
    d = smoothstep(0.1, 0.1 + pixelWidth, d);

    fragColor = vec4(d,0,0,1.0);
}
```
