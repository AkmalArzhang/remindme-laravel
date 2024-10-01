# How to install?

RemindMe is developed using Laravel and React, and here is how you install it:

1. Clone the repository.
2. Navigate to src.
3. Run ```composer install```.
4. Run ```composer key:generate```.
5. Run ```npm install```.
6. Copy ```.env.example``` to ```.env``` and update the database name and credentials (The app uses Sqlite by default).
7. If you want to run tests, run ```php artisan test```
8. Run ```php artisan migrate --seed```
9. Run ```php artisan serve``` and ```npm run dev```.