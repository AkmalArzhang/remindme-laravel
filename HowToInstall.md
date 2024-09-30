# How to install the project?

1. Clone the repository.
2. Run ```composer install```.
3. Run ```composer key:generate```.
4. Run ```npm install```.
5. Copy ```.env.example``` to ```.env``` and update the database name and credentials (The app uses Sqlite by default).
6. Run ```php artisan migrate --seed```
7. Run ```php artisan serve``` and ```npm run dev```.