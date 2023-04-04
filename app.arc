@app
my-remix-app-ac08

@http
/*
  method any
  src server

@static

@tables
user
  pk *String

password
  pk *String # userId

note
  pk *String  # userId
  sk **String # noteId

house
  pk *String # userId
  sk **String # houseId