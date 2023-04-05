@app
house-rentals-app01

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

house
  pk *String # userId
  sk **String # houseId