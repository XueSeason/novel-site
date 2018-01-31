# Novel-site

## API - v1

### Book

### 获取书籍排行

```shell
GET /v1/book/rank
```

#### 获取书籍信息

```shell
GET /v1/book/:bookId
```

#### 搜索书籍

```shell
GET /v1/book/search/:keyword
```

#### 加入收藏

```shell
POST /v1/book/favorite/:bookId/add
```

#### 取消收藏

```shell
POST /v1/book/favorite/:bookId/cancel
```

#### 加入书架（要求登录）

```shell
POST /v1/bookshelf
{ "bookId": 1 }
```

#### 书架查询（要求登录）

```shell
GET /v1/bookshelf
```

### Chapter

#### 获取章节信息 - 主要为标题、内容、前后章节信息，如果尚未购买，提示购买

```shell
GET /v1/chapter/:chapterId
```

#### 购买此章节（要求登录）

```shell
POST /v1/chapter/:chapterId/purchase
```

#### 记录此章节阅读（要求登录）

```shell
POST /v1/chapter/:chapterId/record
```

### Account

#### SNS 登录回调

```shell
GET /v1/login/:sns/callback
```

mock

```shell
GET /v1/login/:sns/mock
```

#### 退出登录

```shell
GET /v1/logout
```

#### 支付记录查询（要求登录）

```shell
GET /v1/record/payment
```

#### 消费记录查询（要求登录）

```shell
GET /v1/record/consume
```
