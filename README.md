Framework: Nest JS
ORM: TypeORM
Database: PostgreSQL

Steps to run the application: 
1. Install dependencies: npm i
2. Create a database: lumel
3. Execute command: npm run db:migrate
4. Start the server: npm run start

Server will be started at http://localhost:3000

Tables used:
Customer
Order
Product

Endpoints:
Upload Orders:
curl --location 'http://localhost:3000/order/upload-orders' \
--form 'file=@lumal-csv.csv

Refresh Orders:
curl --location --request POST 'http://localhost:3000/scheduler/refresh-orders'

Get Revenue:
Request:
curl --location --request GET 'http://localhost:3000/order/get-revenue' \
--header 'Content-Type: application/json' \
--data '{
    "startDate": "2024-01-01",
    "endDate": "2024-05-30",
    "product": "UltraBoost Running Shoes",
    "region": "Asia",
    "category": "Electronics"
}'

Response:
{
    "revenue": "6936.67"
}
