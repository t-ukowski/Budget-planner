# Budget-planner
Frontend + backend of web application for income + expenses planner

w application.properties nalezy ustawic:

spring.datasource.url=

spring.datasource.username =

spring.datasource.password =


Formularz new_income_expense.html w src->main->resources->templates jest na razie podstawową działającą wersją.
Działa tylko, gdy w pole Rodzaj wpiszecie Wydatek lub Przychód (koniecznie z wielkich liter!), format dat to: yyyy-mm-dd i konto to musi być nazwa konta, która już została dodana do bazy wcześniej.
Potem Zosia może zmienić ten formularz, żeby pola: Rodzaj i konto były rozwijaną listą, chyba że uzgodnimy, że to zadanie dla frontendu.