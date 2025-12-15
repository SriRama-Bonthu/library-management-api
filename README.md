# 📚 Library Management System API

## 📌 Overview
The **Library Management System API** is a RESTful backend application built to manage **books, members, borrowing transactions, and fines** in a library.  
It enforces **real-world business rules** and uses **state machine logic** to ensure data integrity during book borrowing and returning workflows.

This project demonstrates backend skills such as:
- API development
- Relational database modeling
- Business rule enforcement
- State machine implementation
- Date & time handling

---

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js  
- **Database**: MySQL  
- **ORM**: Sequelize  
- **Testing**: Postman  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SriRama-Bonthu/library-management-api.git
cd library-management-api
```

### 2️⃣ Install Dependencies
npm install



## 🗄 Database Schema

### 📘 Book Table

| Column Name        | Data Type | Description |
|--------------------|----------|-------------|
| id                 | INT (PK) | Unique identifier for each book |
| isbn               | VARCHAR  | Unique ISBN number |
| title              | VARCHAR  | Book title |
| author             | VARCHAR  | Author name |
| category            | VARCHAR  | Book category |
| status              | ENUM     | available, borrowed, reserved, maintenance |
| total_copies       | INT      | Total number of copies |
| available_copies   | INT      | Copies currently available |
| createdAt          | DATETIME | Record creation time |
| updatedAt          | DATETIME | Record last update time |

---

### 👤 Member Table

| Column Name          | Data Type | Description |
|----------------------|----------|-------------|
| id                   | INT (PK) | Unique member ID |
| name                 | VARCHAR  | Member name |
| email                | VARCHAR  | Unique email |
| membership_number    | VARCHAR  | Unique membership number |
| status               | ENUM     | active, suspended |
| createdAt            | DATETIME | Record creation time |
| updatedAt            | DATETIME | Record last update time |

---

### 🔄 Transaction Table

| Column Name     | Data Type | Description |
|-----------------|----------|-------------|
| id              | INT (PK) | Unique transaction ID |
| book_id         | INT (FK) | References Book(id) |
| member_id       | INT (FK) | References Member(id) |
| borrowed_at     | DATETIME | Borrowed timestamp |
| due_date        | DATETIME | Due date (borrowed_at + 14 days) |
| returned_at     | DATETIME | Return timestamp |
| status          | ENUM     | active, overdue, returned |
| createdAt       | DATETIME | Record creation time |
| updatedAt       | DATETIME | Record last update time |

---

### 💰 Fine Table

| Column Name        | Data Type | Description |
|--------------------|----------|-------------|
| id                 | INT (PK) | Unique fine ID |
| member_id          | INT (FK) | References Member(id) |
| transaction_id     | INT (FK) | References Transaction(id) |
| amount             | DECIMAL  | Fine amount |
| paid_at            | DATETIME | Fine payment time |
| createdAt          | DATETIME | Record creation time |
| updatedAt          | DATETIME | Record last update time |

---

## 🔁 Relationships Overview

- One **Member** can have many **Transactions**
- One **Book** can have many **Transactions**
- One **Transaction** can generate one **Fine**
- One **Member** can have many **Fines**

---

## 📜 Business Rules Summary

- Maximum **3 books** can be borrowed by a member at a time
- Borrowing period is **14 days**
- Fine is **$0.50 per overdue day**
- Members with unpaid fines cannot borrow books
- Members are suspended if they have **3 or more overdue transactions**
- A book cannot be borrowed if its status is not `available`

---

## Postman Images
### Create a book
![WhatsApp Image 2025-12-15 at 10 03 43 PM](https://github.com/user-attachments/assets/1e02069d-9794-4dae-8b08-9a5a98b09324)


### Create a member
![mem](https://github.com/user-attachments/assets/d6429f55-0981-49f2-8df6-544e721f1cae)


### Borrowing a book
![borrow](https://github.com/user-attachments/assets/0867a10a-462c-4ef7-b22c-718d8b54e020)

### Showing the books

![show books](https://github.com/user-attachments/assets/e953d984-bbf4-40d7-a5ea-908238dfa71b)






