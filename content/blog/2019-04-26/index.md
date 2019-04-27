---
title: "2019-04-26 log"
date: "2019-04-27T08:31:00+08:00"
description: ""
authors:
  - name: comus
    avatar: /team/comus.jpg
---

4 月 26 日（五）
---

srib: 早上 srib 和 Ben 一起做好 withbeacon(android) 的 about us 頁面，然後將 withbeacon(android) 上傳上 play store。下午srib 交給 Ben 把 modify 做好。

而在 macau-chat 方面，srib 在下午做了 new/community pages 的 ui，總共 3頁。

晚上要也是做 macau-chat, 但是做的是 api, 新增了 create community 和 edit community 的 grqphql。

而在 macau-chat 方面, 下午 srib 就增加了 createCommunity and editCommunity mutations, 我就 fix redirect bugs 和正在進行的 layout 重整工程。


- withbeacon: 
  - android: withbeacon modify 全部。
  - ios: 發佈 1.1 到 app store, 但因為使用藍芽訊息不明確而被 rejected. 1.1 版比 1.0 版的增加了：
         - 1）查找 macAddress, powerLevel, etc ....
         - 2）修改 beacon 的數據。
         - 3) 新增修改 beacon，根據 MacAddress 查找 Beacon 的數據頁面。
         - 4）新增小於 Rssi -70 就偵測不到，減低距離太遠而修改不到的機率。
         - 5）新增 Future 頁面，入面會有未來會新增的功能的其中一部份，讓大家知道我們先盡心盡力去做這個軟件的，但卻留了一份神秘感，讓大家猜測一下新的功能。
         - 6）修正多項錯誤並提升執行效率。
- macau-chat: 
  - site: redirect bugs, layout, add comments, new/community pages 的 ui，總共 3頁。
  - api: community mutations
  - app: 無

