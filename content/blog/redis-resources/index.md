---
title: "學習 Redis 如此簡單"
date: "2019-03-06T11:41:00+08:00"
description: "一天就學會 Redis"
---

[RedisWebsite]: https://redis.io/ "RedisWebsite"

### 為甚麼要用 Redis

[Redis][RedisWebsite]用作數據庫和緩存，因為它的速度非常之快，因為數據存儲在
[內存](https://zh.wikipedia.org/wiki/%E9%9A%8F%E6%9C%BA%E5%AD%98%E5%8F%96%E5%AD%98%E5%82%A8%E5%99%A8 "Wiki")
中，這與其他數據通常存儲在
[硬碟](https://zh.wikipedia.org/wiki/%E7%A1%AC%E7%9B%98 "Wiki")
上的數據庫相反。

### 安裝

這次教學，我們會透過
[Homebrew](https://brew.sh/ "Download HomeBrew")
去安裝[Redis][RedisWebsite]

```
$ brew install redis
```

### 啟動Redis

在計算機啟動時啟動[Redis][RedisWebsite]。

```
$ ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents
```

在計算機啟動時停止[Redis][RedisWebsite]。

```
$ launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

方法一: 通過**launchctl**啟動[Redis][RedisWebsite]服務器。

```
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

方法二: 使用配置文件啟動[Redis][RedisWebsite]服務器。

```
$ redis-server /usr/local/etc/redis.conf
```

### 測試

獲取[Redis][RedisWebsite]包信息。

```
$ brew info redis
```

測試[Redis][RedisWebsite]服務器是否正在運行。

```
$ redis-cli ping
```

如果它回复“PONG”，那就完成了！


### 配置的位置

[Redis][RedisWebsite]配置文件的位置。

```
/usr/local/etc/redis.conf
```

### 卸載

卸載[Redis][RedisWebsite]及其配置文件。

```
$ brew uninstall redis
$ rm ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

### Redis的跨平台GUI管理工具

[RedisDesktopManager](https://github.com/uglide/RedisDesktopManager/ "Download RedisDesktopManagers")
可以實時監控 [Redis][RedisWebsite] 服務器

### 學習 Redis 的平台

1.[RunNoob](http://www.runoob.com/redis/redis-commands.html)

2.[TutorialsPoint](https://www.tutorialspoint.com/redis/)

### 測試 Redis 指令的平台

[TryRedis](https://try.redis.io/)

### Redis 雲端

自己的計算機不足 **內存** 時可以使用
[RedisLabs](https://redislabs.com/)