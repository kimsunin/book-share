# book.kimsi.me

[바로가기](https://book.kimsi.me)

## configure

### book
| id  | name   | publisher | summary | img_url | author | state |
|-----|--------|-----------|---------|---------|--------|-------|
| int | string | string    | string  | string  | string |boolean|

### student
| id  | name   | number |
|-----|--------|--------|
| int | string | string |

### rent - (book-student relation table)
| book_id | student_id | rent_date | return_date | state   |
|---------|------------|-----------|-------------|---------|
| int     | student    | date      | date        | boolean |
