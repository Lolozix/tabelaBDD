const lolozix = require("pg") ()

const lolo = lolozix("postgres://postgres:1402@localhost:5432/lorrana")

lolo.query(*SELECT 1 + 1 AS result*)
