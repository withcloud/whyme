---
title: "Stripe CheckOut 如此簡單"
date: "2019-03-010T19:00:00+08:00"
description: "學習 Stripe CheckOut 只需四步"
authors:
  - name: Srib Chao
    avatar: /team/srib.jpg
---

## 1. Install

```
yarn init
yarn add stripe express body-parser
```

## 2. App.js
---

keyPublishable和keySecret。 與Stripe通信時，這些鍵可識別您的帳戶。
應用程序從本地環境變量中提取值，以便將配置與代碼完全分開。 避免在應用程序代碼中硬編碼API訪問密鑰和其他敏感數據。

```js
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
```

設置常量後，導入Stripe和Express模塊。 Stripe模塊接受單個參數，即與您的帳戶關聯的密鑰(Key secret)。

```js
const express = require("express");
const stripe = require("stripe")(keySecret);
```

bodyParser中間件用來解析http請求體，是express默認使用的中間件之一。

```js
const bodyParser = require("body-parser");
```

初始化Express並配置中間件。 此示例使用靜態中間件來提供名為public的目錄中的靜態文件。

```js
const app = express();
app.use(express.static("public"));
```

bodyParser.urlencoded則是用來解析我們通常的form表單提交的數據，也就是請求頭中包含這樣的信息： Content-Type: application/x-www-form-urlencoded

bodyParser.urlencoded 模塊用於解析req.body的數據，解析成功後覆蓋原來的req.body，如果解析失敗則為 {}

extended選項允許配置使用querystring(false)或qs(true)來解析數據

querystring就是nodejs內建的對象之一，用來字符串化對像或解析字符串。

qs是一個querystring的庫，在qs的功能基礎上，還支持更多的功能並優化了一些安全性。

使用body-parser模塊來處理JSON請求體(JSON request)

```js
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Express服務器 POST route ，該 route 接收付款令牌( payment token )並創建費用(charge)。
app.post("/charge", (req, res) => {
  // 錢錢 5蚊(美元數乘以100來計算金額)
  let amount = 500;

  // 檢索電子郵件地址和卡令牌(card token)
  // 使用這些參數在Stripe帳戶中創建Customer對象
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    // Customer對像作為選項
    stripe.charges.create({
      amount,
      description: "測試一下",
      currency: "usd",
      customer: customer.id
    })
  )
  .then(charge => res.send(charge))
  // 如果promise中的任何操作失敗，catch方法將在控制台中顯示錯誤消息，並發送500錯誤以響應用戶的請求
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "你失敗了"});
  });
});

app.listen(3000);
```

## 3. public/index.html
---
創建HTML前端

使用Checkout API手動顯示付款表單。 當用戶填寫他們的付款信息並繼續購買時，Checkout會觸發一個回調函數，該函數將令牌(token)作為參數提供。 在此示例應用程序中，回調使用W3C Fetch API將令牌(token)發送到服務器。 

創建一個名為public / index.html的文件：

```html
<html>
  <head>
    <title>Everything Check out</title>
    <script src="https://checkout.stripe.com/checkout.js"></script>
  </head>
  <body>
    <h2>Everything Checkout !</h2>

    <div id="shop">
      <button id="buttonCheckout">Checkout</button>
    </div>
  </body>

  <script>
  </script>
</html>
```

在 script 入面放配置結帳庫

```html
<script>
  var checkoutHandler = StripeCheckout.configure({
    key: "123456",
    locale: "auto"
  });
</script>
```

接下來，將事件偵聽器附加到按鈕以處理單擊事件。 在按鈕單擊回調中，使用Checkout的open方法顯示付款表單：

```js
var button = document.getElementById("buttonCheckout");

button.addEventListener("click", function(ev) {
  checkoutHandler.open({
    name: "Sample Store",
    description: "Example Purchase",
    token: handleToken
  });
});
```

token屬性是Checkout在用戶完成購買時觸發的回調(callback)。 在該回調中，使用令牌創建JSON有效內容(payload)並使用fetch將其發送到應用程序服務器：

```js
function handleToken(token) {
  fetch("/charge", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(token)
  })
  .then(output => {
    if (output.status === "succeeded")
      document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
  })
}
```

操作成功完成後，應用程序將使用一條消息替換購買按鈕，以指示購買已完成。 在實際應用程序中，您可能希望在操作 error 的時候添加錯誤處理並禁用購買按鈕。

W3C Fetch API在HTTP操作完成時 會 return promise。 值得注意的是，即使服務器返回錯誤代碼（error的時候），promise仍會成功解析。 該應用程序檢測和處理常見的4xx和5xx錯誤。

在響應（response) 處理中，服務器響應錯誤代碼時拋出異常，確保catch處理程序按預期執行。

增加在剛剛的 code 中：
```js
fetch("/charge", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(token)
})
.then(response => {
  if (!response.ok)
    throw response;
  return response.json();
})
.then(output => {
  console.log("Purchase succeeded:", output);
})
.catch(err => {
  console.log("Purchase failed:", err);
})
```

## 4. 運行該應用程序

從 terminal/cmd 運行該應用程序：

可以在 stripe 左下的 developers，找到 Api keys, 按下去就找到 **Standard keys** 入面就可以 copy Publishable key 和 Secret key
```terminal
PUBLISHABLE_KEY=123456 SECRET_KEY=123456 node app.js
```

## 額外功能

# Billing

Stripe Billing 是 Stripe 平台中的定期計費引擎。它的工作是生成發票。 然後，結算引擎會自動收取這些發票的付款。

發票有兩種方式創建：

Manually(手動): 一次性發票
Automatically(自動): 定期訂閱。

## Manually
## Automatically

定義產品

```js
// 設置您的密鑰：
// https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("secret key");

const product = stripe.products.create({
  name: 'My SaaS Platform',
  // type: 'service'
  // type: 'good',要加 sku
  type: 'service',
});
```

定義定價

```js
var stripe = require("stripe")("123456");

const plan = stripe.plans.create({
  product: 'prod_CbvTFuXWh7BPJH',
  nickname: 'SaaS Platform USD',
  currency: 'usd',
  interval: 'month',
  amount: 10000,
});
```

訂閱

```js
stripe.subscriptions.create({
  customer: 'cus_Ef5iQcLD694Ubg',
  items: [{plan: plan.id}],
});
```
最後附上可以測試的信用號 [StripeCreditCard](https://stripe.com/docs/testing#cards)

---

文章會持續更新，喜歡的話可以在瀏覽器將文章加入 bookmark