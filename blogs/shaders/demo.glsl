void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.xy * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    // 分母越大越平滑
    float pixelWidth = 2.0 / iResolution.y;

    float d = length(uv);
    d = sin(d * 8.0 + iTime)/8.0;
    d = 0.02 / d;

    fragColor = vec4(d,d,d,1.0);
}