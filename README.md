# 文件流传输

> Node 后端文件流传输;
>
> 前端文件上传、下载、断点上传、断点下载

## backend file stream transfer

[后端文件流传输](./backend-file-stream-transfer)

- Node 使用 fs 模块处理文件合并

## video source play

[视频源播放](./video-source-play)

- 使用 video.js、hls.js 播放不同 m3u8 视频源
- 根据网络带宽（码率），自动选择合适的视频源
- 手动切换视频分辨率

```m3u8
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=375000,RESOLUTION=640x360
360_out.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=750000,RESOLUTION=854x480
480_out.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2000000,RESOLUTION=1280x720
720_out.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=3500000,RESOLUTION=1920x1080
1080_out.m3u8
```

## 文件上传/下载

### backend code

- [app.js 入口文件](./app.js)
- [route 路由文件目录](./route)
- [utils 流处理工具目录](./utils)

#### run

```bash
node app.js
```

or

```bash
npm i pm2 -g
pm2 start app.js --watch
```

### frontend code (javascript)

- [download 文件下载示例](./download)
  - [excel.html](./download/excel.html): 使用 jQuery 下载 excel 文件
  - [index.html](./download/index.html): 使用 xhr 下载 mp4 文件
  - [index_slice.html](./download/index_slice.html): 使用 xhr 下载 mp4 文件，通过设置 Range 请求头实现断点下载功能
- [upload 文件上传示例](./upload)
  - [index.html](./upload/index.html): 使用 xhr 将文件 slice 分割后，分段上传，实现断点续传

#### run

通过 `live server` 插件，在浏览器中打开对应的 html 文件

### vue frontend code (vue)

- [vue-transfer](./vue-transfer): 对(断点)上传、下载进行封装

#### run

```bash
cd vue-transfer
npm i
npm run serve
```
