(window.webpackJsonp=window.webpackJsonp||[]).push([[267],{913:function(t,a,e){"use strict";e.r(a);var s=e(0),r=Object(s.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"音视频流处理"}},[t._v("音视频流处理")]),t._v(" "),a("nav",{staticClass:"table-of-contents"},[a("ol",[a("li",[a("a",{attrs:{href:"#音视频流处理"}},[t._v("音视频流处理")]),a("ol",[a("li",[a("a",{attrs:{href:"#ffmpeg"}},[t._v("FFMPEG")]),a("ol",[a("li",[a("a",{attrs:{href:"#拷贝视频片段"}},[t._v("拷贝视频片段")])]),a("li",[a("a",{attrs:{href:"#拼接视频片段"}},[t._v("拼接视频片段")])]),a("li",[a("a",{attrs:{href:"#视频转图片"}},[t._v("视频转图片")])]),a("li",[a("a",{attrs:{href:"#视频转音频"}},[t._v("视频转音频")])])])]),a("li",[a("a",{attrs:{href:"#imagemagick"}},[t._v("ImageMagick")]),a("ol",[a("li",[a("a",{attrs:{href:"#转换图片格式"}},[t._v("转换图片格式")])])])]),a("li",[a("a",{attrs:{href:"#阅读更多"}},[t._v("阅读更多")])])])])])]),a("h2",{attrs:{id:"ffmpeg"}},[t._v("FFMPEG")]),t._v(" "),a("h4",{attrs:{id:"拷贝视频片段"}},[t._v("拷贝视频片段")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("# 包括音频\nffmpeg -i ./input.mp4 -vcodec copy -acodec copy -ss 00:00:03 -to 00:00:26 ./output.mp4\n\n# 简化版本\nffmpeg -i ./input.mp4 -ss 00:00:03 -t 3 output.mp4\n")])])]),a("h4",{attrs:{id:"拼接视频片段"}},[t._v("拼接视频片段")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('ffmpeg -f concat -i concat.txt -c copy joined.mp4\n\n# concat.txt\nfile "head.mp4"\nfile "tail.mp4"\n')])])]),a("h4",{attrs:{id:"视频转图片"}},[t._v("视频转图片")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("ffmpeg -ss 8 -t 10 -i example.mp4 -s 1920*1080 -r 24 r_is_framerate.gif\n")])])]),a("h4",{attrs:{id:"视频转音频"}},[t._v("视频转音频")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("ffmpeg -i example.mp4 -f mp3 output.mp3\n")])])]),a("h2",{attrs:{id:"imagemagick"}},[t._v("ImageMagick")]),t._v(" "),a("h4",{attrs:{id:"转换图片格式"}},[t._v("转换图片格式")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("magick convert *.jpg -resize 2560x1440 -quality 95 -set filename:t new_%t %[filename:t].jpg\n")])])]),a("h2",{attrs:{id:"阅读更多"}},[t._v("阅读更多")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://catswhocode.com/ffmpeg-commands/",target:"_blank",rel:"noopener noreferrer"}},[a("em",[t._v("19 FFmpeg Commands For All Needs")])])])])])}),[],!1,null,null,null);a.default=r.exports}}]);