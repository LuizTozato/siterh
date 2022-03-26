import sqlite3 from "sqlite3"
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const db_name = 'siterh.db'
const db_path = __dirname + '/' + db_name

const database = new sqlite3.Database(db_path, err => {
    if (err) {
        return console.error(err.message)
    }
    console.log(`Connected to ${db_name} SQlite database.`)
});

database.run('PRAGMA foreign_keys = ON')

export default database
