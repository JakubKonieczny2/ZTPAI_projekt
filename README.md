# System Rezerwacji Wizyt u Lekarza

## Opis projektu
System Rezerwacji Wizyt u Lekarza to aplikacja internetowa umożliwiająca pacjentom rezerwację wizyt u lekarzy. Lekarze mogą dodawać dostępne terminy, a pacjenci mogą je rezerwować. Administratorzy mają możliwość zarządzania użytkownikami oraz dodawania nowych lekarzy.

## Architektura aplikacji
- **Kontrolery (views):** Odpowiadają za obsługę żądań HTTP i przekazywanie ich do odpowiednich serwisów (np. plik `views.py` w Django).
- **Serwisy (serializers, logika biznesowa):** Odpowiadają za przetwarzanie danych, walidację i logikę biznesową (`serializers.py`).
- **Repozytoria (modele):** Warstwa dostępu do bazy danych, definiuje strukturę danych (np. plik `models.py`).

### Przykład modularyzacji
- Backend podzielony jest na moduły: `api/models.py`, `api/views.py`, `api/serializers.py`.
- Frontend podzielony jest na foldery: `pages/` (widoki), `components/` (komponenty wielokrotnego użytku), `services/` (logika komunikacji z API), `styles/` (style CSS).

### Główne funkcjonalności:
- **Rejestracja i logowanie**: Użytkownicy mogą rejestrować się i logować do systemu w zależności od swojej roli (pacjent, lekarz, administrator).
- **Rezerwacja wizyt**: Pacjenci mogą przeglądać dostępne terminy i rezerwować wizyty.
- **Dodawanie terminów**: Lekarze mogą dodawać dostępne terminy wizyt.
- **Zarządzanie użytkownikami**: Administratorzy mogą zarządzać użytkownikami oraz dodawać nowych lekarzy.

### Schemat architektury
- **Frontend (React):** Komunikuje się z backendem przez REST API (axios). Odpowiada za interfejs użytkownika, obsługę sesji, prezentację danych i interakcje.
- **Backend (Django REST Framework):** Udostępnia API do obsługi użytkowników, lekarzy i wizyt. Odpowiada za autoryzację, logikę biznesową i komunikację z bazą danych.
- **Baza danych (PostgreSQL):** Przechowuje dane o użytkownikach, lekarzach i wizytach.

## Instrukcja uruchomienia

### Backend (Django)
1. Przejdź do katalogu `myproject`.
2. Utwórz i aktywuj środowisko wirtualne:
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # Windows
   # lub
   source venv/bin/activate      # Linux/Mac
   ```
3. Zainstaluj wymagane pakiety:
   ```bash
   pip install -r requirements.txt
   ```
4. Upewnij się, że baza danych PostgreSQL jest uruchomiona i skonfigurowana zgodnie z `settings.py`.
5. Wykonaj migracje:
   ```bash
   python manage.py migrate
   ```
6. Wypełnij bazę przykładowymi danymi:
   ```bash
   python ../seed_db.py
   ```
   Skrypt `seed_db.py` utworzy przykładowych użytkowników, lekarzy i wizyty.
7. Uruchom backend:
   ```bash
   python manage.py runserver
   ```

### Frontend (React)
1. Przejdź do katalogu `myfrontend`.
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Uruchom frontend:
   ```bash
   npm start
   ```
4. Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000)

## Użyte technologie i uzasadnienie
- **React** – nowoczesny framework do budowy dynamicznych interfejsów użytkownika, szybki rozwój i duża społeczność.
- **Django + Django REST Framework** – szybkie tworzenie bezpiecznego backendu, gotowe mechanizmy autoryzacji i obsługi API.
- **PostgreSQL** – wydajna, stabilna i popularna baza danych relacyjnych, dobrze współpracuje z Django.
- **Axios** – wygodna obsługa zapytań HTTP w React.

Diagram ERD

<img width="296" alt="ERD" src="https://github.com/user-attachments/assets/37e04ff4-ce0f-46a6-8908-fcaa6e940dec" />
