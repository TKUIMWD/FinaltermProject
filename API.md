# API 說明

## Admin

### 1. 成立預約
```
POST /api/v1/admin/establishReservationByID?_id={_id}
```
Header
```
Authorization: Bearer {JWT_TOKEN}
```
Query Parameter
```
?_id={_id} // reservation _id
```

**成立成功**


```
{
  "code": 200,
  "message": "Reservation established successfully"
}
```

**Token缺失**

```
{
  "code": 400,
  "message": "Token is required"
}
```

**Token無效**

```
{
  "code": 400,
  "message": "Invalid token"
}
```

**預約ID缺失**

```
{
  "code": 400,
  "message": "Reservation ID is required"
}
```

**預約ID不存在**

```
{
  "code": 404,
  "message": "Reservation not found"
}
```


**Token權限不足**

```
{
  "code": 403,
  "message": "Permission denied"
}
```

**預約狀態為已成立**

```
{
  "code": 400,
  "message": "Reservation is already established"
}
```

**預約狀態為已取消**

```
{
    "code": 400,
    "message": "Reservation has already been canceled"
}
```

**預約狀態為已撤銷**

```
{
    "code": 400,
    "message": "Reservation has already been revoked"
}
```

**Token權限不足**

```
{
  "code": 401,
  "message": "Invalid token or insufficient permissions"
}
```

### 2. 撤銷預約

```
DELETE /api/v1/admin/revokeReservationByID?_id={_id}
```
Header
```
Authorization: Bearer {JWT_TOKEN}
```
Query Parameter
```
?_id={_id} // reservation _id
```

**撤銷成功**

```
{
  "code": 200,
  "message": "Reservation revoked successfully"
}
```

**Token缺失**

```
{
    "code": 400,
    "message": "Token is required"
}
```

**Token無效**

```
{
    "code": 400,
    "message": "Invalid token"

}

```

**預約ID不存在**

```
{
    "code": 400,
    "message": "Reservation ID is required"
}
```

**預約已取消**


```
{
  "code": 400,
  "message": "Reservation has already been canceled"
}

```

**預約已撤銷**

```
{
  "code": 400,
  "message": "Reservation has already been revoked"
}
```

**預約不存在**

```
{
  "code": 404,
  "message": "Reservation not found"
}
```

**Token權限不足**

```
{
  "code": 403,
  "message": "Permission denied"
}
```

**Token無權限**

```
{
  "code": 401,
  "message": "Invalid token or insufficient permissions"
}
```

### 3. 獲取所有預約記錄
```
GET /api/v1/admin/getAllReservations
```
Header
```
Authorization: Bearer {JWT_TOKEN}
```

**獲取成功**


```
{
  "code": 200,
  "message": "Reservations retrieved successfully",
  "body": [
    {
      "_id": "reservation_id_1",
      "created_at": "2025-01-01 12:00:00",
      "status": "成立",
      "user_id": "user_id_1",
      "dish_washer_id": "dishwasher_id_1",
      "start_time": "2025-01-10 10:00",
      "end_time": "2025-01-10 12:00",
      "price": 300,
      "address": "123 Main Street",
      "user_email": "user1@example.com",
      "user_phone_num": "1234567890"
    },
    {
      "_id": "reservation_id_2",
      "created_at": "2025-01-02 14:00:00",
      "status": "未成立",
      "user_id": "user_id_2",
      "dish_washer_id": "dishwasher_id_2",
      "start_time": "2025-01-15 15:00",
      "end_time": "2025-01-15 17:00",
      "price": 400,
      "address": "456 Elm Street",
      "user_email": "user2@example.com",
      "user_phone_num": "0987654321"
    }
  ]
}
```

**Token缺失**

```
{
  "code": 400,
  "message": "Token is required"
}

```

**Token無效**

```
{
  "code": 400,
  "message": "Invalid token"
}

```

**Token權限不足**

```
{
  "code": 403,
  "message": "Permission denied"
}

```

**Token權限不足**

```
{
  "code": 401,
  "message": "Invalid token or insufficient permissions"
}
```

## Auth

### 1. 登入
```
POST /api/v1/auth/login
```
```
{
    "username": "test"
    "password": "password"
}
```

**登入成功**

```
{
  "code": 200,
  "message": "Login succeed",
  "body": {
    "token": "<TOKEN>"
  }
}
```

**用戶名或密碼錯誤**

```
{
  "code": 400,
  "message": "username or password error"
}
```

### 2. 註冊
```
POST /api/v1/auth/register
```
```
{
    "username":"testuser",
    "password":"testuser",
    "phone_num":"0000000000",
    "email":"test@mail.com"
}
```

**註冊成功**

```
{
    "code": 200,
    "message": "Register succeed"
}
```

**未輸入電話號碼**


```
{
  "code": 400,
  "message": "Phone number is required"
}
```

**用戶名已存在**

```
{
  "code": 400,
  "message": "Register failed",
}
```

### 3. 登出

```
POST /api/v1/auth/logout
```
Header
```
Authorization: Bearer {JWT_TOKEN}
```

**登出成功**

```
{
  "code": 200,
  "message": "Logout succeed"
}
```

**缺少Token**

```
{
  "code": 400,
  "message": "Token is required"
}
```

**無效的Token**

```
{
  "code": 400,
  "message": "Invalid token"
}
```

## Common

### 1. 取得所有洗碗工
```
GET /api/v1/common/getAllDishWashers
```
**取得成功**

```
{
    "code": 200,
    "message": "Find succeed",
    "body": [
        {
            "_id": "67655263dba3b7401e18eccc",
            "id": "1",
            "nickname": "ZZY",
            "title": "首席刷碗師",
            "intro": "用雙手征服每個碗盤的傳奇人物，據說曾在 20 分鐘內清理過上千個盤子，是洗碗界的活字典。",
            "seniority": 20,
            "hourly_rate": 200,
            "areas": [
                "北部",
                "中部",
                "南部",
                "東部"
            ]
        },
        {
            "_id": "67655263dba3b7401e18eccd",
            "id": "2",
            "nickname": "LTA",
            "title": "資深刷碗師",
            "intro": "高峰時段的救世主，碗盤如流水般來去，LTA 擁有的速度讓洗碗機都甘拜下風。",
            "seniority": 10,
            "hourly_rate": 195,
            "areas": [
                "北部",
                "南部"
            ]
        }...
```

**取得失敗 資料庫中沒有紀錄**

```
{
  "code": 404,
  "message": "No records found",
  "body": null
}
```

### 2. 使用洗碗工_ID取得詳細資料

```
GET /api/v1/common/getDishWasherByID?_id={_id}`
```
Query Parameter
```
?_id={_id}
```

**取得成功**


```
{
    "code": 200,
    "message": "Dishwasher found successfully",
    "body": {
        "_id": "67655263dba3b7401e18ecde",
        "id": "19",
        "nickname": "RFV",
        "title": "助理刷碗師",
        "intro": "有著洗碗界的魔術手之稱，RFV 在中南部的婚宴與大排檔間奔波如影隨形。",
        "seniority": 3,
        "hourly_rate": 193,
        "areas": [
            "中部",
            "南部"
        ]
    }
}
```

**取得失敗洗碗工ID不存在資料庫中**

```
{
  "code": 404,
  "message": "Dishwasher not found",
  "body": null
}
```

### 3. 確定洗碗工指定日期是否有預約

```
POST /api/v1/common/checkReservation

{
    "_id":"67655263dba3b7401e18eccc",
    "date":"2025-12-20"
}
```

**取得成功**

```
(沒有預約)

{
    "code": 200,
    "message": "Dishwasher is available on the selected date",
    "body": {
        "hasReservation": false
    }
}
(有預約)

{
    "code": 200,
    "message": "Dishwasher is not available on the selected date",
    "body": {
        "hasReservation": true
    }
}
```

## User

### 1. 使用Token取得用戶資料

```
GET /api/v1/user/getUserData
```
Header
```
Authorization: Bearer {JWT_TOKEN}
```

**取得成功**

```
{
    "code": 200,
    "message": "User found successfully",
    "body": {
        "_id": "6766de1b7eacb03912274cfd",
        "username": "testTT",
        "reservations": [],
        "phone_num": "0901230000",
        "email": "testTT@gmail.com"
    }
}
```

**Token缺失**

```
{
  "code": 400,
  "message": "Token is required"
}
```

**Token無效**

```
{
  "code": 400,
  "message": "Invalid token"
}
```

**用戶不存在**

```
{
  "code": 404,
  "message": "User not found"
}
```

### 2. 更新用戶訊息

```
PUT /api/v1/user/updateUserByID?_id=#id

{
    "username":"testtt",
    "phone_num":"0000000000",
    "email":"testtt@gail.com"
}
```
Header
```
Authorization: Bearer {JWT_TOKEN}
```
Query Parameter
```
?_id={_id}
```

**更新成功**


```
{
  "code": 200,
  "message": "User updated successfully"
}
```

**Token缺失**

```
{
  "code": 400,
  "message": "Token is required"
}
```

**Token無效**

```
{
  "code": 400,
  "message": "Invalid token"
}
```


**用戶不存在**

```
{
  "code": 404,
  "message": "User not found"
}
```

**用戶名已被使用**

```
{
  "code": 400,
  "message": "Invalid request"
}
```

### 3. 根據Token取得所有預約紀錄

```
GET /api/v1/user/getAllReservations
```
Header
```
Authorization: Bearer {JWT_TOKEN}
```

**取得成功**

```
{
    "code": 200,
    "message": "Reservations found successfully",
    "body": [
        {
            "_id": "6766e3157eacb03912274d08",
            "created_at": "2024-12-21 23:47:33",
            "status": "未成立",
            "user_id": "6766de1b7eacb03912274cfd",
            "username": "testTT",
            "dish_washer_id": "67655263dba3b7401e18eccd",
            "dish_washer_nickname": "LTA",
            "dish_washer_title": "資深刷碗師",
            "start_time": "2024-12-31 11:20",
            "end_time": "2024-12-31 15:32",
            "price": 819,
            "address": "LTA刷碗"
        }
    ]
}
```

**取得成功但沒有預約資料**

```
{
  "code": 200,
  "message": "Reservations found successfully",
  "body": []
}
```

### 4. 根據傳入的 預約_id 查詢指定的預約
```
GET /api/v1/user/getReservationByID?_id=#id
```
Header
```
Authorization: Bearer {JWT_TOKEN}
```
Query Parameter
```
?_id={_id}
```

**取得成功**


```
{
    "code": 200,
    "message": "Reservation found successfully",
    "body": {
        "_id": "6766e3157eacb03912274d08",
        "created_at": "2024-12-21 23:47:33",
        "status": "未成立",
        "user_id": "6766de1b7eacb03912274cfd",
        "username": "testTT",
        "dish_washer_id": "67655263dba3b7401e18eccd",
        "dish_washer_nickname": "LTA",
        "dish_washer_title": "資深刷碗師",
        "start_time": "2024-12-31 11:20",
        "end_time": "2024-12-31 15:32",
        "price": 819,
        "address": "LTA刷碗",
        "__v": 0
    }
}
```

**Token缺失**

```
{
  "code": 400,
  "message": "Token is required"
}
```


**Token無效**

```
{
  "code": 400,
  "message": "Invalid token"
}
```

**預約ID缺失**

```
{
  "code": 400,
  "message": "_id query parameter is required"
}
```

**預約紀錄不存在**

```
{
  "code": 404,
  "message": "Reservation not found"
}
```

### 5. 新增預約紀錄

```
POST /api/v1/user/addReservation

{
    "dish_washer_id": "67655263dba3b7401e18eccc",
    "start_time": "2024-12-31 11:20",
    "end_time": "2024-12-31 15:32",
    "address": "哈哈刷碗"
}
```
Header
```
Authorization: Bearer {JWT_TOKEN}
```

**新增成功**


```
{
  "code": 200,
  "message": "Reservation added successfully"
}
```

**Token缺失**

```
{
  "code": 400,
  "message": "Token is required"
}
```

**Token無效**

```
{
  "code": 400,
  "message": "Token is required"
}
```

**用戶不存在**


```
{
  "code": 404,
  "message": "User not found"
}
```

**洗碗工不存在**

```
{
  "code": 404,
  "message": "Dish washer not found"
}
```

**預約時間不可結束早於開始**

```
{
  "code": 400,
  "message": "Invalid start_time or end_time"
}
```

### 6. 使用預約ID刪除

```
DELETE /api/v1/user/cancelReservationByID?_id=#id
```
Header
```
Authorization: Bearer {JWT_TOKEN}
```
Query Parameter
```
?_id={_id}
```

**刪除成功**

```
{
  "code": 200,
  "message": "Reservation canceled successfully"
}
```

**Token缺失**

```
{
  "code": 400,
  "message": "Token is required"
}
```

**Token無效**

```
{
  "code": 400,
  "message": "Invalid token"
}
```

**預約不存在**

```
{
  "code": 404,
  "message": "Reservation not found"
}
```

**用戶無存取權限**

```
{
  "code": 403,
  "message": "Unauthorized"
}
```

**預約狀態為已成立**

```
{
  "code": 404,
  "message": "Contact customer service to cancel the reservation"
}
```

**預約狀態為已取消**

```
{
  "code": 404,
  "message": "Reservation has been canceled"
}
```

