# Photos sur toile - KEDL

## Procédure d'installation
```
git clone https://github.com/stephanpaquet/kedl.git
cd kedl
```
## Composer
```
composer install
```

## Si pas encore créé
```
cp .env.example .env
php artisan key:generate
```

## NPM
```
npm install
npm run watch
```

## Démarrage du serveur
```
php artisan serve
```

http://127.0.0.1:8000

## TODO
- Utilisation du vuex pour loader la session
- Faire en sorte que les component utilisent tous le store
