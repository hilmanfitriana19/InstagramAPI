#Instagram-API
Pengembangan aplikasi web menggunakan Instagram-API dan penambahan fitur yang diimplementasi pada web. Source code yang digunakan berasal dari  https://scotch.io/@devGson/using-the-instagram-api-with-node-and-expressjs

## Installing

install dependency yang diperlukan

```
> npm install instagram-node
```

Pada **api.js** ganti **Client_ID** dan **Client_Secret** dengan clinet id dan cilent secret yang dimiliki.

```
ig.use({
    client_id: 'Your_Client_ID',
    client_secret: 'Your_Client_Secret'
});
```

Setelah memmasukkan **Client_ID** dan **Client_Secret**, tinggal run project nya.

### Running

```
> node api.js
```

Akses pada web browser menggunakan script berikut

```
localhost:8080/authorize
```
