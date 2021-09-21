# 2021夏インターン 第1回 Cチーム

```sh
deno run -A server.js
```

## API
### /api/loca<br>
指定されたIDのlocation.jsonを返す<br>
call:("/api/add",ID)<br>
return:{ID,name,lat,lng}<br>

### /api/info<br>
指定されたIDのinformation.jsonを返す<br>
call:("/api/info",ID)<br>
return:{ID,info[]}<br>

### /api/icon<br>
今持つすべてのicon.jsonの情報を返す<br>
call:("/api/icon")<br>
return:[{iconID,addres}]<br>

### /api/add<br>
位置情報を保存する<br>
call:("/api/add",{travelID,data[{type,date,iconID,comment,lat,lng}]})<br>
return:"ok"<br>

### /api/delete<br>
位置情報を削除する<br>

### /api/uadd<br>
userdata.jsonに新規ユーザを追加する<br>
call:("/api/uadd",travelID)<br>
return:"ok"<br>

### /api/dist<br>
距離を求める<br>
call:("/api/dist",{"origin":{"lat":"value","lng":"value"},"destination":{"lat":"value","lng":"value"}})<br>
return:dist<br>

### /api/iget<br>
アイコンの情報のみを返却<br>
call:("/add/iget",travelID)<br>
return:[{srt,comment,lat,lng}, ...]<br>

### /api/badd<br>
掲示板に書き込む<br>
call:("/api/badd",data{未定})<br>
return:"ok"<br>

### /api/blist<br>
掲示板の内容を返却<br>
call:("/api/blist")<br>
return:[data{未定}, ...]<br>
