# Just for development
'''
export NODE_ENV='development'
export MONGODB_URI_JETCODE='mongodb://localhost:27017/test'
service mongod start
service redis-server status
'''
# Add location data to database when run server
'''
mongoimport --uri="mongodb://localhost:27017/test" --mode=upsert --collection=districts --file=./static/uploads/locationData/districts.json
mongoimport --uri="mongodb://localhost:27017/test" --mode=upsert --collection=wards --file=./static/uploads/locationData/ward_lists.json  --jsonArray
'''