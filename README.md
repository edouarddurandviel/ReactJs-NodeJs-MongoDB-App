## ReactJs-NodeJs-MongoDB-App

Frontend: "React.js"
Backend: "node.js", "express.js", connecté à une base de données NoSQL, "MongoDB"

### Docker

Initialisation de MongoDB et importation de la base donnnées.

```bash
docker compose up -d
```

## Api URL

homepage: http://localhost:5173

## Docker Backups commands

For mongosh initialization command

```bash
# create dump
mongodump --db test --gzip --archive=".\data\test.archive.gz"

# restore dump
mongorestore --archive=/docker-entrypoint-initdb.d/test.archive.gz --gzip --username "root" --password "edouard" --authenticationDatabase admin --archive=".\data\test.archive.gz"
```


